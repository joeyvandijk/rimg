function addTest(test,wd,hg,imageType,type){
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

    var property = 'src';
    var element = 'img';
    var value = "images/image-"+imageType+".jpg";

    //check image properties
    this.then(function() {
        test.assertElementCount(element,1);
        test.assertExists(element,'image is found');
        test.assertEquals(String(this.getElementAttribute(element,property)),value,'image path is correct');
    });

    //initiate new item
    this.then(function(){
        casper.click('a.add');
    });

    //check image properties
    this.then(function() {
        value = "images/image-" + imageType + ".jpg,images/image2-" + imageType + ".jpg";
        test.assertElementCount(element, 2);
        test.assertEquals(String(this.getElementsAttribute(element, property)), value, 'image path #2 is correct');
    });

    //initiate new item
    this.then(function(){
        casper.click('a.add');
    });

    //check image properties
    this.then(function() {
        value = "images/image-"+imageType+".jpg,images/image2-"+imageType+".jpg,images/image2-"+imageType+".jpg";
        test.assertElementCount(element,3);
        test.assertEquals(String(this.getElementsAttribute(element,property)),value,'image path #3 is correct');
    });
}

casper.test.begin('Add test', 127, function suite(test) {
    var currentURL = params.url + '/add.html';
    casper.start(currentURL, function() {
        test.assertTitle('add test', "page title is okay");
    });

    casper.addTest = addTest;

    casper.then(function() {
        casper.addTest(test, 319, 480, 'tiny');
        casper.addTest(test, 320, 480, 'tiny');
        casper.addTest(test, 321, 480, 'tiny');
        casper.addTest(test, 479, 480, 'tiny');
        casper.addTest(test, 480, 480, 'small');
        casper.addTest(test, 481, 480, 'small');
        casper.addTest(test, 599, 480, 'small');
        casper.addTest(test, 600, 480, 'medium');
        casper.addTest(test, 601, 480, 'medium');
        casper.addTest(test, 767, 600, 'medium');
        casper.addTest(test, 768, 600, 'regular');
        casper.addTest(test, 769, 600, 'regular');
        casper.addTest(test, 1023, 768, 'regular');
        casper.addTest(test, 1024, 768, 'large');
        casper.addTest(test, 1025, 768, 'large');
        casper.addTest(test, 1199, 768, 'large');
        casper.addTest(test, 1200, 1024, 'huge');
        casper.addTest(test, 1201, 1024, 'huge');
    });

    //start
    casper.run(function(){
        test.done();
    });
});