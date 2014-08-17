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

var prevLeft = 0;


//Comment this at some point, it's gonna suck to go back to.

$( document ).ready(function() {
		$('#Welcome').Banner();
		var workHeight =  $('.worktile').width()

		//Need a static height in order to css animate height (js too.)
		$('.worktile').css({height: workHeight})

		$( window ).resize(function() {
			workHeight = $('.worktile').width();
 			$('.worktile').css({height: workHeight});
		});

		$('.imgcontainer').click(function(e){
			//Cycle through the pictures of myself
			var selector = $(this).index() > 0 ? '.imgcontainer.img'+$(this).index() : '.imgcontainer.img3';
			var currentDiv = $(this)
			$(this).removeClass('index')
			$(selector).removeClass("hide").addClass('index')
			//Perform the circle clip, fading in on firefox (Unfortunately.)
			DoClip(selector, e.offsetX, e.offsetY,550);

			setTimeout(function(){
				//Then hide it when it's out of view.
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

		//Initial Scroll (Are all things in view?)
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

		//Auto Page SCrolling
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
			prevLeft = offset
			
			DoToAll($(".worktile").not($(this).parent()), function(div){
				div.css({opacity: 0})
			}, 100);
			
			overlay.css({background:GetDominantColour(this), zIndex:200});
			DoClip(overlay, this.height/2, this.width/2, 300);

			setTimeout(function(){
				$('.worktile').not(parent).css({display:'none'});
				parent.find('img').hide();
				parent.css({left: offset})
				setTimeout(function(){
					parent.css({width: "100%", left:0, height:"500" })
					overlay.css({ "-webkit-clip-path": "none", background:"white"})
					setTimeout(function(){
						overlay.find(".identifier").slideDown();
						setTimeout(function(){
							overlay.children().fadeIn();
						}, 500);
					}, 300);
				}, 50);
			}, 400);

			
		});

		$('.overlay span').click(function(){
			var parent = $(this).parent().parent().parent();
			var img = parent.find('img');2

			//console.log(parent.children())
			ApplyChildren(parent, function(div){div.removeAttr('style')})
			parent.css({width:"24.5%", left: prevLeft, height:workHeight})

			$(this).parent().parent().find('div').fadeOut(function(){
				$(this).parent().css({display:'none'})
				parent.find('img').css({display:'block', opacity:0})
				setTimeout(function(){
					parent.find('img').css({opacity:1})
					DoClip(parent.find('img'), img.height()/2, img.width()/2, 500);
					setTimeout(function(){
						ApplyChildren(parent, function(div){div.removeAttr('style')})
						$('.worktile').css({left:0})
						DoToAll($('.worktile'), function(div){
							div.removeAttr('style');
							div.css({height:workHeight})
							div.show();
							div.animate({opacity:1})
						},10)
					},500)
				}, 500);
				
			});
		})
});