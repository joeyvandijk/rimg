function createList(imageType,total,hits){
    var list = hits.split(',');
    var value = [];
    var i = 0;
    var il = total;
    var a,al,fnd;
    while(i<il){
        a = 0;
        al = list.length;
        while(a<al){
            if(Number(list[a]) === i){
                fnd = true;
                break;
            }
            a++;
        }
        if(fnd){
            value.push('images/image-'+imageType+'.jpg');
        }else{
            value.push('');
        }
        fnd = false;
        i++;
    }
    //console.log('@',value);
    return value;
}

function lazyloadingTest(test,wd,hg,imageType,hits){
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
    var property = 'src';
    var value;
    var element = 'section > img';
    var totalImages = 4;
    this.then(function testProperties() {
        //check images & article images
        value = createList(imageType,totalImages,hits[0]);
        test.assertElementCount(element,totalImages);
        test.assertExists(element,'images are found');
        test.assertEquals(this.getElementsAttribute(element,property),value,'section images (0) okay');

        //check for console issues
        casper.checkConsoleErrors();
        test.assertEquals(casper.issues.length,0,'Amount of client console errors is not more than 0.');
    });
    this.then(function scroll1(){
        casper.scrollTo(0,400);
    });
    this.then(function testProperties2() {
        //check images & article images
        value = createList(imageType,totalImages,hits[1]);
        test.assertEquals(this.getElementsAttribute(element,property),value,'section images (400) okay');

        //check for console issues
        casper.checkConsoleErrors();
        test.assertEquals(casper.issues.length,0,'Amount of client console errors is not more than 0.');
    });
    this.then(function scroll2(){
        casper.scrollTo(0,795);
    });
    this.then(function testProperties3() {
        //check images & article images
        value = createList(imageType,totalImages,hits[2]);
        test.assertEquals(this.getElementsAttribute(element,property),value,'section images (795) okay');

        //check for console issues
        casper.checkConsoleErrors();
        test.assertEquals(casper.issues.length,0,'Amount of client console errors is not more than 0.');
    });
    this.then(function scroll3(){
        casper.scrollTo(0,4329);
    });
    this.then(function testProperties4() {
        //check images & article images
        value = createList(imageType,totalImages,hits[3]);
        test.assertEquals(this.getElementsAttribute(element,property),value,'section images (4329) okay');

        //check for console issues
        casper.checkConsoleErrors();
        test.assertEquals(casper.issues.length,0,'Amount of client console errors is not more than 0.');

        //remove listeners
        casper.removeListener('page.error', failed);
        casper.removeListener('remote.message', failed);
    });
};

casper.test.begin('Lazy loading test', 181, function suite(test) {
    var currentURL = params.url + '/lazyloading.html';
    casper.start(currentURL, function() {
        test.assertTitle('lazy loading (scroll) test', "page title is okay");
    });

    casper.lazyloadingTest = lazyloadingTest;

    casper.then(function() {
        casper.lazyloadingTest(test, 319, 480, 'tiny', ['0','0,1','0,1','0,1,3']);
        casper.lazyloadingTest(test, 320, 480, 'tiny', ['0','0,1','0,1','0,1,3']);
        casper.lazyloadingTest(test, 321, 480, 'tiny', ['0','0,1','0,1','0,1,3']);
        casper.lazyloadingTest(test, 479, 480, 'tiny', ['0,1','0,1','0,1','0,1,2']);
        casper.lazyloadingTest(test, 480, 480, 'small', ['0,1','0,1','0,1','0,1,2']);
        casper.lazyloadingTest(test, 481, 480, 'small', ['0,1','0,1','0,1','0,1,2']);
        casper.lazyloadingTest(test, 599, 480, 'small', ['0,1','0,1','0,1','0,1,2']);
        casper.lazyloadingTest(test, 600, 480, 'medium', ['0,1','0,1','0,1','0,1,2']);
        casper.lazyloadingTest(test, 601, 480, 'medium', ['0,1','0,1','0,1','0,1,2']);
        casper.lazyloadingTest(test, 767, 600, 'medium', ['0,1','0,1','0,1','0,1,2']);
        casper.lazyloadingTest(test, 768, 600, 'regular', ['0,1','0,1','0,1','0,1,2']);
        casper.lazyloadingTest(test, 769, 600, 'regular', ['0,1','0,1','0,1','0,1,2']);
        casper.lazyloadingTest(test, 1023, 768, 'regular', ['0,1,2','0,1,2','0,1,2','0,1,2,3']);
        casper.lazyloadingTest(test, 1024, 768, 'large', ['0,1,2','0,1,2','0,1,2','0,1,2,3']);
        casper.lazyloadingTest(test, 1025, 768, 'large', ['0,1,2','0,1,2','0,1,2','0,1,2,3']);
        casper.lazyloadingTest(test, 1199, 768, 'large', ['0,1,2','0,1,2','0,1,2','0,1,2,3']);
        casper.lazyloadingTest(test, 1200, 768, 'huge', ['0,1,2','0,1,2','0,1,2','0,1,2,3']);
        casper.lazyloadingTest(test, 1201, 768, 'huge', ['0,1,2','0,1,2','0,1,2','0,1,2,3']);
    });

    //start
    casper.run(function(){
        test.done();
    });
});