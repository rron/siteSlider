/*
  SiteSlide - MooTools plugin for sliding sites left/right !
  Author: Rafal Ronowicz
  License: GNU Public License
  Checkout: http://github.com/rron/siteSlider  
*/

var siteSlider = new Class({
  
  Implements: [Options, Events],
  
  options: {  
    frames: '.frame',
    startFrame: 0,
    navs: ['ContSlidePrev', 'ContSlideNext'],
    menu: '.link',
    transition: Fx.Transitions.Linear,
    duration: 300,
    menuNav: false,
    menuNavName: ''
  },
  
  initialize: function(options) {
    this.setOptions(options);
    this.setFrameSize();     
   
    // tworzy Slider
    this.Slider = new Element('div', {
      id: 'Slider',
      styles: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'  
      }
    }).inject(document.body);
        
    // tworzy Kontener dla Slide'ow
    this.FrameContainer = new Element('div', {
      id: 'FrameContainer',
      styles: {
        width: $$(this.options.frames).length * this.setFrameSize()  
      }
    }).inject(this.Slider).adopt($$(this.options.frames));
        
    // tworzy buttony jeśli nie sa zdefiniowane w konstruktorze
    if (this.options.navs[0] == 'ContSlidePrev') {
      // wstecz
      this.slidePrev = new Element('div', {id: 'ContSlidePrev', styles: {position: 'absolute', top: '0', left: '0', height: '100%', width: '50px', 'background-color': 'lime'}}).inject(document.body);
      // wprzod
      this.slideNext = new Element('div', {id: 'ContSlideNext', styles: {position: 'absolute', top: '0', right: '0', height: '100%', width: '50px', 'background-color': 'lime'}}).inject(document.body);  
    } else {
      this.slidePrev = $(this.options.navs[0]);
      this.slideNext = $(this.options.navs[1]);            
    }
    
    // ustawienie statusu
    this.status = 0;
    
    if (this.options.menuNav)  {
      $(this.options.menuNavName).getElements('li').each(function(e,i)  {
        that = this;
        e.addEvent('click', function()  {
          //alert(that);
          that.goToFrame(i); 
        }, this);
      }, this);
    }
    
    // wywolujemy obiekt Tween
    this.myFx = new Fx.Tween(this.FrameContainer, {
      property: 'margin-left',
      duration: this.options.duration,
      transition: this.options.transition,
      link: 'ignore',
      onStart: (function(){this.status=1;}).bind(this),
      onComplete: (function(){this.status=0;}).bind(this)
    });
  
    // przypisujemy buttonom zdarzenia
    this.slidePrev.addEvent('click', this.showPrev.bind(this));
    this.slideNext.addEvent('click', this.showNext.bind(this));
    
    $$(this.options.menu)[0].addClass('active');
    
    // wywolujemy funkcje korygujaca rozmiar slidera przy zmianie rozmiaru okna przegladarki
    window.onresize = this.updateFrameContainer.bind(this); 
  },
  
  // ustawia rozmiar kazdego slajdu, taki jak rozmiar okna
  setFrameSize: function() {
    var winSize = window.getSize();
    $$(this.options.frames).each(function(i) {
      this.setOverflow(i);
      i.setStyles({width: winSize.x, height: winSize.y});
    }, this);
    
    return winSize.x;
  },
  
  showPrev: function(e) {
    if (Math.abs(this.getCurrPos().toInt()) == 0) {
      this.options.startFrame = 0;
      return;
    } else {
      if (this.status == 0) {
        this.myFx.start(this.getCurrPos(), (parseInt(this.getCurrPos()) + parseInt(this.setFrameSize())) ); // startujemy efekt przejscia do poprzedniego slajdu
        this.options.startFrame = this.options.startFrame - 1; // ustawiamy znacznik      
      } else return;
    }    
  },
  
  showNext: function(e) {
    if ((this.FrameContainer.getStyle('width').toInt() - this.setFrameSize()) <= Math.abs(this.getCurrPos().toInt())) {
      this.options.startFrame = 4;
      return;
    } else {
      if (this.status == 0) {
        this.options.startFrame = this.options.startFrame + 1; // ustawiamy znacznik
        this.myFx.start(this.getCurrPos(), (parseInt(this.getCurrPos()) - parseInt(this.setFrameSize()))); // startujemy efekt przejscia do nastepnego slajdu
      } else return;
    }     
  },
  
  getCurrPos: function() {
    return (this.FrameContainer.getStyle('margin-left'));
  },
  
  // przeskocz do okreslonego frame'a
  jumpToFrame: function(p) {
   this.setFrameSize();
   this.FrameContainer.setStyle('margin-left', -(p*this.setFrameSize()));
  },
  
  goToFrame: function(i) {
    if (this.status == 1) {
      return;
    } else {
      if (i < this.options.startFrame) {
        var x = this.options.startFrame - i;
        this.myFx.start(this.getCurrPos(), (parseInt(this.getCurrPos()) + (x*parseInt(this.setFrameSize()))) );
        this.options.startFrame = i;  
      } else if (this.options.startFrame < i) {
        var x = i - this.options.startFrame; 
        this.myFx.start(this.getCurrPos(), (parseInt(this.getCurrPos()) - (x*parseInt(this.setFrameSize()))) );
        this.options.startFrame = i;
      } else return;    
    }
  },

  
  setOverflow: function(elem) {
    if (window.getSize()['y'] < elem.getSize()['y']) elem.setStyle('overflow-y', 'scroll');    
  },
  
  // update rozmiarow slidera po zmianie rozmiarow okna przegladarki
  updateFrameContainer: function() {
    this.jumpToFrame(this.options.startFrame);
    $$(this.options.frames).each(function(i) {
      this.setOverflow(i);            
    }, this);
    this.FrameContainer.setStyles({width: ($$(this.options.frames).length * this.setFrameSize())});
  } 
});