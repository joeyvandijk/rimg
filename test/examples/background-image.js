casper.test.begin('Background-image test', 37, function suite(test) {
    var currentURL = params.url + '/background-image.html';
    casper.start(currentURL, function() {
        test.assertTitle('background-image test', "page title is okay");
    });

    casper.then(function() {
        casper.checkImage(test, 319, 480, 'tiny', 'background');
        casper.checkImage(test, 320, 480, 'tiny', 'background');
        casper.checkImage(test, 321, 480, 'tiny', 'background');
        casper.checkImage(test, 479, 480, 'tiny', 'background');
        casper.checkImage(test, 480, 480, 'small', 'background');
        casper.checkImage(test, 481, 480, 'small', 'background');
        casper.checkImage(test, 599, 480, 'small', 'background');
        casper.checkImage(test, 600, 480, 'medium', 'background');
        casper.checkImage(test, 601, 480, 'medium', 'background');
        casper.checkImage(test, 767, 600, 'medium', 'background');
        casper.checkImage(test, 768, 600, 'regular', 'background');
        casper.checkImage(test, 769, 600, 'regular', 'background');
        casper.checkImage(test, 1023, 768, 'regular', 'background');
        casper.checkImage(test, 1024, 768, 'large', 'background');
        casper.checkImage(test, 1025, 768, 'large', 'background');
        casper.checkImage(test, 1199, 768, 'large', 'background');
        casper.checkImage(test, 1200, 1024, 'huge', 'background');
        casper.checkImage(test, 1201, 1024, 'huge', 'background');
        test.comment('done');
    });

    //start
    casper.run(function(){
        test.done();
    });
});