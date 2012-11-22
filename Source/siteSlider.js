/*
---
description: siteSlider - MooTools plugin for sliding page

license: MIT-style

authors:
- Rafał Ronowicz

requires:
- MooTools 1.3 core

provides: siteSlider

...
*/

var SiteSlider = new Class({

    Implements: [Options, Events],

    options: {
        frames: '.frame',
        startFrame: 0,
        navs: ['ContSlidePrev', 'ContSlideNext'],
        menu: '.link',
        transition: Fx.Transitions.Linear,
        duration: 700,
        menuNav: false,
        menuNavName: '',
        onBeginning: function() {},
        onEnding: function() {}
    },


    /**
     * creating HTML structure | setting current status | constructing Tween object | bind resize function 
     */
    initialize: function (options) {
        this.setOptions(options);
        this.setFrameSize();

        this.Slider = new Element('div', {		// make up slider container
            id: 'Slider',
            styles: {
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }
        }).inject(document.body);
        
        this.FrameContainer = new Element('div', {		// make container for frames
            id: 'FrameContainer',
            styles: {
                width: $$(this.options.frames).length * this.setFrameSize()
            }
        }).inject(this.Slider).adopt($$(this.options.frames));
        
        $$(this.options.frames).each(function(item) {	//preventing from showing scrollbar
        	item.setStyle('overflow-y', 'hidden');
        });

        if (this.options.navs[0] == 'ContSlidePrev') {	// make buttons for navigation if not defined
            this.slidePrev = new Element('div', {		// left|prev
                id: 'ContSlidePrev',
                styles: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    height: '100%',
                    width: '50px',
                    'background-color': 'lime'
                }
            }).inject(document.body);

            this.slideNext = new Element('div', {		// right|next
                id: 'ContSlideNext',
                styles: {
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    height: '100%',
                    width: '50px',
                    'background-color': 'lime'
                }
            }).inject(document.body);
        } else {
            this.slidePrev = $(this.options.navs[0]);
            this.slideNext = $(this.options.navs[1]);
        }
        
        this.onMove = 0;							//status
        this.current = this.options.startFrame;		//current frame
        
        if (this.options.menuNav) {
            $(this.options.menuNavName).getElements('li').each(function (e, i) {
                that = this;
                e.addEvent('click', function () {
                    that.goToFrame(i);
                }, this);
            }, this);
        }

        this.myFx = new Fx.Tween(this.FrameContainer, {		//creating Fx.Tween object
            property: 'margin-left',
            duration: this.options.duration,
            transition: this.options.transition,
            link: 'ignore',
            onStart: (function () {
                this.onMove = 1;
                console.log(this.current);
                this.showScrollbar(false);
            }).bind(this),
            onComplete: (function () {
                this.onMove = 0;
                console.log(this.current);
                this.showScrollbar(true);
            }).bind(this)
        });

        this.slidePrev.addEvent('click', this.showPrev.bind(this));		// assign animation functions to triggers
        this.slideNext.addEvent('click', this.showNext.bind(this));

        $$(this.options.menu)[0].addClass('active');					// add navMenu selected element active class via css

        window.onresize = this.updateFrameContainer.bind(this);			// corrects frame sizes after resizing browser window
    },


    /**
     * sets sizes for frames equal to browser window sizes
     */
    setFrameSize: function () {
        var windowSize = window.getSize();
        $$(this.options.frames).each(function (i) {
            this.setOverflow(i);
            i.setStyles({
                width: windowSize.x,
                height: windowSize.y
            });
        }, this);
        return windowSize.x;
    },


    /**
     * function providing animation to the left 
     */
    showPrev: function (e) {
    	if (this.current != 0) {
    		this.goToFrame(this.current - 1);
    	} else {;
    		return;
    	}    	
    },


    /**
     * function providing animation to the right 
     */
    showNext: function (e) {
    	if (this.current != ($$(this.options.frames).length - 1)) {
    		this.goToFrame(this.current + 1);
    	} else {
    		return;
    	}
    },


    /**
     * function giving current slider position 
     */
    getCurrPos: function () {
        return (this.FrameContainer.getStyle('margin-left'));
    },


    /**
     * jumps to chosen frame 
     */
    jumpToFrame: function (p) {
        this.setFrameSize();
        this.FrameContainer.setStyle('margin-left', -(p * this.setFrameSize()));
        this.current = p;
    },


    /**
     * goes to specified frame with animation effect 
     */
    goToFrame: function (i) {
        if (this.onMove == 1) {
            return;
        } else {
            if (i < this.options.startFrame) {
                var x = this.options.startFrame - i;
                this.myFx.start(this.getCurrPos(), (parseInt(this.getCurrPos()) + (x * parseInt(this.setFrameSize()))));
                this.options.startFrame = i;
                this.current = i;
            } else if (this.options.startFrame < i) {
                var x = i - this.options.startFrame;
                this.myFx.start(this.getCurrPos(), (parseInt(this.getCurrPos()) - (x * parseInt(this.setFrameSize()))));
                this.options.startFrame = i;
                this.current = i;
            } else return;
        }        
    },


    /**
     * checks if needed to set overflow-y: auto for bigger frames
     */
    setOverflow: function (elem) {
        if (window.getSize()['y'] < elem.getSize()['y']) 
        	elem.setStyle('overflow-y', 'scroll');
    },
    
    
    /**
     * shows scrollbar after animation ends 
     */
    showScrollbar: function(show) {
    	if (show)	{
    		$$(this.options.frames)[this.current].setStyle('overflow-y', 'auto');
    	} else {
    		$$(this.options.frames)[this.current].setStyle('overflow-y', 'hidden');
    	}
    },


    /**
     * function which updates sizes after resizing browser window 
     */
    updateFrameContainer: function () {
        this.jumpToFrame(this.options.startFrame);
        $$(this.options.frames).each(function (i) {
            this.setOverflow(i);
        }, this);
        this.FrameContainer.setStyles({
            width: ($$(this.options.frames).length * this.setFrameSize())
        });
    }
});