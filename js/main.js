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
		$('#Welcome').Banner();
		var counter = 0

		$('.imgcontainer').click(function(e){
			var selector = $(this).index() > 0 ? '.imgcontainer.img'+$(this).index() : '.imgcontainer.img3';
			var currentDiv = $(this)
			$(this).removeClass('index')
			$(selector).removeClass("hide").addClass('index')
			DoClip(selector, e.offsetX, e.offsetY);

			setTimeout(function(){
				currentDiv.addClass('hide');
			},1000);

			return false
		});

});