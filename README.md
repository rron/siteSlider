siteSlider
==========
Using siteSlider create *slides*, which you can scroll to the right or left. Let's say you have four elements in the code marked by the same class - for example `<div class="frame"></div>` - each with a different content. When the script runs, it assigns to each of these elements the same height and width, as the browser window actually has. Then assigns a previously declared elements of navigation functions, through which the scroll is carried out to further elements to the left - or right.

Demo included, just download.

## Main features
* enable to set unlimited (ofcourse, limited... by sense :)) frames
* if frame has bigger height of content, than the browser window, it will have `overflow-y: scroll` added. Donty worry about that.
* navigation provided by two different ways. By left/right buttons, or by menu which directs us to correct frame. You can use it alternately.
* compatibility with all modern browsers: IE6+, FF 3.6+, Opera9+, Safari and Chrome.
* it is easy to customize, and easy to use 

Modifications from v 0.1
------------------------
- Fixed issues with buggy sliding to 'empty' or inaccurate frames while changing triggers from arrows to menu and vice versa
- added feature which hide all scrollbars from each frame, and show it just when needed - when animation of sliding is ended on current frame

To do (Future plans)
-------------------
- Add functions triggered after reaching also first and last frame. In that moment it just stops, but i want to provide some additional function as an option for constructor
- (ambitious one...) Add posibility to draw frames in 'multiple lines'. Slide from right top frame, to left bottom one for example
- add control by keboard keys

Requirements
------------
* MooTools 1.3 or higher (also tested with 1.4.5)   

How to use
-------------
At first, we have to set some markup. In general, we need to create elements which will hold some content, with the same class - for example `frame`.  Then add elements, which should be our triggers for sliding site. The last thing out there, is to put elements (for example list with `<li>` nodes), equal in number of `frame` class holders. 

    <div id="container">
      <div id="controls">
        <div id="sliderLeft">click to move slider left</div>
        <div id="sliderRight">click to move slider right</div>
        <ul id="selectFrame">
          <li class="link"><a href="#">frame 1</a></li>
          <li class="link"><a href="#">frame 2</a></li>
          <li class="link"><a href="#">frame 3</a></li>
          <li class="link"><a href="#">frame 4</a></li>
        </ul>
      </div>
      <div class="frame">
        <p>content of frame 1</p>
      </div>
      <div class="frame">
        <p>content of frame 2</p>
      </div>
      <div class="frame">
        <p>content of frame 3</p>
      </div>
      <div class="frame">
        <p>content of frame 4</p>
      </div>      
    </div>

Then, we should add some styling:

    body {
      overflow:hidden;
    }
    
    #container {
      overflow:hidden;
    }
    
    #controls ul {
      position:absolute; 
      top:150px; left:150px;
    }
    
    #controls li {
      float:left; margin:0 10px;
    }
    
    #sliderLeft, #sliderRight {
      position:absolute; 
      top:50%; 
      width:80px; 
      height:80px; 
      margin-top:-40px; 
      cursor:pointer; 
      background:#AFAFAF;
    } 
    
    #sliderLeft {
      left:0;
    }
    
    #sliderRight {
      right:0;
    }
    
    .frame {
      float:left; height:100%; width:100%; overflow:hidden;
    }

    
IMPORTANT thing if We want to use it also in IE7 !

add that line to styles used for IE7 (ie. HTML conditional comments providing IE7 specified stylesheets or hacks, like in this demo ;))

    html {
      overflow: auto;
    }    
    
Last thing, is to include some js code running our slider !
    
    window.addEvent('domready', function()  {
    
      var ss = new SiteSlider({
        frames: '.frame',
        navs: ['sliderLeft', 'sliderRight'],
        duration: 700,
        transition: Fx.Transitions.Quad.easeInOut,
        menuNav: true,
        menuNavName: 'selectFrame'
      });    
      
    });

Options
-------
* `frames` - css class to select frames
* `navs` ie: `['slideLeft', 'slideRight']` - array with animation triggers for moving left and right
* `menu` - css selector for providing animation from menu
* `transition` - MooTools Fx class used in animation
* `duration` - duration of animation
* `menuNav` - set to true if we will use menu for navigation between slides
* `menuNavName` - css selector for navigation menu



  