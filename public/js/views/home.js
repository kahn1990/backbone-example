var home = Backbone.View.extend({

	events: {
		"click  #screenLeftA": "screenLeftA",
		"click  #screenRightA": "screenRightA",
		"click  #btnHome": "btnHome",
		/*"click  #btnWuzei": "btnWuzei",*/
		/*"click  #btnMore": "btnMore",*/
		"click  #SearchInfoClickA": "formSearchInfo",
		"submit #formSearchInfo":  "formSearchInfo"
	},

	initialize: function() {
		_.bindAll(this, 'render','appContent','widthAuto','dangerInfo','safeInfo','remove','formSearchInfo');

	},


	render: function() {
		$('#header').html(Templates.header);
		$('#footer').html(Templates.footer);
		var self = this;
	},


	appContent: function(e) {
		$('#header').after(Templates.home);
		/*$('.content').css({'margin-top':'100px'});*/
		$('.content').animate({'margin-top':'90px'},'slow');
		/*$(this.el).html(el);*/
		/*return el;*/
	},
	remove: function (childrenNode) {
		$('body').children(childrenNode).remove();
	},


	appContentDanger: function(e) {
		$('.content').after(Templates.danger);
		$('.loading').remove();
		$('.content-search-a').text('GO >');
		var t;
		var wid = 0;
		function move() {
			var contentBox= $('.content-box-info-screen');
			wid += 1;
			contentBox.css({'height':wid,'overflow': 'hidden'});
			t = setTimeout(move, 5);
			//console.log(wid)
			if(wid >= 180){
				clearTimeout(t);
				$('.content-search-input').attr('disabled',false);
				$('.content-search-a').attr('id','SearchInfoClickA');
			}
		}
		move()
		var self = this;
		/*$(window).resize(function() {
			self.widthAuto();
		});*/
		$(window).width(function(e){
			self.widthAuto();
		}).on('resize',function(){
			self.widthAuto();
		});
		/*this.widthAuto();*/

	},
	screenLeftA: function(e) {
		e.preventDefault();
		app.router.navigate("", true);
	},
	screenRightA: function(e) {
		e.preventDefault();
		app.router.navigate("", true);
	},
	widthAuto: function() {/*alert('this is /js/app.js?widthAuto');*/
		var UlLiNumber = $("#timeLineUl li").length;//计算时间线上li个数
		var indexCache = 0;//缓存计数器
		var windowWidth = $(window).width();//当前浏览器窗口宽度
		var timeLineWidth = $('#timeLine').width();//当前时间线宽度
		var indexCacheEven = 0;//缓存当为偶数的时候增加的左外边距

		var nowWidth = 640*windowWidth/1302;//当前浏览器时间线溢出隐藏盒子宽度
		if(windowWidth<=500){
			nowWidth = nowWidth+100;
		}
		var screenLeftWidth = 280*windowWidth/1302;//当前浏览器时间线溢出隐藏盒子宽度
		var screenLeftLeft = 292*windowWidth/1302;//当前浏览器时间线渐进透明度右侧画幕，固定定位的右边距离
		var screenLeftRight = 707*windowWidth/1302;//当前浏览器时间线渐进透明度左侧画幕，固定定位的右边距离
		var promptUlWidth = nowWidth*UlLiNumber;//当前时间线下面信息栏的ul总宽度
		var timeLineLiWidth = 128*windowWidth/1302;//当前时间线的li宽度
		if(windowWidth<=500){
			var timeLineLiWidth = nowWidth/5;//当前时间线的li宽度
		}
		var timelineLineLiCache = 0;//缓存时间线的左外边距距离
		var promptUlLihCache = 0;//缓存时间线下面的信息栏的左外边距距离
		if( UlLiNumber%2==0 ){
			indexCache = UlLiNumber/2;//偶数
			indexCacheEven = 1;
			timelineLineLiCache =  -timeLineLiWidth*UlLiNumber/2+indexCacheEven*timeLineLiWidth+timeLineLiWidth*2;
			promptUlLihCache = -nowWidth*UlLiNumber/2+indexCacheEven*nowWidth;
			/*$('#timeLineUl').css({'marginLeft':timelineLineLiCache});*/
		}else{
			indexCache = (UlLiNumber+1)/2;//奇数
			timelineLineLiCache =  -timeLineLiWidth*(UlLiNumber-1)/2+timeLineLiWidth*2;
			promptUlLihCache = -nowWidth*(UlLiNumber-1)/2;
		};

		$('.content-box-info-screen-box-timeline-line-li').css({'width':timeLineLiWidth})//动态设置时间线内部li宽度
		$('#timeLineHiddle').css({'width':nowWidth});
		$('#timeLine').css({'width':nowWidth});
		$('#timeLineColor').css({'width':nowWidth});
		$('#timeLineUl').css({'width':(timeLineLiWidth*UlLiNumber+1)});
		$('#promptBox').css({'width':nowWidth});//当前时间线下面信息栏盒子的宽度
		$('#promptUlWidth').css({'width':(promptUlWidth+1)});
		$('.content-box-info-screen-box-prompt-ul-li').css({'width':nowWidth});
		$('#screenRight').css({'width':screenLeftWidth,'right':screenLeftLeft,'background-size':screenLeftWidth});
		$('#screenLeft').css({'width':screenLeftWidth,'right':screenLeftRight,'background-size':screenLeftWidth});
		$('#screenRightA').css({'right':(screenLeftLeft-25)});
		$('#screenLeftA').css({'right':(screenLeftRight+screenLeftWidth+25)});
		$('#timeLineUl').css({'margin-left':timelineLineLiCache});
		$('#promptUlWidth').css({'margin-left':promptUlLihCache});
		if(windowWidth<=500){
			$('#screenRightA').css({'right':'5px'});
			$('#screenLeftA').css({'left':'5px'});
		}
		if(UlLiNumber==2){
						$('#timeLineUl').find('li').css({'opacity':'0.1'});
						$('#timeLineUl').find('li:eq('+(indexCache)+')').css({'opacity':'0.7'});
						$('#timeLineUl').find('li:eq('+(indexCache-1)+')').css({'opacity':'1'});
		}else if(UlLiNumber==3){
						$('#timeLineUl').find('li').css({'opacity':'0.1'});
						$('#timeLineUl').find('li:eq('+(indexCache-2)+')').css({'opacity':'0.7'});
						$('#timeLineUl').find('li:eq('+(indexCache-1)+')').css({'opacity':'1'});
						$('#timeLineUl').find('li:eq('+(indexCache-3)+')').css({'opacity':'0.3'});
						$('#timeLineUl').find('li:eq('+(indexCache)+')').css({'opacity':'0.7'});
						$('#timeLineUl').find('li:eq('+(indexCache+1)+')').css({'opacity':'0.3'});
		}else if(UlLiNumber>2){
						$('#timeLineUl').find('li').css({'opacity':'0.1'});
						$('#timeLineUl').find('li:eq('+(indexCache-2)+')').css({'opacity':'0.7'});
						$('#timeLineUl').find('li:eq('+(indexCache)+')').css({'opacity':'0.7'});
						$('#timeLineUl').find('li:eq('+(indexCache-1)+')').css({'opacity':'1'});
						$('#timeLineUl').find('li:eq('+(indexCache-3)+')').css({'opacity':'0.3'});
						$('#timeLineUl').find('li:eq('+(indexCache+1)+')').css({'opacity':'0.3'});
		}

		$("#screenLeftA").bind({
			"click":function(){
				if( indexCache <=1 ) {
					return false;
				}


				indexCache -= 1;

				if(UlLiNumber==2){
								$('#timeLineUl').find('li').css({'opacity':'0.1'});
								$('#timeLineUl').find('li:eq('+(indexCache)+')').css({'opacity':'0.7'});
								$('#timeLineUl').find('li:eq('+(indexCache-1)+')').css({'opacity':'1'});
				}else if(UlLiNumber==3){
								$('#timeLineUl').find('li').css({'opacity':'0.1'});
								$('#timeLineUl').find('li:eq('+(indexCache-2)+')').css({'opacity':'0.7'});
								$('#timeLineUl').find('li:eq('+(indexCache-1)+')').css({'opacity':'1'});
								$('#timeLineUl').find('li:eq('+(indexCache-3)+')').css({'opacity':'0.3'});
								$('#timeLineUl').find('li:eq('+(indexCache)+')').css({'opacity':'0.7'});
								$('#timeLineUl').find('li:eq('+(indexCache+1)+')').css({'opacity':'0.3'});
				}else if(UlLiNumber>2){
								$('#timeLineUl').find('li').css({'opacity':'0.1'});
								$('#timeLineUl').find('li:eq('+(indexCache-2)+')').css({'opacity':'0.7'});
								$('#timeLineUl').find('li:eq('+(indexCache)+')').css({'opacity':'0.7'});
								$('#timeLineUl').find('li:eq('+(indexCache-1)+')').css({'opacity':'1'});
								$('#timeLineUl').find('li:eq('+(indexCache-3)+')').css({'opacity':'0.3'});
								$('#timeLineUl').find('li:eq('+(indexCache+1)+')').css({'opacity':'0.3'});
				}
				timelineLineLiCache += timeLineLiWidth;
				promptUlLihCache += nowWidth;
				$('#timeLineUl').animate({'marginLeft':timelineLineLiCache},{queue:false, duration:500});
				$('#promptUlWidth').animate({'marginLeft':promptUlLihCache},{queue:false, duration:500});
			}
		});
		$("#screenRightA").bind({
			"click":function(){
				if ( indexCache >= UlLiNumber ) {
					return false;
				}
				indexCache +=1;

				if(UlLiNumber==2){
								$('#timeLineUl').find('li').css({'opacity':'0.1'});
								$('#timeLineUl').find('li:eq('+(indexCache-2)+')').css({'opacity':'0.7'});
								$('#timeLineUl').find('li:eq('+(indexCache-1)+')').css({'opacity':'1'});
				}else if(UlLiNumber==3){
								$('#timeLineUl').find('li').css({'opacity':'0.1'});
								$('#timeLineUl').find('li:eq('+(indexCache-2)+')').css({'opacity':'0.7'});
								$('#timeLineUl').find('li:eq('+(indexCache-1)+')').css({'opacity':'1'});
								$('#timeLineUl').find('li:eq('+(indexCache-3)+')').css({'opacity':'0.3'});
								$('#timeLineUl').find('li:eq('+(indexCache)+')').css({'opacity':'0.7'});
								$('#timeLineUl').find('li:eq('+(indexCache+1)+')').css({'opacity':'0.3'});
				}else if(UlLiNumber>2){
								$('#timeLineUl').find('li').css({'opacity':'0.1'});
								$('#timeLineUl').find('li:eq('+(indexCache-2)+')').css({'opacity':'0.7'});
								$('#timeLineUl').find('li:eq('+(indexCache)+')').css({'opacity':'0.7'});
								$('#timeLineUl').find('li:eq('+(indexCache-1)+')').css({'opacity':'1'});
								$('#timeLineUl').find('li:eq('+(indexCache-3)+')').css({'opacity':'0.3'});
								$('#timeLineUl').find('li:eq('+(indexCache+1)+')').css({'opacity':'0.3'});
				}
				timelineLineLiCache -= timeLineLiWidth;
				promptUlLihCache -=nowWidth;
				$('#timeLineUl').animate({'marginLeft':timelineLineLiCache},{queue:false, duration:500});
				$('#promptUlWidth').animate({'marginLeft':promptUlLihCache},{queue:false, duration:500});
			}
		});
		/*var timeLineUlMarginLeft = $('#timeLineUl').css('margin-left');
		var timeLineUlMarginLeftNow = 0;
		var str = timeLineUlMarginLeft;
		var deleteString = 'px';
		var reg=new RegExp(deleteString+"([^"+deleteString+"]*?)$");
		timeLineUlMarginLeftStr = str.replace(reg,function(w){if(w.length>2){return w.substring(2);}else{return "";}});
		timeLineUlMarginLeftNow = timeLineUlMarginLeftStr*windowWidth/1302;//
		$('#timeLineUl').css({'margin-left':timeLineUlMarginLeftNow});*/
	},
	dangerInfo: function(dataObj) {
		var self = this;
		var timeLineLiShow = $("#timeLineUl");
		var promptLiShow = $("#promptUlWidth");
		timeLineLiShow.text("");// 清空数据
		promptLiShow.text("");
		dataObj.sort(function(a,b){
			if(a.leakTime<b.leakTime){
				return -1;
			}else if(a.leakTime>b.leakTime){
				return 1;
			}
			return 0;
		});
		for(var i=0; i<dataObj.length; i++){
			timeLineLiShow.append('<li class="content-box-info-screen-box-timeline-line-li"><a href="javascript:void(0)">'+dataObj[i].leakTime+'</a><div class="content-box-info-screen-box-timeline-line-light"></div></li>');
			promptLiShow.append('<li class="content-box-info-screen-box-prompt-ul-li"><p class="content-box-info-screen-box-prompt-title">'+dataObj[i].des+'</p><p class="content-box-info-screen-box-prompt-info">(本次泄露共有'+dataObj[i].counts+'条数据)</p></li>');
		}
		this.widthAuto();
	},
	safeInfo: function() {//console.log("this safeInfo")
		$('.content').after(Templates.safe);
		$('.loading').remove();
		$('.content-search-a').text('GO >');
		var t;
		var wid = 0;
		function move() {
			var contentBox= $('.content-box-info-screen');
			wid += 1;
			contentBox.css({'height':wid,'overflow': 'hidden'});
			//$('.content-bottom').css({'margin-top':'20px'});
			t = setTimeout(move, 5);
			/*console.log(wid)*/
			if(wid >= 180){
				clearTimeout(t);
				$('.content-search-input').attr('disabled',false);
				$('.content-search-a').attr('id','SearchInfoClickA');
			}
		}
		move()
	},
	btnHome: function(e) {
		var self = this;
		$('.content').css({'margin-top':'100px'});
		//$('.content').animate({'margin-top':'100px'},'slow');
		$('.header-text-right').children('p').removeClass('header-p-text-active');
		$('#btnHome').parent().addClass('header-p-text-active');
		var thisB = $('#header .header-p-text').children('b');
		var bValue = thisB.text();
		var bHref = thisB.attr("setHref");
		var bId = thisB.attr('setId');
		var thisBParent = thisB.parent();
		thisBParent.children('b').remove();
		thisBParent.append('<a class="header-p-text-a" id="'+bId+'" href="'+bHref+'">'+bValue+'</a>');

		var aValue = $('.header-p-text-active').children('a').text();
		var aHref = $('.header-p-text-active').children('a').attr("href");
		var aId = $('.header-p-text-active').children('a').attr('id');
		$('.header-p-text-active a').remove();
		$('.header-p-text-active').append('<b class="header-p-text-a" setId="'+aId+'" setHref="'+aHref+'">'+aValue+'</b>');
		this.remove('.more-content,.content-bottom,.content,.danger,.safe,.wuzei-content,#fp-nav');
		$('body').children('header').css({'display':'block'});
		$('body').children('footer').css({'display':'block'});
		for(var i=1;i<5;i++){
			$('body').removeClass('fp-viewing-page'+i)
		};
		$('body,html').attr('style','');
		$('body,html').removeAttr('style');
		e.preventDefault();
		app.router.navigate('/', true);
	},
	/*btnWuzei: function(e) {
		var self = this;
		$('body').children('header').css({'display':'none'});
		$('body').children('footer').css({'display':'none'});
		$('.header-text-right').children('p').removeClass('header-p-text-active');
		$('#btnWuzei').parent().addClass('header-p-text-active');
		var thisB = $('.header-p-text').children('b');
		var bValue = thisB.text();
		var bHref = thisB.attr("setHref");
		var bId = thisB.attr('setId');
		var thisBParent = thisB.parent();
		thisBParent.children('b').remove();
		thisBParent.append('<a class="header-p-text-a" id="'+bId+'" href="'+bHref+'">'+bValue+'</a>');

		var aValue = $('.header-p-text-active').children('a').text();
		var aHref = $('.header-p-text-active').children('a').attr("href");
		var aId = $('.header-p-text-active').children('a').attr('id');
		$('.header-p-text-active a').remove();

		$('.header-p-text-active').append('<b class="header-p-text-a" setId="'+aId+'" setHref="'+aHref+'">'+aValue+'</b>');
		this.remove('.content,.content-bottom,.safe,.danger,.more-content,#fp-nav');
		e.preventDefault();
		app.router.navigate('wuzei', true);
	},*/
	// btnMore: function(e) {
	// 	var self = this;
	// 	$('.header-text-right').children('p').removeClass('header-p-text-active');
	// 	$('#btnMore').parent().addClass('header-p-text-active');
	// 	var thisB = $('#header .header-p-text').children('b');
	// 	var bValue = thisB.text();
	// 	var bHref = thisB.attr("setHref");
	// 	var bId = thisB.attr('setId');
	// 	var thisBParent = thisB.parent();
	// 	thisBParent.children('b').remove();
	// 	thisBParent.append('<a class="header-p-text-a" id="'+bId+'" href="'+bHref+'">'+bValue+'</a>');

	// 	var aValue = $('.header-p-text-active').children('a').text();
	// 	var aHref = $('.header-p-text-active').children('a').attr("href");
	// 	var aId = $('.header-p-text-active').children('a').attr('id');
	// 	$('.header-p-text-active a').remove();
	// 	$('.header-p-text-active').append('<b class="header-p-text-a" setId="'+aId+'" setHref="'+aHref+'">'+aValue+'</b>');
	// 	this.remove('.content,.content-bottom,.danger,.safe,.wuzei-content,#fp-nav');
	// 	$('body').children('header').css({'display':'block'});
	// 	$('body').children('footer').css({'display':'block'});
	// 	$('body,html').attr('style','');
	// 	$('body,html').removeAttr('style');
	// 	e.preventDefault();
	// 	app.router.navigate('more', true);
	// },
	formSearchInfo: function(e) {
		var self= this;
		e.preventDefault();
		var searchInfo = $('#formSearchInfo input[name=searchInfo]').val();
		if(searchInfo){
			$('#SearchInfoClickA').html('<div class="loading spin"></div>');
			/*$('.content').css({'margin-top':'0'})*/
			$('.content').animate({'margin-top':'10px'},'slow');

			$('.content-search-input').attr('disabled',true);
			$('.content-search-a').removeAttr('id');
			$('.danger,.safe').remove();
			$.ajax({
				type: 'POST',
				url: '/json/searchInfo',
				dataType: 'json',
				data: { searchInfo: searchInfo,judgeDevice:0 },
				success: function(data) {
					if(data.length<=0){
						self.safeInfo();
					}else{
						self.appContentDanger();
						self.dangerInfo(data);
					};
				},
				error: function() {
					self.safeInfo();
				}
			});
		}
	}
});
