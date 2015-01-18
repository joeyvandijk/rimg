function disabledTest(test,wd,hg,imageType){
    //change viewport size
    this.then(function() {
        casper.viewport(wd, hg,function(){
            test.comment('Window resolution is ' + this.evaluate(function() {
                return window.innerWidth+'x'+window.innerHeight;
            }), 'DEBUG');
        });
    });
    this.then(function(){
        casper.reload();
    });

    //check image properties
    var property = 'src';
    var value;
    var element = 'section > img';
    var totalImages = 3;

    var self = this;
    this.then(function() {
        //checkup
        test.assertElementCount(element,totalImages);
        test.assertExists(element,'images are found');

        //click on #1
        self.click("a.first");

        //check images & article images
        value = ['images/image-'+imageType+'.jpg','',''];
        test.assertEquals(this.getElementsAttribute(element,property),value,'section images (#1) okay');
    });
    this.then(function(){
        //click on #2
        casper.click('p > a:nth-child(2)');

        //check images & article images
        value = ['images/image-'+imageType+'.jpg','images/image-'+imageType+'.jpg',''];
        test.assertEquals(this.getElementsAttribute(element,property),value,'section images (#2) okay');
    });

    this.then(function(){
        //click on #3
        casper.click('p > a:nth-child(3)');

        //check images & article images
        value = ['images/image-'+imageType+'.jpg','images/image-'+imageType+'.jpg','images/image-'+imageType+'.jpg'];
        test.assertEquals(this.getElementsAttribute(element,property),value,'section images (#3) okay');
    });
};

casper.test.begin('Disabled test', 91, function suite(test) {
    var currentURL = params.url + '/disabled.html';
    casper.start(currentURL, function() {
        test.assertTitle('disabled test', "page title is okay");
    });

    casper.disabledTest = disabledTest;

    casper.then(function() {
        casper.disabledTest(test, 319, 480, 'tiny');
        casper.disabledTest(test, 320, 480, 'tiny');
        casper.disabledTest(test, 321, 480, 'tiny');
        casper.disabledTest(test, 479, 480, 'tiny');
        casper.disabledTest(test, 480, 480, 'tiny');
        casper.disabledTest(test, 481, 480, 'tiny');
        casper.disabledTest(test, 599, 480, 'tiny');
        casper.disabledTest(test, 600, 480, 'tiny');
        casper.disabledTest(test, 601, 480, 'tiny');
        casper.disabledTest(test, 767, 600, 'tiny');
        casper.disabledTest(test, 768, 600, 'tiny');
        casper.disabledTest(test, 769, 600, 'tiny');
        casper.disabledTest(test, 1023, 768, 'small');
        casper.disabledTest(test, 1024, 768, 'small');
        casper.disabledTest(test, 1025, 768, 'small');
        casper.disabledTest(test, 1199, 768, 'small');
        casper.disabledTest(test, 1200, 768, 'small');
        casper.disabledTest(test, 1201, 768, 'small');
    });

    //start
    casper.run(function(){
        test.done();
    });
});