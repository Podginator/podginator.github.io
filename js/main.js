function getEffect(x,y,size){
	var opacity = size > 1 ? 1 : 0;
	return $.browser.mozilla ? 	{"opacity": opacity} : {"-webkit-clip-path": "circle("+size+"px at "+x+"px "+y+"px)"} 
}

function toggleContainers(div)
{
	$.each($(div), function(i){
		var div = this;
		setTimeout(function(){
			$(div).animate({opacity:1})
		}, (i+1)*100);
	});	
}

function DoClip(div, x, y, size){
	$(div).css(getEffect(x,y,0));
	setTimeout(function(){
		$(div).css(getEffect(x,y,size));
	}, 20);
}

function HideAll(div){
	$(div).each(function(){
		console.log(this)
		$(this).hide();
	});
}

function OnScreen(div){
	var windowTop = $(window).scrollTop();
	var windowBottom = $(window).height() + windowTop;

	var divTop = $(div+":first").offset().top;
	var divBottom = $(div).height() + divTop

	console.log(divTop<=windowBottom, divTop, windowBottom)
	return ((divTop<= windowBottom));
}

function ScrollCheck() {
		    if(OnScreen('.worktile') && $('.worktile').css('opacity') == 0){
		    	toggleContainers('.worktile')
		    }
		}

$( document ).ready(function() {
		$('#Welcome').Banner();

		$('.imgcontainer').click(function(e){
			var selector = $(this).index() > 0 ? '.imgcontainer.img'+$(this).index() : '.imgcontainer.img3';
			var currentDiv = $(this)
			$(this).removeClass('index')
			$(selector).removeClass("hide").addClass('index')
			DoClip(selector, e.offsetX, e.offsetY,550);

			setTimeout(function(){
				currentDiv.addClass('hide');
			},1000);

			return false
		});

		$('.selector li').click(function(e){
			var header = $(this).text()

			HideAll('.selector li .overlay');
			$(this).find('.overlay').show();
			DoClip($(this).find('.overlay'), e.offsetX, e.offsetY, 200);
			$('.abouttext .identifier h2').text(header.toUpperCase());
			HideAll('.content p');
			$('.content .'+header).show();
		});

		var didScroll = false;

		$(window).scroll(function(){
			ScrollCheck();

			if($(window).scrollTop() > 0){
				$('nav').css({
					boxShadow: "2px 2px 5px 1px rgba(0, 0, 0, 0.25)"
				})
			} else {
				$('nav').css({
					boxShadow: "none"
				})
			}
		}) 

		$('nav a').click(function(){
			$('html, body').stop().animate({scrollTop:$("#"+$(this).attr('href')).offset().top -40},2000);
			return false;
		});
});