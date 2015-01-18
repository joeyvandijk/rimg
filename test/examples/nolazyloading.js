function nolazyloadingTest(test,wd,hg,imageType,articleImageType){
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
    });
};

casper.test.begin('No lazy loading test', 109, function suite(test) {
    var currentURL = params.url + '/nolazyloading.html';
    casper.start(currentURL, function() {
        test.assertTitle('no lazy loading (scroll) test', "page title is okay");
    });
    
    casper.nolazyloadingTest = nolazyloadingTest;

    casper.then(function() {
        casper.nolazyloadingTest(test, 319, 480, 'tiny', 'tiny');
        casper.nolazyloadingTest(test, 320, 480, 'tiny', 'tiny');
        casper.nolazyloadingTest(test, 321, 480, 'tiny', 'tiny');
        casper.nolazyloadingTest(test, 479, 480, 'tiny', 'tiny');
        casper.nolazyloadingTest(test, 480, 480, 'small', 'tiny');
        casper.nolazyloadingTest(test, 481, 480, 'small', 'tiny');
        casper.nolazyloadingTest(test, 599, 480, 'small', 'tiny');
        casper.nolazyloadingTest(test, 600, 480, 'medium', 'tiny');
        casper.nolazyloadingTest(test, 601, 480, 'medium', 'tiny');
        casper.nolazyloadingTest(test, 767, 600, 'medium', 'tiny');
        casper.nolazyloadingTest(test, 768, 600, 'regular', 'tiny');
        casper.nolazyloadingTest(test, 769, 600, 'regular', 'tiny');
        casper.nolazyloadingTest(test, 1023, 768, 'regular', 'small');
        casper.nolazyloadingTest(test, 1024, 768, 'large', 'small');
        casper.nolazyloadingTest(test, 1025, 768, 'large', 'small');
        casper.nolazyloadingTest(test, 1199, 768, 'large', 'small');
        casper.nolazyloadingTest(test, 1200, 1024, 'huge', 'small');
        casper.nolazyloadingTest(test, 1201, 1024, 'huge', 'small');
    });

    //start
    casper.run(function(){
        test.done();
    });
});