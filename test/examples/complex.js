function complexTest(test,wd,hg,firstImageType,secondImageType){
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
    this.then(function() {
        //check images & article images
        var property = 'src';
        var element = 'img';
        test.assertElementCount(element,2);
        test.assertExists(element,'images are found');

        //first image
        var value = 'images/image2-'+firstImageType+'.jpg';
        element = 'img.first';
        test.assertEquals(this.getElementAttribute(element,property),value,'first image okay');

        //second image
        value = 'images/image-'+secondImageType+'.jpg';
        element = 'img.second';
        test.assertEquals(this.getElementAttribute(element,property),value,'second image okay');
    });
};

casper.test.begin('Complex test', 73, function suite(test) {
    var currentURL = params.url + '/complex.html';
    casper.start(currentURL, function() {
        test.assertTitle('complex test', "page title is okay");
    });

    casper.complexTest = complexTest;

    casper.then(function() {
        casper.complexTest(test, 319, 480, 'tiny', 'tiny');
        casper.complexTest(test, 320, 480, 'tiny', 'tiny');
        casper.complexTest(test, 321, 480, 'tiny', 'tiny');
        casper.complexTest(test, 479, 480, 'tiny', 'tiny');
        casper.complexTest(test, 480, 480, 'tiny', 'tiny');
        casper.complexTest(test, 481, 480, 'tiny', 'tiny');
        casper.complexTest(test, 599, 480, 'tiny', 'tiny');
        casper.complexTest(test, 600, 480, 'tiny', 'tiny');
        casper.complexTest(test, 601, 480, 'tiny', 'tiny');
        casper.complexTest(test, 767, 600, 'tiny', 'small');
        casper.complexTest(test, 768, 600, 'tiny', 'small');
        casper.complexTest(test, 769, 600, 'tiny', 'small');
        casper.complexTest(test, 1023, 768, 'tiny', 'medium');
        casper.complexTest(test, 1024, 768, 'tiny', 'medium');
        casper.complexTest(test, 1025, 768, 'tiny', 'medium');
        casper.complexTest(test, 1199, 768, 'tiny', 'regular');
        casper.complexTest(test, 1200, 1024, 'tiny', 'regular');
        casper.complexTest(test, 1201, 1024, 'tiny', 'regular');
    });

    //start
    casper.run(function(){
        test.done();
    });
});