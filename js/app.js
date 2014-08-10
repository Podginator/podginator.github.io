var app = angular.module("portApp", [])

app.directive('workPages',function($timeout, $http){
	return{
		restrict:"A",
		templateUrl:"work-pages.html",
		controller: function($scope, $timeout, $http){
			$scope = this;
			$scope.ableToShow = [1, 2, 3]
			$scope.examples = [];
			$http.get('js/work.json').success(function(data)
			{
				$scope.examples = data;
			})
		},
		link: function ($scope, element, attrs, controller) {		//Maybe not the best place for a function declaration.
			ran = 0; 
			var reLayout = function(){
				if(ran===$(element).children().length-1)
				{
					$.each($scope.Work.ableToShow, function(i){
						$scope.Work.ableToShow[i] = $scope.Work.ableToShow[i] + 1 > $scope.Work.examples.length ? 1 : $scope.Work.ableToShow[i] + 1;
					});
					$scope.$apply(function(){
						toggleContainers(1);
						ran=0;
					})
				}else{
					setTimeout(function(){
						reLayout();
					},100);
				}
			}
			$timeout(function() {

				var lastChild = element.children()[element.children().length-1];
				var firstChild = element.children()[0];
				$(lastChild).on('click', function(){
					toggleContainers(0);
					reLayout(); 
				})

						//DOM-Less Functions
				$(document).on("click", '.imgcontainer', function(){
					ExpandOut(this, '.imgcontainer', 750, true);
				});

				$(document).on('click', '.wat', function(){
					if($(this).parent('.imgcontainer').hasClass('noclick'))
					{
						$('.imgcontainer').show();
						$('.imgcontainer').animate({height:$(window).width()>500 ? 250 : 100}, function()
						{
							$('.imgcontainer').removeClass('noclick');
						});
						$(this).parent('.imgcontainer').find('.wat p').text(names);
					}
				});

				$(document).on('mousemove', '.color',function(e){
					var picwidth=1920;
					var windowwidth = $(window).width();
					// Calculates where the mouse is based on the window width from 0-1
					var mouseposition = (e.pageX-this.offsetLeft)/windowwidth; 
					// Calculates how much is remaining of the image
					var remaining = Math.floor((picwidth-windowwidth)*mouseposition);
					$(this).parent().children('.bw').css('left', -remaining)}).mouseout(function()	{
					$(this).parent().children('.bw').css('left', 0); initialleft=0

				});

				var executed = 0;

				$(window).scroll(function()
				{
					var htmloffset = $('html, body').offset().top
					
					if(-htmloffset > $('#Work').offset().top-500 & executed!=1 & $(window).width()>500)
					{
						toggleContainers(1);
						executed=1;
					}
				});
			},100)
		},
		controllerAs: 'Work'
	}
});
