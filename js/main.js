function DoClip(div, x, y,size){
	var circle = "circle(1px at "+x+"px "+y+"px)"
	console.log(circle)
	$(div).css({
		"-webkit-clip-path": circle,
		"clip-path": circle
	});

	setTimeout(function(){
		circle =  "circle("+size+"px at "+x+"px "+y+"px)" 
		$(div).css({
			"-webkit-clip-path": circle,
			"clip-path": circle
		});
	}, 10);
}

function HideAll(div){
	$(div).each(function(){
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
			var header = $(this).text().replace(/\s/g, '');;
			$('.abouttext .identifier h2').text(header.toUpperCase());

			HideAll('.content p');
			$('.content .'+header).show();
		});

});