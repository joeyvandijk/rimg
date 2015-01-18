casper.test.begin('Manual test', 37, function suite(test) {
    var currentURL = params.url + '/manual.html';
    casper.start(currentURL, function() {
        test.assertTitle('manual test', "page title is okay");
    });

    casper.then(function(){
        casper.checkImage(test,319,480,'tiny','manual');
        casper.checkImage(test,320,480,'tiny','manual');
        casper.checkImage(test,321,480,'tiny','manual');
        casper.checkImage(test,479,480,'tiny','manual');
        casper.checkImage(test,480,480,'small','manual');
        casper.checkImage(test,481,480,'small','manual');
        casper.checkImage(test,599,480,'small','manual');
        casper.checkImage(test,600,480,'medium','manual');
        casper.checkImage(test,601,480,'medium','manual');
        casper.checkImage(test,767,600,'medium','manual');
        casper.checkImage(test,768,600,'regular','manual');
        casper.checkImage(test,769,600,'regular','manual');
        casper.checkImage(test,1023,768,'regular','manual');
        casper.checkImage(test,1024,768,'large','manual');
        casper.checkImage(test,1025,768,'large','manual');
        casper.checkImage(test,1199,768,'large','manual');
        casper.checkImage(test,1200,1024,'huge','manual');
        casper.checkImage(test,1201,1024,'huge','manual');
    });


    //start
    casper.run(function(){
        test.done();
    });
});