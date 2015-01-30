casper.test.begin('Async test', 55, function suite(test) {
    var currentURL = params.url + '/async.html';
    casper.start(currentURL, function() {
        test.assertTitle('async test', "page title is okay");
    });

    casper.then(function() {
        casper.checkImage(test, 319, 480, 'tiny');
        casper.checkImage(test, 320, 480, 'tiny');
        casper.checkImage(test, 321, 480, 'tiny');
        casper.checkImage(test, 479, 480, 'tiny');
        casper.checkImage(test, 480, 480, 'small');
        casper.checkImage(test, 481, 480, 'small');
        casper.checkImage(test, 599, 480, 'small');
        casper.checkImage(test, 600, 480, 'medium');
        casper.checkImage(test, 601, 480, 'medium');
        casper.checkImage(test, 767, 600, 'medium');
        casper.checkImage(test, 768, 600, 'regular');
        casper.checkImage(test, 769, 600, 'regular');
        casper.checkImage(test, 1023, 768, 'regular');
        casper.checkImage(test, 1024, 768, 'large');
        casper.checkImage(test, 1025, 768, 'large');
        casper.checkImage(test, 1199, 768, 'large');
        casper.checkImage(test, 1200, 1024, 'huge');
        casper.checkImage(test, 1201, 1024, 'huge');
    });

    //start
    casper.run(function(){
        test.done();
    });
});