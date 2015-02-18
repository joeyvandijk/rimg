//define global params
var params = {
    url:'http://localhost:8080'
};

function failed(msg,trace){
    //check if it is just a warning
    if(msg.indexOf('Rimg:') === -1 &&
        msg.indexOf('Rimg.execute():') === -1 &&
        msg.indexOf('Rimg.initialize():') === -1 &&
        msg.indexOf('(remark) Rimg') === -1
    ){
        //real issue, so show that test fails
        this.issues.push(msg);
    }
}

casper.addConsoleListener = function(){
    var self = this;
    this.issues = [];//onto the casper object for reference
    self.on("page.error", failed);
    self.on("remote.message", failed);
};

casper.checkConsoleErrors = function(ignore){
    var i = 0;
    var il = this.issues.length;
    var g,gl,fnd;
    var list = [];
    while(i<il){
        fnd = false;
        if(ignore){
            g = 0;
            gl = ignore.length;
            inner:while(g<gl){
                if(this.issues[i].indexOf(ignore[g]) !== -1){
                    fnd = true;
                    break inner;
                }
                g++;
            }
        }
        if(!fnd){
            list.push(this.issues[i]);
        }
        i++;
    }
    if(list.length){
        this.echo('======= CONSOLE ERRORS =======','WARNING');
        this.echo(list.join(',\n'),'WARNING');
        this.echo('======= END CONSOLE ERRORS =======','WARNING');
    }
    //overwrite issues list due to filtered messages (if available)
    casper.issues = list;
};

//check the only image on the page
casper.checkImage = function(test,wd,hg,imageType,type){
    //change viewport size
    this.then(function initiateViewport() {
        casper.viewport(wd, hg,function viewportResponse(){
            test.comment('Window resolution is ' + this.evaluate(function() {
                return window.innerWidth+'x'+window.innerHeight;
            }), 'DEBUG');
        });
    });

    this.then(function reload(){
        casper.addConsoleListener();

        //reload the page
        casper.reload();
    });

    //check image properties
    this.then(function testProperties() {
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

        //check for console issues
        casper.checkConsoleErrors();
        test.assertEquals(casper.issues.length,0,'Amount of client console errors is not more than 0.');

        //remove listeners
        casper.removeListener('page.error', failed);
        casper.removeListener('remote.message', failed);
    });
};

//determine if the 3 SVG situations are correct
casper.checkSVG = function(test,wd,hg,imageType){
    //change viewport size
    this.then(function initiateViewport() {
        casper.viewport(wd, hg,function viewportResponse(){
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
                    test.assertEquals(list[i],'images/image.svg','svg + data-src property');
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

        //check background-image (with svg)
        element = 'div';
        property = 'style';
        test.assertElementCount(element,1);
        //data-background-image="*.svg" style="width:200px;height:50px;"
        test.assertEquals(this.getElementsAttribute(element,property)[0],'background-image: url(images/image.svg);width:200px;height:50px;','div + data-background-image property (svg)');

        //check for console issues
        casper.checkConsoleErrors();
        test.assertEquals(casper.issues.length,0,'Amount of client console errors is not more than 0.');

        //remove listeners
        casper.removeListener('page.error', failed);
        casper.removeListener('remote.message', failed);
    });
};

//ready
casper.test.done();