/*
  SiteSlide - MooTools plugin for sliding sites left/right !
  Author: Rafal Ronowicz
  License: GNU Public License
  Checkout: http://github.com/rron/siteSlider  
*/
var siteSlider=new Class({Implements:[Options,Events],options:{frames:".frame",startFrame:0,navs:["ContSlidePrev","ContSlideNext"],menu:".link",transition:Fx.Transitions.Linear,duration:300,menuNav:false,menuNavName:""},initialize:function(a){this.setOptions(a);this.setFrameSize();this.Slider=(new Element("div",{id:"Slider",styles:{width:"100%",height:"100%",overflow:"hidden"}})).inject(document.body);this.FrameContainer=(new Element("div",{id:"FrameContainer",styles:{width:$$(this.options.frames).length*this.setFrameSize()}})).inject(this.Slider).adopt($$(this.options.frames));if(this.options.navs[0]=="ContSlidePrev"){this.slidePrev=(new Element("div",{id:"ContSlidePrev",styles:{position:"absolute",top:"0",left:"0",height:"100%",width:"50px","background-color":"lime"}})).inject(document.body);this.slideNext=(new Element("div",{id:"ContSlideNext",styles:{position:"absolute",top:"0",right:"0",height:"100%",width:"50px","background-color":"lime"}})).inject(document.body)}else{this.slidePrev=$(this.options.navs[0]);this.slideNext=$(this.options.navs[1])}this.status=0;if(this.options.menuNav){$(this.options.menuNavName).getElements("li").each(function(a,b){that=this;a.addEvent("click",function(){that.goToFrame(b)},this)},this)}this.myFx=new Fx.Tween(this.FrameContainer,{property:"margin-left",duration:this.options.duration,transition:this.options.transition,link:"ignore",onStart:function(){this.status=1}.bind(this),onComplete:function(){this.status=0}.bind(this)});this.slidePrev.addEvent("click",this.showPrev.bind(this));this.slideNext.addEvent("click",this.showNext.bind(this));$$(this.options.menu)[0].addClass("active");window.onresize=this.updateFrameContainer.bind(this)},setFrameSize:function(){var a=window.getSize();$$(this.options.frames).each(function(b){this.setOverflow(b);b.setStyles({width:a.x,height:a.y})},this);return a.x},showPrev:function(a){if(Math.abs(this.getCurrPos().toInt())==0){this.options.startFrame=0;return}else{if(this.status==0){this.myFx.start(this.getCurrPos(),parseInt(this.getCurrPos())+parseInt(this.setFrameSize()));this.options.startFrame=this.options.startFrame-1}else return}},showNext:function(a){if(this.FrameContainer.getStyle("width").toInt()-this.setFrameSize()<=Math.abs(this.getCurrPos().toInt())){this.options.startFrame=4;return}else{if(this.status==0){this.options.startFrame=this.options.startFrame+1;this.myFx.start(this.getCurrPos(),parseInt(this.getCurrPos())-parseInt(this.setFrameSize()))}else return}},getCurrPos:function(){return this.FrameContainer.getStyle("margin-left")},jumpToFrame:function(a){this.setFrameSize();this.FrameContainer.setStyle("margin-left",-(a*this.setFrameSize()))},goToFrame:function(a){if(this.status==1){return}else{if(a<this.options.startFrame){var b=this.options.startFrame-a;this.myFx.start(this.getCurrPos(),parseInt(this.getCurrPos())+b*parseInt(this.setFrameSize()));this.options.startFrame=a}else if(this.options.startFrame<a){var b=a-this.options.startFrame;this.myFx.start(this.getCurrPos(),parseInt(this.getCurrPos())-b*parseInt(this.setFrameSize()));this.options.startFrame=a}else return}},setOverflow:function(a){if(window.getSize()["y"]<a.getSize()["y"])a.setStyle("overflow-y","scroll")},updateFrameContainer:function(){this.jumpToFrame(this.options.startFrame);$$(this.options.frames).each(function(a){this.setOverflow(a)},this);this.FrameContainer.setStyles({width:$$(this.options.frames).length*this.setFrameSize()})}})