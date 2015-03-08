var map = function(posX, posY, width, height, tileWidth, tileHeight, tileSets, layers, playerStartPos, levelStartText, canToggleGravity, scrollable) {

	var layers = layers;

	var that = {};

	that.width = width;
	that.height = height;

	that.widthInPx = that.width * tileWidth;
	that.heightInPx = that.height * tileHeight;
	that.tileWidth = tileWidth;
	that.tileHeight = tileHeight;
	that.tileSets = tileSets;

	that.levelStartText = levelStartText;
	that.canToggleGravity = canToggleGravity;

	that.playerStartPos = {x: playerStartPos.x * that.tileWidth, y: playerStartPos.y * that.tileHeight};

	that.layers = layers;

	that.posX = posX;
	that.posY = posY;

	that.scrollable = scrollable;

	function getTileRect(gid) {

		var tileInfo = {};

		var tileRect = {};
		var tileImage = {};

		for(var i = 0; i < tileSets.length; i++){
			var tileSet = tileSets[i];

			var yc = 0;

			if(gid >= tileSet.firstGid && gid <= tileSet.lastGid) {

				tileRect = tileSet.getTileRect(gid);
				tileImage = tileSet.getTileSetImage();
				break;
			}
		}

		return {tileImage: tileImage, tileRect: tileRect }
	};

	//Get the tiles that are in or overlapping a rect
	that.getTilesInRect = function(rect) {

		var tilesInRect = [];

		//Offset rect depending on position of map
		rect.y -= that.posY;
		rect.x -= that.posX;

		var ignoreTile = false;

		for(var yCord = rect.y; yCord <= (rect.y + rect.height); yCord += rect.height / 2){

			for(var xCord = rect.x; xCord <= (rect.x + rect.width); xCord += rect.width / 2) {

				//Calculate tile indexes
				var tileX = Math.floor(xCord / that.tileWidth);

				var tileY = Math.floor(yCord / that.tileHeight);

				//Calculate index in tiles list
				var tileIndex = (tileY * width + tileX);

				//Get the tile
				var tile = layers[0].tiles[tileIndex];

				//Calc rect of tile
				var tileRect = {x: tileX * that.tileWidth, y: tileY * that.tileHeight, width: that.tileWidth, height: that.tileHeight };

				if(tile && tile.deadly) {

					var tileRectOffset = {
						x: tileRect.x + tile.offsetLeft,
						y: tileRect.y + tile.offsetTop,
						width: tileRect.width - tile.offsetLeft - tile.offsetRight,
						height: tileRect.height - tile.offsetTop - tile.offsetBottom
					};	
					
					if(!utils.contains(rect, tileRectOffset)){
						
						ignoreTile = true;
					}
				}	

				if(tile && !ignoreTile) {
					tilesInRect.push({rect: tileRect, tile: tile });
				}

				ignoreTile = false;
			}
		}

		return tilesInRect;
	};

	that.render = function (context, player, screenWidth, screenHeight) {
		
		//Draw layers 
		for(var i = 0; i < 1; i++){
			var tiles = layers[i].tiles;

			var tilesOnScreen = tiles;

			//Draw layers tiles
			for(var j = 0; j < tilesOnScreen.length; j++)
			{
				var tile = tilesOnScreen[j];

				if(tile.gid > 0) {

					//Get corresponding bit of tileimage
					var tileInfo = getTileRect(tile.gid);

					var tileRect = tileInfo.tileRect;

					//Calculate where to draw the tiles on the map
					var tileOnMapY = that.posY + Math.floor(j / width) * that.tileHeight;
					var tileOnMapX =  that.posX + ((j % width) * that.tileWidth);

					context.drawImage(tileInfo.tileImage, tileRect.x, tileRect.y, tileRect.width, tileRect.height, tileOnMapX, tileOnMapY, tileRect.width, tileRect.height);
				}
			}
		}	

		if(window.DEBUG_MODE) {
			that.renderGrid(context);
		}
	};

	//Gets only the tiles that are visible on the screen
	that.filterNonScreenTiles = function (tiles, screenWidth, screenHeight) {
		var filteredTiles = [];

		for(var curY = 0; curY < that.height; curY++) {

			var firstElement = (curY * that.width) + (that.posX / that.tileWidth);

			var lastElement = firstElement + (screenWidth / that.tileWidth );

			filteredTiles = filteredTiles.concat(tiles.slice(firstElement, lastElement));
		}

		return filteredTiles;
	};

	that.renderGrid = function(context) {

		var prevStyle = context.fillStyle;

		context.fillStyle = "#CCFFFF";

		for(var j = 0; j < height * that.tileHeight; j += that.tileHeight) {

			for(var i = 0; i < width * that.tileWidth; i += that.tileWidth) {

				context.beginPath();

				context.rect(i, j, that.tileWidth, that.tileHeight);

				context.strokeStyle = "#CCFFFF";
				context.stroke();
				context.closePath();
			}
		}

		context.fillStyle = prevStyle;
	};

	that.isEntityOutside = function (entity) {
		if(entity.x < that.posX - entity.width || entity.y < that.posY || entity.x > that.posX + that.width * that.tileWidth 
			|| entity.y > that.posY + that.height * that.tileHeight) {
			return true;
		}

		return false;
	};

	return that;
};