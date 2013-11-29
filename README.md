#RIMG

"Responsive-image" (RIMG) supports responsive websites to provide a way to optimize images (like CMS-content) in a simple and performant way. Pure Javascript, no server-side code and 2 lines of code (library + definition).

It is based on the idea that when the DOM is loaded, it will traverse the DOM, looking for ```<img>```-nodes, and alter the ```src```-property. You can also [manually](https://github.com/joeyvandijk/rimg/tree/master#api) execute this task.  
Rimg uses an adapted version of the [srcset](http://www.w3.org/html/wg/drafts/srcset/w3c-srcset/) specification, while you don't need to define with every image 3(+) breakpoints. Just provide the image basename and let Rimg do the adjustments.
  
See the [demo](http://joeyvandijk.github.io/rimg) or look [here](https://github.com/joeyvandijk/rimg/tree/master#breakpoints) how the breakpoints are used.
  
# Getting Started
1. Define custom filenaming strategy, like `-tiny`, `-small`, `-medium`, `-regular`, `-large` and `-huge` to have a clear distinction between all breakpoint-steps.
2. Define initial breakpoints, like 
```javascript
var RimgBreakpoint = '-tiny 320w 1x, -tiny-retina 320w 2x, -small 480w 1x, -small-retina 480w 2x, -medium 600w 1x, -medium-retina 600w 2x, -regular 768w 1x, -regular-retina 768w 2x, -large 1024w 1x, -large-retina 1024w 2x, -huge w 1x';
``` 
before you load the minified version of Rimg.

3. Load the script, like ```<script src="//cdnjs.cloudflare.com/ajax/libs/rimg/0.9.0/rimg.min.js"></script>```. You can put it before the ```</body>``` or before the ```</head>``` tag.

will result in something like:

```html
<script>
var RimgBreakpoint = '-tiny 320w 1x, -tiny-retina 320w 2x, -small 480w 1x, -small-retina 480w 2x, -medium 600w 1x, -medium-retina 600w 2x, -regular 768w 1x, -regular-retina 768w 2x, -large 1024w 1x, -large-retina 1024w 2x, -huge w 1x';</script>
<script src="//cdnjs.cloudflare.com/ajax/libs/rimg/0.9.0/rimg.min.js"></script>
</head>
<body>
<img data-src="image.jpg"/>
```

Now you have a working setup that will check your DOM-element dimensions to determine which image-file suits best to show in your HTML page.

## Dependencies
* HTML5
  * [Mediaqueries](http://caniuse.com/#feat=css-mediaqueries) support in the browser you want to support.
  * Use `<meta name="viewport" content="width=device-width, initial-scale=1">` or another scale, but use the viewport-meta-tag to let Rimg do the work.
* A clear **filenaming strategy** that you will use with all your image-filenames you use.
* Use **CSS** or ```style=""``` to adjust ```<img>``` dimensions and Rimg will only listen to that values.
  
  
  
# Documentation
## Features
* responsive images that respond to **retina**-screens, **browser-resizes**, **DOMContentLoaded**-events and **DOM-changes**
* **reconfigure** after Rimg is loaded/executed by using ```Rimg.configure(breakpoints);``` 
* **disable** auto introspection, so only **manually** adjustable by using ```Rimg.configure(breakpoints);``` and ```Rimg.execute(targetElement);```
* only ```<img>``` elements with ```data-src``` property will be adjusted by Rimg, so implement on one, some or all images.
* pure frontend ( **javascript** ) solution and no server-side setup/code is necessary.
* **art direction support**, respect the chosen filenaming strategy and alter your ```<img>``` in any way (square?) and save the file (square?) used in that breakpoint and everything works!
* independent library, it is **NO** plugin for jQuery, you don't need to load any other javascript library.

## API
* **Rimg.execute(target)** (Element) - provide a DOM element to determine if it is or has ```<img>``` elements to change.
* **Rimg.configure(breakpoints)** (String) - provide the breakpoints so Rimg can determine which picture to use.
* **Rimg.disableIntrospection()** - prevents scan for images after a DOM-load or DOM-changes or a resize, so manually select <img> to adjust.
* Use the example below before loading the script itself to set initial breakpoints. 

```javascript
var RimgBreakpoint = '-small 480w 1x, -small-retina 480w 2x, -regular 768w 1x, 
-regular-retina 768w 2x, -large 1024w 1x, -large-retina 1024w 2x';
``` 

## Breakpoints
Define a custom filenaming setup. It is based on the [srcset](http://www.w3.org/html/wg/drafts/srcset/w3c-srcset/) specification. For example:

```html
<img data-src="image.jpg"/>
```

will become 

```html
<img src="image-small.jpg" data-src="image.jpg"/>
```

in the situation where the `-small 480w 1x` breakpoint is valid. `image.jpg` is non-existent, but it is the base filename to use with all images.

```var RimgBreakpoint = '-small 480w 1x, -small-retina 480w 2x, -regular 768w 1x, -regular-retina 768w 2x, -large 1024w 1x, -large-retina 1024w 2x';```   
gives you all the freedom by defining 1 (or more) breakpoints with the flexibility to add specific image-files for retina-screens like the iPad, iPhone or Samsung Galaxy S.., etc.  
While the [srcset](http://www.w3.org/html/wg/drafts/srcset/w3c-srcset/) specification only references `2x` as maximum pixel aspect ratio, this is not current. Because devices already exist with `devicePixelRatio` as high as `3x` or even higher (with 1080p screen).

You can skip the retina option or skip certain breakpoints (`480w` or `768w`) or even add weird ones (like ```-special 456w 1x```).

The `w` in `480w` defines the width property to check. During development of responsive websites I haven't found many examples to use `h` for the height, but I did found issues with javascript returning `0` as the height of non-loaded images; even when the height is set in `%`.
This is why I provide the option to use `480h` but I do **advise to use the width as a breakpoint** (kind of best practice).
  
  
  
# Examples
See the ```/test``` directory for more information how to use this library.  
To view the examples in the `/test`-directory, clone the project and go to your commandline:
* go the `rimg/test`-directory
* type `npm install` ([nodejs](http://nodejs.org) needed!)
* type `node server.js` and go to `localhost:8080` 

to check the examples locally or see the [demo](http://joeyvandijk.github.io/rimg) online.
    
    
    
# Contributing
Please do test, check and come with pull requests/issues/remarks to further extend/stabilize this library.
  
  
  
# Changelog
1.0.0 IE8 support + fixed bugs  
0.9.0 version bump + fixed visual performance (less latency) + cleaned error when no breakpoint defined  
0.4.1 fixed issue with body element not always as 2nd option  
0.4.0 fixed issue with html comments blocking its execution  
0.3.5 moved bandwidth detection into a separate branch  
0.3.0 firefox bug (width=0) fixed  
0.2.5 mutations fix  
0.2.0 retina-fix + tests made  
0.1.0 initial release
  
  
  
# FAQ
See the [Wiki](wiki/FAQ) for more information.



# Supports
* IE8+
* Chrome
* Firefox
* Safari



# TODO
* bandwidth detection solution (optional)
* data-src attribute changed (not-cross browser support?)
* object way of initializing (disable/etc) (optional)  
* casperjs - automated tests
* "echo" determine if images are visible to enable the change or wait (optional)