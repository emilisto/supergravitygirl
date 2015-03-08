/* Loads and keeps the data for different tilesets  */

var tileset = function(firstgid, name, tileWidth, tileHeight, source, imageWidth, imageHeight){

	var that = {};

	that.firstGid = firstgid;
	that.name = name;
	that.tileWidth = tileWidth;
	that.tileHeight = tileHeight;
	that.imageWidth = imageWidth;
	that.imageHeight = imageHeight;

	that.tileAmountWidth = Math.floor(imageWidth / tileWidth);
	that.lastGid = that.tileAmountWidth * Math.floor(imageHeight / tileHeight) + firstgid - 1;

	//Load images for tileset here

	that.tileSetImage = new Image();
	that.tileSetImage.src = source;

	that.getTileSetImage = function() {

		return that.tileSetImage;
	}

	that.getTileRect = function(gid) {

		var yc = ( Math.floor((gid - that.firstGid ) / that.tileAmountWidth)) * tileHeight;

		var xc = ( (gid - that.firstGid) % that.tileAmountWidth) * tileWidth;

		return {x: xc, y: yc, width: that.tileWidth, height: that.tileHeight};
	}

	return that;
};