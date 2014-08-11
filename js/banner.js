(function(){
	$.fn.Banner = function(){
		var	canvas, context, cloneArray, bgCanvas, bgContext, canvasW, canvasH,	
		canvas 	= document.getElementById($(this).attr('id'));
		context = canvas.getContext('2d');
		canvas.height=$(this).height();
		canvas.width=$(this).width();
		radius= 1,
		smaller = 1,
		opacity = 1,
		fontOp=0,
		angle=45,
		xPos=0;
		
		window.addEventListener('resize', Resize, false);
		canvas.onmousemove  = OnMouseMove
		SetupParticles()
		Draw();



		function Resize(){
			//canvas.height=$(this).height();
			canvas.width=$(this).width();
			Draw();
		}

		function SetupParticles() {
			if(radius > 260){
				return;
			}
			radius += radius > 180 ? 3 : 5  
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
				radianAngle = angle*(3.14/180);
				context.rotate(radianAngle);

				context.beginPath();
			    context.rect(0, 0-smaller, canvas.width, smaller*2);
			    context.fillStyle = grd;
			    context.fill();
		    context.restore()
		}

		function RenderText(txt, y){
			context.save()
				fontOp+=  3/80;

				context.shadowColor = "rgba(200,200,200,"+fontOp+")";
			    context.shadowBlur = 4
			    context.shadowOffsetX = xPos > 0 ? -5 : 5;
		      	context.shadowOffsetY = xPos > 0 ? -((angle-180)/(90/5)): (angle/(90/5))

				context.font = 270+"px Source Sans Pro";
				context.fillStyle = "rgba(0,0,0,"+fontOp+")";
				context.fillText(txt,canvas.width/2-(context.measureText(txt).width)/2, canvas.height/1.4);
			
			context.restore()
		}


		function RenderCircle(size, color, opacity){
			context.beginPath();
      		context.arc(canvas.width/2, canvas.height/2, size, 0, 2 * Math.PI, false);
      		context.fillStyle = "rgba("+color+","+opacity+")";
      		context.fill()
		}

		function Draw() {
			context.clearRect( 0, 0, canvas.width, canvas.height );
			smaller = radius > 180 ? 180 : radius
			RenderRect()
			RenderCircle(radius,"255,255,255", opacity)
      		RenderCircle(smaller,"255,255,255", "1")
      		if(smaller == 180){
				RenderText("Hi")
			}
		};

		function OnMouseMove(e){
			var calculateAngle = e.clientY;
			xPos = e.clientX-$(this).position().left > canvas.width/2 ? 180 : -180
			angle = calculateAngle/(canvas.height/xPos)+90
			angle =  angle < -65 ? -65 : angle;
			angle = angle > 250 ? 250 : angle;
			Draw();
		}	
	}
})(jQuery);
