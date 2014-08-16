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
		$(this).hide();
	});
}

function RoundToTen(num){
	return Math.round(num/10)*10;
}

function GetMode(data){
	var modeMap = {};
	var maxEl,
	maxCount = 1,
	i = 1;
	while (data[i++] != null){
		var colour = data[i];
		if (modeMap[colour]!=null)
		{
			modeMap[colour] += 1
		}else{
			modeMap[colour] = 1
		}

		if(modeMap[colour] > maxCount && colour != 0){
			maxCount = colour
		}
	}

	console.log(maxCount)
	return maxCount;
}

function GetAverage(data){
	var i = 1,
	count = 0,
	total = 0
	while(data[i++] != null){
		if(data[i] != 0 && data[i] != undefined){
			total += data[i]
			++count
		}
	}
	return Math.floor(total/count);

}

function stringToHex(s){
	var hex = s.toString(16);
	return hex.length == 1? "0" + hex : hex;
}

function RGBToHex(r,g,b){
	return "#" + stringToHex(r) + stringToHex(g) + stringToHex(b)
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
			console.log(this)
			var overlay = $(this).parent().find(".overlay")
			overlay.css({background: GetDominantColour(this), zIndex:200})
			DoClip(overlay, this.height/2, this.width/2, 600);
		});
});