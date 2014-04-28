//Extend Jquery to create plugin
/* canvas: 
 *    <canvas id="backup" width="50" height="50" data-value="25" data-name="Sauvegarde" style="vertical-align: -75%;"></canvas> 
 * 
 *  Then call it with $('#backup').draw_percent()
 * */


(function($){
    $.fn.draw_percent = function( value, options ){
		// Default options.
		var settings = $.extend({
			gradient: false,
			//color: '#A3CFDC',
			name : "toto",
            radius: 40,
            lineWidth: 10,
		}, options );
		value = (value>0) ? value : $(this).data('value'); // get data value if exists, otherwise get passed value
		
		return this.each(function() {
			//create a canvas with all da' stuff			
			var canvas = document.getElementById($(this).attr('id'));
			var context = canvas.getContext('2d');
			var x = canvas.width / 2;
			var y = canvas.height / 2 ;
			var radius = settings.radius;
			var endPercent = value;
			var curPerc = 0;
			var counterClockwise = false;
			var circ = Math.PI * 2;
			var quart = Math.PI / 2;

            //ids.console.log(

			context.lineWidth = settings.lineWidth;
			context.strokeStyle = '#ad2323';
			context.shadowOffsetX = 0;
			context.shadowOffsetY = 0;
			context.shadowBlur = 0;
			context.shadowColor = '#989898';
			
			//animate it!		
			function animate(current) {
				//fixed circle
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.beginPath();
				context.strokeStyle = '#DADADA';
				context.lineWidth = settings.lineWidth;
				context.shadowBlur = 0;
				context.arc(x, y, radius, -(circ), (circ) , true);
				context.stroke();
				
				//moving one
				context.beginPath();
				ids.console.log(settings.gradient)
				if(settings.gradient) {
					// image
					var imgdata = '/static/images/gradient.png';
					var gradient = new Image();
					gradient.src = imgdata;
					context.strokeStyle = gradient;
					context.strokeStyle = context.createPattern(gradient,"no-repeat");
				}
				else {
					// no-image
					context.strokeStyle = settings.color;
					 var gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
					gradient.addColorStop(0,   '#f00'); // red
					gradient.addColorStop(0.5, '#ff0'); // yellow
					gradient.addColorStop(1,   '#00f'); // blue	
				}
				
				
				context.shadowBlur = 0;
				context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
				context.stroke();
				curPerc++;
				if (curPerc < endPercent) {
					requestAnimationFrame(function () {
						animate(curPerc / 100)
					});
				}
			 
				context.shadowBlur = 0; // remove blur on text
				context.fillStyle = "#3B3B41";
				context.font = "bold 18px sans-serif";

				// text: percent
				context.fillText(curPerc+"%", x - (17),x+4);
			}
 
			animate();	
		});
	};
     
})(jQuery);
	
