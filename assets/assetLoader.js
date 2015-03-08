/* Loads all the assets for this game */

var assetLoader = function() {

	var playerImage = new Image();
	playerImage.src = "assets/img/ninja1.png";

	var methods = {
		playerImage: playerImage
	};

	return methods;
};