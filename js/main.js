function getEffect(x,y,size){
	var opacity = size > 1 ? 1 : 0;
	return $.browser.mozilla ? 	{"opacity": opacity} : {"-webkit-clip-path": "circle("+size+"px at "+x+"px "+y+"px)"} 
}

function DoClip(div, x, y, size){
	$(div).css(getEffect(x,y,0));
	setTimeout(function(){
		$(div).css(getEffect(x,y,size));
	}, 20);
}

function GetDominantColour(image){

	var canvas = document.createElement('canvas'),
		context = canvas.getContext('2d');

	var rgb = {r:{},g:{},b:{}}
	context.drawImage(image, 0,0,image.width, image.height)
	var img = context.getImageData(0,0,image.width,image.height)
	var i = count = 0;

 	while ( (i += 5 * 4) < img.data.length ) {
        count++
        rgb.r[count] = img.data[i]>50 ? RoundToTen(img.data[i]) : 0;
        rgb.g[count] = img.data[i]>50 ? RoundToTen(img.data[i+1]) : 0;
        rgb.b[count] = img.data[i]>50 ? RoundToTen(img.data[i+2]) : 0;
    }

    return RGBToHex(GetAverage(rgb.r), GetAverage(rgb.g), GetAverage(rgb.b));
}

function OnScreen(div){
	var windowTop = $(window).scrollTop();
	var windowBottom = $(window).height() + windowTop;

	var divTop = $(div+":first").offset().top;
	var divBottom = $(div).height() + divTop

	return (divTop<= windowBottom);
}

function ScrollCheck() {
    if(OnScreen('.worktile') && !$("#Work").hasClass("done")){
    	DoToAll($('.worktile'), function(div){
    		div.animate({opacity : 1}); 
    	}, 100);
    	$("#Work").addClass("done");
	}
}

$( document ).ready(function() {
		$('#Welcome').Banner();

		$('.worktile').css({height: $('.worktile').width()})

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

			DoToAll($('.selector li .overlay'), function(div){
				 $(div).hide();
			 });
			$(this).find('.overlay').show();
			DoClip($(this).find('.overlay'), e.offsetX, e.offsetY, 200);
			$($('.abouttext .identifier h2')).text(header.toUpperCase());
			DoToAll($('.content p'), function(div){ 
				div.hide();
			 });
			$('.content .'+header).show();
		});

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
			$('html, body').stop().animate({
				scrollTop:$("#"+$(this).attr('href')).offset().top -40
			},1000);
			return false;
		});

		$('.worktile img').click(function(){
			var img = $(this);
			var parent = $(this).parent();
			var overlay = parent.find(".overlay");
			var offset = RelativeDistance($('#Work .container'), parent);

			
			DoToAll($(".worktile").not($(this).parent()), function(div){
				div.css({opacity: 0})
			}, 100);
			
			overlay.css({background:GetDominantColour(this), zIndex:200});
			DoClip(overlay, this.height/2, this.width/2, 300);

			setTimeout(function(){
				//overlay.css();
				$('.worktile').not(parent).css({display:'none'});
				parent.find('img').hide();
				parent.css({left: offset})
			}, 800);

			setTimeout(function(){
				parent.css({width: "100%", left:0, height:"156px" })
				overlay.css({ "-webkit-clip-path": "none"})
			}, 850);

			setTimeout(function(){
				parent.find('.big').css({ zIndex:201, display:"block"});
				DoClip(parent.find('.big'), 0, 100, 2000);
			},1010)



			


			
		});
});