//define global params
var params = {
    url:'http://localhost:8080'
};

//check the only image on the page
casper.checkImage = function(test,wd,hg,imageType,type){
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
        var property = 'src';
        var element = 'img';
        var value = "images/image-"+imageType+".jpg";
        if(type != undefined && type === 'manual'){
            //click on button to add manual image
            this.click('a.manual');
            this.wait(10);
        }else if(type != undefined && type === 'background'){
            property = 'style';
            element = 'div';
            value = 'background-image: url('+params.url+'/images/image-'+imageType+'.jpg); ';
        }
        test.assertExists(element,'image is found');
        test.assertEquals(String(this.getElementAttribute(element,property)),value,'image path is correct');
    });
};

//determine if the 3 SVG situations are correct
casper.checkSVG = function(test,wd,hg,imageType){
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
        var property = 'src';
        var element = 'img';
        var value = "images/image-"+imageType+".jpg";

        test.assertElementCount(element,3);

        //check images
        var list = this.getElementsAttribute(element,property);
        var i = 0;
        var il = list.length;
        while(i<il){
            switch(i){
                case 0:
                    //data-src="*.svg"
                    test.assertEquals(list[i],'','svg + data-src property');
                    break;
                case 1:
                    //src="*.svg"
                    test.assertEquals(list[i],'images/image.svg','svg + src property');
                    break;
                case 2:
                    //data-src="*.jpg"
                    test.assertEquals(list[i],value,'image path is correct');
                    break;
            }
            i++;
        }
    });
};

//ready
casper.test.done();