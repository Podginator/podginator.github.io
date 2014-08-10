function DoClip(div, x, y){
	var circle = "circle(1px at "+x+"px "+y+"px)"
	console.log(circle)
	$(div).css({
		"-webkit-clip-path": circle,
		"clip-path": circle
	});

	setTimeout(function(){
		circle =  "circle(550px at "+x+"px "+y+"px)" 
		$(div).css({
			"-webkit-clip-path": circle,
			"clip-path": circle
		});
	}, 10);

}

$( document ).ready(function() {
		$('#Welcome').Banner("Howdy!");
		var counter = 0

		$('.imgcontainer').click(function(e){
			if(!e.hasOwnProperty('offsetX')) {
				e.offsetX = e.layerX - e.currentTarget.offsetLeft;
				e.offsetY = e.layerY - e.currentTarget.offsetTop;
			}

			var selector = $(this).index() > 0 ? '.imgcontainer.img'+$(this).index() : '.imgcontainer.img3';
			var currentDiv = $(this)
			$(this).removeClass('index')
			$(selector).removeClass("hide").addClass('index')
			console.log(e)
			DoClip(selector, e.offsetX, e.offsetY);

			setTimeout(function(){
				console.log($(this))
				currentDiv.addClass('hide');
			},500);

			return false
		});

});