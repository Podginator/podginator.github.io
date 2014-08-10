(function(){
	$.fn.Banner = function(text){
		var	canvas, context, cloneArray, bgCanvas, bgContext, canvasW, canvasH,	
		canvas 	= document.getElementById($(this).attr('id'));
		context = canvas.getContext('2d');
		canvas.height=$(this).height();
		canvas.width=$(this).width();
		radius= 1,
		smaller = 1,
		opacity = 1,
		angle=45,
		xPos=0;
	
		canvas.onmousemove  = OnMouseMove
		SetupParticles()
		Draw();


		function SetupParticles() {
			if(radius > 260){
				return;
			}
			radius += radius > 180 ? 5 : 10  
			opacity = 1 - radius / 260 

			Draw();
			setTimeout(function(){
				SetupParticles()
			}, 5)
		};

		function RenderRect(){
			var centerX = canvas.width/2;
			var centerY = canvas.height/2;

			var grd=context.createLinearGradient(0,0,320,0);
			grd.addColorStop(0,"rgba(0,0,0,0.4)");
			grd.addColorStop(1,"rgba(0,0,0,0)");

			context.save()

			context.translate(centerX, centerY);
			radianAngle = angle*(Math.PI/180)
			console.log(angle)
			context.rotate(radianAngle);
			//DrawRect
			context.beginPath();
		    context.rect(0, 0-smaller, canvas.width, smaller*2);
		    context.fillStyle = grd;
		    context.fill();
		    //

		    context.restore()
		}

		function RenderText(txt, y){

			context.save()

			context.shadowColor = "#bbb";
		    context.shadowBlur = 4
		    context.shadowOffsetX = xPos > 0 ? -5 : 5;
	      	context.shadowOffsetY = xPos > 0 ? -((angle-180)/(90/5)): (angle/(90/5))
			size = GetFontSize(txt)

			context.font = size+"px Source Sans Pro";
			context.fillStyle = "#000"
			context.fillText(txt,canvas.width/2-(context.measureText(txt).width)/2, canvas.height/1.5);

			context.restore()
			
		}


		function RenderCircle(size, color, opacity){
			context.beginPath();
      		context.arc(canvas.width/2, canvas.height/2, size, 0, 2 * Math.PI, false);
      		context.fillStyle = "rgba("+color+","+opacity+")";
      		context.fill()
		}

		function GetFontSize(text){
			size = 0;
			context.font = size+"px Source Sans Pro";

			while(context.measureText(text).width < smaller*1.25){
				size++
				context.font = size+"px Source Sans Pro";
			}

			return size;

		}

		function Draw() {

			context.clearRect( 0, 0, canvas.width, canvas.height );
			smaller = radius > 180 ? 180 : radius
			
			RenderRect()

			RenderCircle(radius,"255,255,255", opacity)
      		RenderCircle(smaller,"255,255,255", "1")
      		
			RenderText("Hi")

		};

		function OnMouseMove(e){
			var calculateAngle = e.clientY;
			xPos = e.clientX-$(this).position().left > canvas.width/2 ? 180 : -180
			angle = calculateAngle/(canvas.height/xPos)+90
			Draw()
		}	
	}
})(jQuery);
