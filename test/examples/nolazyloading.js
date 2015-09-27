function nolazyloadingTest(test,wd,hg,imageType,articleImageType){
    //change viewport size
    this.then(function() {
        casper.viewport(wd, hg,function(){
            test.comment('Window resolution is ' + this.evaluate(function() {
                return window.innerWidth+'x'+window.innerHeight;
            }), 'DEBUG');
        });
    });
    this.then(function reload(){
        casper.addConsoleListener();

        casper.reload();
    });

    //check image properties
    this.then(function testProperties() {
        //check images & article images
        var property = 'src';
        var value;
        var element = 'section > img';
        value = [
            'images/image-'+imageType+'.jpg',
            'images/image-'+imageType+'.jpg',
            'images/image-'+imageType+'.jpg',
            'images/image-'+imageType+'.jpg',
            'images/image-'+imageType+'.jpg'
        ];
        test.assertElementCount(element,5);
        test.assertExists(element,'images are found');
        test.assertEquals(this.getElementsAttribute(element,property),value,'section images okay');

        //check for console issues
        casper.checkConsoleErrors();
        test.assertEquals(casper.issues.length,0,'Amount of client console errors is not more than 0.');

        element = 'article > img';
        value = [
            'images/image-'+articleImageType+'.jpg',
            'images/image-'+articleImageType+'.jpg',
            'images/image-'+articleImageType+'.jpg',
            'images/image-'+articleImageType+'.jpg'
        ];
        test.assertElementCount(element,4);
        test.assertExists(element,'article images are found');
        test.assertEquals(this.getElementsAttribute(element,property),value,'article images okay');

        //check for console issues
        casper.checkConsoleErrors();
        test.assertEquals(casper.issues.length,0,'Amount of client console errors is not more than 0.');

        //remove listeners
        casper.removeListener('page.error', failed);
        casper.removeListener('remote.message', failed);
    });
};

casper.test.begin('No lazy loading test', 145, function suite(test) {
    var currentURL = params.url + '/nolazyloading.html';
    casper.start(currentURL, function() {
        test.assertTitle('no lazy loading (scroll) test', "page title is okay");
    });
    
    casper.nolazyloadingTest = nolazyloadingTest;

    casper.then(function() {
        casper.nolazyloadingTest(test, 319, 480, 'tiny', 'tiny');
        casper.nolazyloadingTest(test, 320, 480, 'tiny', 'tiny');
        casper.nolazyloadingTest(test, 321, 480, 'small', 'tiny');
        casper.nolazyloadingTest(test, 479, 480, 'small', 'tiny');
        casper.nolazyloadingTest(test, 480, 480, 'small', 'tiny');
        casper.nolazyloadingTest(test, 481, 480, 'medium', 'tiny');
        casper.nolazyloadingTest(test, 599, 480, 'medium', 'tiny');
        casper.nolazyloadingTest(test, 600, 480, 'medium', 'tiny');
        casper.nolazyloadingTest(test, 601, 480, 'regular', 'tiny');
        casper.nolazyloadingTest(test, 767, 600, 'regular', 'small');
        casper.nolazyloadingTest(test, 768, 600, 'regular', 'small');
        casper.nolazyloadingTest(test, 769, 600, 'large', 'small');
        casper.nolazyloadingTest(test, 1023, 768, 'large', 'medium');
        casper.nolazyloadingTest(test, 1024, 768, 'large', 'medium');
        casper.nolazyloadingTest(test, 1025, 768, 'huge', 'medium');
        casper.nolazyloadingTest(test, 1199, 768, 'huge', 'medium');
        casper.nolazyloadingTest(test, 1200, 1024, 'huge', 'medium');
        casper.nolazyloadingTest(test, 1201, 1024, 'huge', 'medium');
    });

    //start
    casper.run(function(){
        test.done();
    });
});