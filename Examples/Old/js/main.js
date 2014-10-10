	//#Load Functions
var a = 10;
function PolaroidScroll(classEffected)
{
	var ab = --a ;
	var htmbod = $('html,body').offset().top;
	if(htmbod <= -500)
	{
		$(classEffected).parent('div').animate({left: '-285'}, 200, 'easeInOutQuad', function()
		{
			$(this).css('z-index', ab);
			$(this).animate({left: '15px'},200, 'easeInOutQuad');
		});
	}
	else
	{
		$(classEffected).parent('div').css('z-index', ab);
	}
}

//Logic for expanding out certain divs to a certain height, should make height also variable and animate optional
/* 
	div = $(this)
	hide = class to hide others
	message = message to show
	areaHeight = expand out to
	scrollup = boolean, scrollup or down
*/
function ExpandOut(div, hide, message, messagediv,  areaHeight, scrollup)
{
	hide = hide == 'undefined' ? '.noneofthesebutthisisfiller' : hide
	if($(div).hasClass('noclick'))
	{
		return false;
	};
	$(div).animate({height: areaHeight});
	$(hide).hide();
	$(div).show();
	$(div).addClass('noclick');
	$(div).find(message).text(messagediv);
	if(scrollup)
	{
		$('html, body').animate({scrollTop:$(div).offset().top -66},300,'easeInExpo');	
	}
}

//Sets divs to fade in one by one
var counter = 0
function PortfolioFading(effectedsize, diveffected)
{
	if(counter === $(effectedsize).size())
	{
		return;
	} 
	else
	{
		console.log(counter);
		$(diveffected).children().eq(counter).animate({opacity:1});
		counter++;
		setTimeout(function()
		{
			PortfolioFading(effectedsize, diveffected);
		} , 350);
	}
};

//Sets variables for Scrollorama, based on window width. Bulky
function Scrollorama()
{
	var scrollorama = $.scrollorama({
		blocks:'.scrollblock'
	});
	//Defines variables for different widths.
	if($(window).width()>500){			
		var  height = $(window).height();
		var duration = $('#AboutMe').offset().top;
		var scroll = height/2.3;
		var scroll1=scroll+10;
		var scroll2=scroll+20;
		var scroll3=scroll+30;
		var end1=15;
		var offset = -2600;
		var end2=end1;
		var end3=end1;
		var end4=end1;
		var delay1=50;
		var delay2=50;
		var delay3=50;
		var delay4=50;
		var speechbubble=400;
		var rotate1=5;
		var rotate2=3;
		var rotate3=-1;
		var rotate4=-2;
	}else{
		var  height = $(window).height();
		var duration = $('#AboutMe').offset().top;
		var offset = -800;
		var scroll = height/8;
		var scroll1=scroll+30;
		var scroll2=scroll+50;
		var scroll3=scroll+50;
		var end1=0;
		var end2=75;
		var end3=155;
		var end4=235;
		var delay1=50;
		var delay2=80;
		var delay3=110;
		var delay4=140;
		var rotate1=0;
		var rotate2=0;
		var rotate3=0;
		var rotate4=0;
		var speechbubble=scroll3+130;
	};
	
	scrollorama.animate('#howdy',{ duration: 1200,  property:'margin-top', start:150,end: 750 });
	scrollorama.animate('#myimage',{ duration: scroll,  property:'left', start:offset,end: end1 });
	scrollorama.animate('#myimage2',{ duration: scroll1, delay:50,  property:'left', start:offset,end: end2});
	scrollorama.animate('#myimage3',{ duration: scroll2, delay:100,  property:'left', start:offset,end: end3 });
	scrollorama.animate('#myimage4',{ duration: scroll3, delay:150, property:'left', start:offset,end: end4 });
	scrollorama.animate('#myimage',{duration:scroll, delay:delay1, property:'rotate', start:-50,end: rotate1 });
	scrollorama.animate('#myimage2',{duration:scroll1, delay:delay2, property:'rotate', start:-50,end: rotate2});
	scrollorama.animate('#myimage3',{duration:scroll2, delay:delay3, property:'rotate', start:-50,end: rotate3 });
	scrollorama.animate('#myimage4',{duration:scroll3, delay:delay4, property:'rotate', start:-50,end: rotate4 });
	scrollorama.animate('#speechbubble',{ delay: speechbubble, duration: 200, property:'opacity', start:0 });
	scrollorama.animate('#Click',{ delay: 600, duration: 200, property:'opacity', start:0 });
}

function getDisplacement(area, sizeofdispace)
{
	if($(window).width()>500)
	{	
		$(area).css('height',0)
		for(i=1, len=$(sizeofdispace).size();  i<=len; i++)
		{
			$(area).css('height',parseInt($(area).css('height'))+251)
		}
		return parseInt($(area).css('height'));
	}
}
//#endFunctions
	

$(document).ready(function() {
		var names;
		var workheight = $(window).width()>500 ? 250 : 100;
		//Does the displacement for work, and also returns an integer for use later. Actually could consolidate.
		var displace = getDisplacement('#Work', '.scrollblock > .imgcontainer')
		$('#ContactMe').css('top', 1245+displace)
		
		Scrollorama();
		$(this).find('.myimage').find('img').click(function()
		{
			PolaroidScroll(this);
		});
		
		$('#nav a').click(function(){
			$('html, body').stop().animate({scrollTop:$($(this).attr('name')).offset().top -75},2000,'easeInExpo');
		});
		
		$('#nav img').hover(
			function(){
				$('.logocol').stop(true,false).animate({opacity: 1})
			}, 
			function(){
				$('.logocol').stop(true,false).animate({opacity: 0})
		});
		
		
		$('.imgcontainer').hover(function()
		{
			names = $(this).attr('name');
			$(this).find('.color').animate({opacity: 0});
			$(this).find('.wat p').text("Click for more");
		}, 
		function()
		{
			$(this).find('.color').animate({opacity: 1});
			$(this).find('.wat p').text(names);
		});
		
		
		$('.imgcontainer').click(function(){
			ExpandOut(this, '.imgcontainer', '.wat p', 'Close', 750, true);
		});
		
		$('.wat').click(function()
		{
			if($(this).parent('.imgcontainer').hasClass('noclick'))
			{
				$('.imgcontainer').show();
				$('.imgcontainer').animate({height:workheight}, function()
				{
					$('.imgcontainer').removeClass('noclick');
				});
				$(this).parent('.imgcontainer').find('.wat p').text(names);
			}
		});
	
	var ran = 0
	//Logic to get Portfolio Fading to work, If it's close to Work and it hasn't ran and the window width is above 500.
	$(window).scroll(function()
	{
		var htmloffset = $('html, body').offset().top
		
		if(-htmloffset > $('#Work').offset().top-500 & ran!=1 & $(window).width()>500)
		{
			PortfolioFading('#Work > .imgcontainer', "#Work")
			ran = 1
		}
	});
	//scrolls around the img based on mouse movement
	if($(window).width()<1900 & $(window).width()>500){
		$('.color').mousemove(function(e)
		{
			var picwidth=1920;
			var windowwidth = $(window).width();
			// Calculates where the mouse is based on the window width from 0-1
			var mouseposition = (e.pageX-this.offsetLeft)/windowwidth; 
			// Calculates how much is remaining of the image
			var remaining = Math.floor((picwidth-windowwidth)*mouseposition);
			$(this).parent().children('.bw').css('left', -remaining) 
		}).mouseout(function()
		{
			$(this).parent().children('.bw').css('left', 0); initialleft=0
		});
	}	
});