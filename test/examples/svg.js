casper.test.begin('Simple test', 127, function suite(test) {
    var currentURL = params.url + '/svg.html';
    casper.start(currentURL, function() {
        test.assertTitle('svg test', "page title is okay");
    });

    casper.then(function() {
        casper.checkSVG(test, 319, 480, 'tiny');
        casper.checkSVG(test, 320, 480, 'tiny');
        casper.checkSVG(test, 321, 480, 'small');
        casper.checkSVG(test, 479, 480, 'small');
        casper.checkSVG(test, 480, 480, 'small');
        casper.checkSVG(test, 481, 480, 'medium');
        casper.checkSVG(test, 599, 480, 'medium');
        casper.checkSVG(test, 600, 480, 'medium');
        casper.checkSVG(test, 601, 480, 'regular');
        casper.checkSVG(test, 767, 600, 'regular');
        casper.checkSVG(test, 768, 600, 'regular');
        casper.checkSVG(test, 769, 600, 'large');
        casper.checkSVG(test, 1023, 768, 'large');
        casper.checkSVG(test, 1024, 768, 'large');
        casper.checkSVG(test, 1025, 768, 'huge');
        casper.checkSVG(test, 1199, 768, 'huge');
        casper.checkSVG(test, 1200, 1024, 'huge');
        casper.checkSVG(test, 1201, 1024, 'huge');
    });

    //start
    casper.run(function(){
        test.done();
    });
});