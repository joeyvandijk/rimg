function modifiedTest(test,wd,hg,beforeImageType,afterImageType) {
  //change viewport size
  this.then(function () {
    casper.viewport(wd, hg, function () {
      test.comment('Window resolution is ' + this.evaluate(function () {
        return window.innerWidth + 'x' + window.innerHeight;
      }), 'DEBUG');
    });
  });
  this.then(function reload() {
    casper.addConsoleListener();

    casper.reload();
  });

  var property = 'src';
  var element = 'img';

  //check image properties
  this.then(function testProperties() {
    //check images & article images
    test.assertElementCount(element, 1);
    test.assertExists(element, 'image is found');

    //first image
    var value = 'images/image-' + beforeImageType + '.jpg';
    test.assertEquals(this.getElementAttribute(element, property), value, 'image before okay');
  });

  this.then(function wait() {
    //change size of container
    this.click('a.manual');
    this.wait(10);
  });

  this.then(function check() {
    var value = 'images/image-' + afterImageType + '.jpg';
    test.assertEquals(this.getElementAttribute(element, property), value, 'image after okay');

    //check for console issues
    casper.checkConsoleErrors(['Image is loaded']);
    test.assertEquals(casper.issues.length, 0, 'Amount of client console errors is not more than 0.');

    //remove listeners
    casper.removeListener('page.error', failed);
    casper.removeListener('remote.message', failed);
  });
};

casper.test.begin('Modified test', 1, function suite(test) {
  var currentURL = params.url + '/modified.html';
  casper.start(currentURL, function() {
    test.assertTitle('modified test', "page title is okay");
  });

  casper.modifiedTest = modifiedTest;

  casper.then(function() {
    //TODO no support for MutationObservers in CasperJS/PhantomJS = will skip polyfill but Webkit does not support DOMAttrModified so nothing is changed
    //casper.modifiedTest(test, 319, 480, 'tiny', 'tiny');
    //casper.modifiedTest(test, 320, 480, 'tiny', 'tiny');
    //casper.modifiedTest(test, 321, 480, 'tiny', 'tiny');
    //casper.modifiedTest(test, 479, 480, 'tiny', 'tiny');
    //casper.modifiedTest(test, 480, 480, 'tiny', 'small');
    //casper.modifiedTest(test, 481, 480, 'tiny', 'small');
    //casper.modifiedTest(test, 599, 480, 'tiny', 'small');
    //casper.modifiedTest(test, 600, 480, 'tiny', 'medium');
    //casper.modifiedTest(test, 601, 480, 'tiny', 'medium');
    //casper.modifiedTest(test, 767, 600, 'tiny', 'medium');
    //casper.modifiedTest(test, 768, 600, 'tiny', 'regular');
    //casper.modifiedTest(test, 769, 600, 'tiny', 'regular');
    //casper.modifiedTest(test, 1023, 768, 'small', 'regular');
    //casper.modifiedTest(test, 1024, 768, 'small', 'large');
    //casper.modifiedTest(test, 1025, 768, 'small', 'large');
    //casper.modifiedTest(test, 1199, 768, 'medium', 'large');
    //casper.modifiedTest(test, 1200, 1024, 'medium', 'huge');
    //casper.modifiedTest(test, 1201, 1024, 'medium', 'huge');
  });

  //start
  casper.run(function(){
    test.done();
  });
});