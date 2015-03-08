var entity = function(x, y, width, height, img) {

	var img = img;

	var that = {};

	that.x = x;

	that.y = y;

	that.width = width;
	that.height = height;

	that.direction = 1; //0: left, 1: right

	that.animationHelper = animationHelper(img, that, window.FRAMERATE);

	that.render = function (context) {

		context.fillStyle = "#000000";

		that.animationHelper.drawCurImage(context);

		if(window.DEBUG_MODE) {
			context.beginPath();

			//context.rect(that.x - that.width, that.y - that.height, that.width * 3, that.height * 3);

			//Draw box with offsets into the sprite
			context.rect(that.x + 13, that.y + 9, that.width - 25, that.height - 9);

			//Draw box same size as sprite
			
			context.rect(that.x , that.y, that.width, that.height);

			
			context.rect(that.x, that.y + that.height + 3, that.width, 10);

			context.strokeStyle = "#FCEB77";
			context.stroke();
			context.closePath();
		}	
	};

	return that;
};
