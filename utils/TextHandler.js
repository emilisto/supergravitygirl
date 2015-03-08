
//Just render text to the screen 
var TextHandler = function(screenWidth) {

	var _text = "";
	var _screenWidth = screenWidth;

	var that = {};


	that.setLevelText = function(text) {
		_text = text;
	};

	that.renderText = function (context) {
		context.font = "20px press_start_2pregular";
        
		// context.fillStyle = "#000000";
        // context.fillRect(90, 60, _screenWidth - 400, 50);

        context.fillStyle = "#E6E6E6";
        context.fillText(_text, 100, 100);
	};

	return that;
};
