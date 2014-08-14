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

function HideAll(div){
	$(div).each(function(){
		console.log(this)
		$(this).hide();
	});
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
			HideAll('.selector li .overlay');
			$(this).find('.overlay').show();

			DoClip($(this).find('.overlay'), e.offsetX, e.offsetY, 200);
			var header = $(this).text()
			$('.abouttext .identifier h2').text(header.toUpperCase());

			HideAll('.content p');
			$('.content .'+header).show();
		});

});