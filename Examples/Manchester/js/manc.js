$(function() {
	$('#isotope').isotope({
 	 itemSelector : '.isoitem',
  	 layoutMode : 'masonry'
	});


$('#News a').click(function(){
  var selector = $(this).attr('data-filter');
  $('#isotope_selectors li').find('img').attr('src','css/images/list.png')
    $(this).find('img').attr('src','off.png');

    $('#isotope').isotope({ filter: selector },function(){$('#isotope').isotope('reLayout'); console.log('hi?')});
 	 return false;
});



	//where are the navs at? Used in the function below
	var navtop =$('#stickynav').offset().top;
	
	
	//function to stick nav to the top.
	var stickynav = function(nav){
		if (nav == '#stickynav'){
			eg = navtop
			number = 0
		}else {
			eg = othernav-50
			number=55
		}
				console.log(eg)
		var windowtop = $(window).scrollTop();

		if (windowtop > eg ){ 
			$(nav).css({ 'position': 'fixed', 'top':number});
		}else{
			$(nav).css({'position': 'relative', 'top': 0})
		}
		}

//Executes the function on scrolling and at page load. 
stickynav('#stickynav');
	
$(window).scroll(function() {
		 stickynav('#stickynav');
});


//Will add another Above here




//This is where the slideDown and SlideUp is for Hiddencontent

	$('.showmore').toggle(function(){
		$('.hiddencontent').slideDown();
		$('.showmore').attr("src","images/hide.png")
	}, function(){ 
		$('.hiddencontent').slideUp();
		$('.showmore').attr("src","images/showmore.png")
	});
	
	
//This is the Isotope Section, it uses Isotope. Isotope!.
$('#isotope').isotope({
 	 itemSelector : '.isoitem',
  	 layoutMode : 'masonry'
	});


$('#News a').click(function(){
  var selector = $(this).attr('data-filter');
  $('#isotope_selectors li').find('img').attr('src','css/images/list.png')
    $(this).find('img').attr('src','off.png');

    $('#isotope').isotope({ filter: selector },function(){$('#isotope').isotope('reLayout'); console.log('hi?')});
 	 return false;
});

//This is the function to scroll the page with a click

		$('.midnav a').click(function(){
			var $anchor = $(this);
			$('html, body').stop().animate({scrollTop:$($anchor.attr('name')).offset().top -145},1000);
		});




//This displays the overlay on the squares. I guess.

$('.square').mouseover(function(){
		$(this).children('.overlay').css('display', 'block');
		$(this).children('.overlay').css('zindex', 40);
	});
		
$('.overlay').mouseleave(function(){
	$(this).css('display','none');
});


//This is the Carousel js, it generates pages based on the amount of pages and generates clickable buttons based on it. with a for loop. See. I know.
				function generatePages() {
					var _total, i, _link;
					
					_total = $( "#carousel" ).rcarousel( "getTotalPages" );
					
					for ( i = 0; i < _total; i++ ) {
						_link = $( "<a href='#'></a>" );
						
						$(_link)
							.bind("click", {page: i},
								function( event ) {
									$( "#carousel" ).rcarousel( "goToPage", event.data.page );
									event.preventDefault();
								}
							)
							.addClass( "bullet off" )
							.appendTo( "#pages" );
					}
					
					// mark first page as active
					$( "a:eq(0)", "#pages" )
						.removeClass( "off" )
						.addClass( "on" )
						.css( "background-image", "url(css/images/page-on.png)" );

				}

				function pageLoaded( event, data ) {
					$( "a.on", "#pages" )
						.removeClass( "on" )
						.css( "background-image", "url(css/images/page-off.png)" );

					$( "a", "#pages" )
						.eq( data.page )
						.addClass( "on" )
						.css( "background-image", "url(css/images/page-on.png)" );
				}
				
				$("#carousel").rcarousel(
					{
						visible: 1,
						step: 1,
						speed: 700,
						auto: {
							enabled: true
						},
						width:960,
						height: 469,
						start: generatePages,
						pageLoaded: pageLoaded
					}
				);
				
				
				$("#selectors").rcarousel(
					{
						visible: 3,
						step: 1,
						speed: 0,
						auto: {
							enabled: false
						},
						width:310,
						height: 300,
						navigation:{
							prev: "#banner-caro-prev",
							next: "#banner-caro-next",
						},
					}
				);
				
				
				$( "#banner-caro-next" )
					.add( "#banner-caro-prev" )
					.add( ".bullet" )
					.hover(
						function() {
							$( this ).css( "opacity", 0.7 );
						},
						function() {
							$( this ).css( "opacity", 1.0 );
						}
					);
				
				$( "#ui-carousel-next" )
					.add( "#ui-carousel-prev" )
					.add( ".bullet" )
					.hover(
						function() {
							$( this ).css( "opacity", 0.7 );
						},
						function() {
							$( this ).css( "opacity", 1.0 );
						}
					);
			});