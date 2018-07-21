// JavaScript Document
var creativeListSlider = (function($){
	var $creativeBgList,
		$creativeBgList_li,
		$creativeCirList,
		$creativeCirList_li,
		$creativeDir;
	var maxLength, count=0, next=0, timer;
	
	var _init = function(){
		$creativeBgList = $(".creativeBgList"),
		$creativeBgList_li = $creativeBgList.find("li"),
		$creativeCirList = $(".creativeCirList"),
		$creativeCirList_li = $creativeCirList.find("li"),
		$creativeDir = $(".creativeDir");
		maxLength = $creativeBgList_li.size();
		
		winSize();
		TweenMax.set($creativeBgList_li.eq(0), {"z-index":3});
		TweenMax.set($creativeCirList_li.eq(0), {"z-index":3});
		dirShowCount();
		
		autoPlay();
		

		$creativeDir.find("a").click(function(e){
			e.preventDefault();
			if($(this).parent().hasClass("creative_prev")){
				calCount("prev");
				moveSlider("prev");
			}else{
				calCount("next");
				moveSlider("next");
			}
		});
	};
	
	function winSize(){
		$(window).on("load resize", function(){
			var wWidth = $(window).innerWidth(),		// 세로 스크롤 너비 빼기
				wHeight = $(window).height(),
				imgWidth = wWidth * 1.1,
				imgHeight = imgWidth * 0.5,
				marginLeft = -(imgWidth / 2),
				marginTop = -((wHeight / 2) - ($creativeCirList_li.parent().height() / 2));

			if(imgHeight < wHeight){imgHeight = wHeight;}

			$creativeBgList.css({"width":wWidth, "height":wHeight});
			$creativeBgList_li.css({"width":wWidth, "height":wHeight});
			$creativeBgList_li.children("img").css({"width":imgWidth, "height":imgHeight, "margin-left":marginLeft+"px"});
			$creativeCirList_li.children("img").css({"width":imgWidth, "height":imgHeight, "margin":marginTop+"px 0 0 "+marginLeft+"px"});
		});
	}
	
	function moveSlider(dir){
		TweenMax.set($creativeBgList_li.eq(next), {"z-index":2});
		TweenMax.set($creativeCirList_li.eq(next), {"z-index":2});
		TweenMax.to($creativeBgList_li.eq(count), 0.3, {opacity:0, ease:"Linear"});
		TweenMax.to($creativeCirList_li.eq(count), 0.3, {opacity:0, ease:"Linear"});
		if(dir === "prev"){
			TweenMax.to($creativeBgList_li.eq(count).find("img"), 0.3, {left:"55%", ease:"Linear"});
			TweenMax.to($creativeCirList_li.eq(count).find("img"), 0.3, {left:"45%", ease:"Linear", onComplete:switchZIndex});
			TweenMax.set($creativeBgList_li.eq(next), {"opacity":1, "z-index":3});
			TweenMax.set($creativeCirList_li.eq(next), {"opacity":1, "z-index":3});
			TweenMax.set($creativeBgList_li.eq(next).find("img"), {"left":"45%"});
			TweenMax.set($creativeCirList_li.eq(next).find("img"), {"left":"55%"});
		}else{
			TweenMax.to($creativeBgList_li.eq(count).find("img"), 0.3, {left:"45%", ease:"Linear"});
			TweenMax.to($creativeCirList_li.eq(count).find("img"), 0.3, {left:"55%", ease:"Linear", onComplete:switchZIndex});
			TweenMax.set($creativeBgList_li.eq(next), {"opacity":1});
			TweenMax.set($creativeCirList_li.eq(next), {"opacity":1});
			TweenMax.set($creativeBgList_li.eq(next).find("img"), {"left":"55%"});
			TweenMax.set($creativeCirList_li.eq(next).find("img"), {"left":"45%"});
		}
		TweenMax.to($creativeBgList_li.eq(next).find("img"), 0.3, {left:"50%", ease:"Linear"});
		TweenMax.to($creativeCirList_li.eq(next).find("img"), 0.3, {left:"50%", ease:"Linear", onComplete:completeMove});
		
	}
	
	function calCount(dir){
		if(dir==="prev"){
			if(count === 0){ 
				next = maxLength - 1;
			}else{
				next = count - 1;
			}
		}else{
			if(count === maxLength-1){
				next = 0;
			}else{
				next = count+1;
			}
		}
	}
	
	function switchZIndex(){
		TweenMax.set($creativeBgList_li.eq(count), {"opacity":1, "z-index":1});
		TweenMax.set($creativeCirList_li.eq(count), {"opacity":1, "z-index":1});
	}
	function completeMove(){
		count = next;
		dirShowCount();
		TweenMax.set($creativeBgList_li.eq(count), {"z-index":3});
		TweenMax.set($creativeCirList_li.eq(count), {"z-index":3});
		clearTimeout(timer);
		autoPlay();
	}
	
	function dirShowCount(){
		var $prev = $creativeDir.find(".creative_prev").children("span"),
			$next = $creativeDir.find(".creative_next").children("span");
		var sPrev, sNext; 
			
		if(count === 0){
			sPrev = maxLength-1;
			sNext = count + 1;
		}else if(count === maxLength-1){
			sPrev = count - 1;
			sNext = 0;
		}else{
			sPrev = count-1;
			sNext = count+1;
		}
		sPrev = lengthCheck(String(sPrev+1));
		sNext = lengthCheck(String(sNext+1));
		
		/*if(sPrev.length === 1 && sNext.length === 1){
			sPrev = "0"+sPrev;
			sNext = "0"+sNext;
		}else if(sPrev.length === 1 && sNext.length > 1){
			sPrev = "0"+sPrev;
			sNext = sNext;
		}else if(sPrev.length > 1 && sNext.length === 1){
			sPrev = sPrev;
			sNext = "0"+sNext;
		}else{
			sPrev = sPrev;
			sNext = sNext;
		}*/
		
		$prev.html(sPrev);
		$next.html(sNext);
	}
	
	function lengthCheck(str){
		if(str.length === 1){
			str = "0"+str;
		}
		
		return str;
	}
	
	function autoPlay(){
		timer = setTimeout(function(){
			$creativeDir.find(".creative_next").find("a").trigger("click");
		}, 3000);
	}
	
	return {
		init:_init
	}

})(jQuery);

$(function(){
	creativeListSlider.init();
});