// var wuzei = Backbone.View.extend({

// 	events: {
// 		/*"click  #twoPart": "twoPart",
// 		"click  #threePart": "threePart",*/
// 	},

// 	initialize: function() {
// 		_.bindAll(this, 'render','twoPartAutoInfo');
// 	},

// 	render: function() {
// 		$('#header').after(Templates.wuzei);
// 		var self = this;
// 		this.twoPartAutoInfo();
// 		/*this.twoPartAutoInfoLoad();*/
// 	    $(document).ready(function($){
// 	        $('.wuzei-content').bind('inview',function(event,visible,visiblePartX,visiblePartY){
// 	            if(visible){
// 	                if(visiblePartY=='bottom'||visiblePartY=='both'){
// 	                    if(!$(this).hasClass('section-mask')){
// 	                        $(this).addClass('inview');
// 	                    }
// 	                }
// 	            }
// 	        });
// 	    });
// 	},
// 	twoPartAutoInfo: function() {
// 		var $container=$('.wuzei-content-two-box'),
// 		$elements=$('.wuzei-content-two-box-ul').children('li'),
// 		maxWidthOnMobile=parseInt($('body').data('screen-md')),
// 		currentIndex=0,
// 		lastMode='',
// 		sliderDuration=5000,
// 		sliderInterval='';
// 		if(!maxWidthOnMobile){
// 			maxWidthOnMobile=768;
// 		};
// 		initialize=function(){
// 			if(!$('.wuzei-content-two-box-info-blockquote').length){
// 				var $testimonial=$('<blockquote  class="wuzei-content-two-box-info-blockquote"></blockquote >').appendTo($container);
// 				var $image=$elements.filter('.active').find('img'),
// 				testimonialText="<h3>"+$image.attr('title')+"<h3>"+"<p>"+$image.attr('alt')+"</p>";
// 				$testimonial.html(testimonialText);
// 			}
// 		};
// 		activate=function($elem){
// 			if($elem.hasClass('active'))return;
// 			$elements.removeClass('active');
// 			$elem.addClass('active');
// 			var $image=$elem.find('img'),
// 			testimonialText="<h3>"+$image.attr('title')+"<h3>"+"<p>"+$image.attr('alt')+"</p>";
// 			$('.wuzei-content-two-box-info-blockquote').fadeOut(300,function(){
// 				$(this).html(testimonialText).fadeIn(300)
// 			});
// 		};
// 		hoverEvent=function(e){
// 			activate($(this));
// 		};
// 		initialize();
// 		twoPartAutoInfoLoad = function (){
// 			var currentMode=($(window).width()<=maxWidthOnMobile)?'small_screen':'large_screen';
// 			if(currentMode!=lastMode){
// 				if(currentMode=='small_screen'){
// 					$elements.off('mouseenter mouseout',hoverEvent);
// 					sliderInterval=setInterval(function(){
// 						currentIndex=(currentIndex==$elements.length-1)?0:++currentIndex;
// 						activate($($elements[currentIndex]));
// 					},
// 					sliderDuration);
// 				}
// 				else{
// 					clearInterval(sliderInterval);
// 					$elements.on('mouseenter mouseout',hoverEvent);
// 				}
// 				lastMode=currentMode;
// 			}
// 		}

// 		/*twoPartAutoInfoLoad();*/
// 		twoPartAutoInfoLoad();
// 		$(window).on("load resize",twoPartAutoInfoLoad());
// 		/*return twoPartAutoInfoLoad;*/
// 	}

// });