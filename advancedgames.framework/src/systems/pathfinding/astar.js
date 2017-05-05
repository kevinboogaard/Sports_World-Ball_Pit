/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */

/**
 * @namespace Astar
 * @memberof ADCore
 * @static
 */
var Astar = {};

 /**
  * @property {number} horizontalScore - Horizontal Score being used for Astar calculations.
  * @memberof Astar
  * @static.
  * @default 1
  */
Astar.horizontalScore = 1;
 
 /**
  * @property {number} diagonalScore - Diagonal Score being used for Astar calculations.
  * @memberof Astar 
  * @static.
  * @default 1.414
  */
Astar.diagonalScore = 1.414;

 /**
  * @property {array} walkTiles - Tiles being used in the Astar calculations
  * @memberof Astar 
  * @static.
  * @default empty
  */
Astar.walkTiles = [];

/**
 * Search for the quickest path to your destination
 * 
 * @method Search
 * @memberof Astar
 * @static
 * @param {Vector2} start_position - The start position.
 * @param {Vector2} end_position - The destinationposition.
 * @returns {Array} Array of the tiles to the destination.
 */
Astar.Search = function (start_position, end_position) {
    var starttile = null;
    var endtile = null;

    // Loop through the columns.
    var len = Astar.walkTiles.length;
    for (var i = 0; i < len; i++) {
        var tile = Astar.walkTiles[i];

        start_position = new Vector2(Math.round(start_position.x), Math.round(start_position.y));
        end_position = new Vector2(Math.round(end_position.x), Math.round(end_position.y));

        if (tile.position.x === start_position.x && tile.position.y === start_position.y) {
            starttile = tile;
        }

        if (tile.position.x === end_position.x && tile.position.y === end_position.y) {
            endtile = tile;
        }

        // Reset each tile his G / H / F values, etc.
        tile.Reset();
    }

    var startTileExists = (typeof starttile !== "undefined" && starttile !== null);
    var endTileExists = (typeof endtile !== "undefined" && endtile !== null);

    // Check if both tiles exist. If not: Return an empty array.
    if (startTileExists && endTileExists) {
        var openlist = [];      // List of locations that will be evaluated by the system.
        var closedlist = [];    // Record of all locations which have been explored and evaluated by the system.

        var gScore = 0;
        var gScoreIsBest = false;

        // Begin by evaluating the starting tile.
        openlist.push(starttile);  
        while (openlist.length > 0) {
            var neighbour = null;

            // If the first tile doesn't exist, splice it out of the array.
            var firstExists = (typeof openlist[0] !== "undefined" && openlist[0] !== null);
            if (firstExists) {
                // Sort the list on F values.
                openlist.sort(this._sortOnF);

                var current = openlist[0];

                // If the current checked tile is equal to the end tile it means the system has received the end!
                if (current === endtile) {
                    // Congratulations! Return the path.
                    return this._getPathToTile(current);
                }

                // Remove the first out of the openlist and add it to the closed list, since it's being evaluated right now.
                openlist.splice(0, 1);
                closedlist.push(current);

                // Set the closed/open booleans on the tiles.
                current.closed = true;
                current.open = false;

                // Check the neighbours of the current evaluated tile.
                var len = current.neighbours.length;
                for (var i = 0; i < len; i++) {
                    neighbour = current.neighbours[i];

                    // If the neighbour is already closed, continue with the next neighbour.
                    if (neighbour.closed) {
                        continue;
                    }
                        
                    // Check if neighbour is diagonal. Add the score to the gscore. 
                    if (this._isDiagonal(current, neighbour)) {
                        gScore = current.g + Astar.diagonalScore;
                    } else {
                        gScore = current.g + Astar.horizontalScore;
                    }

                    gScoreIsBest = false;

                    if ( !neighbour.open && !neighbour.closed && !neighbour.occupier ) {
                        gScoreIsBest = true;

                        neighbour.h = Astar._heuristic(neighbour.position, current.position);

                        openlist.push(neighbour);
                        neighbour.open = true;
                    } else if (gScore < neighbour.g) {
                        gScoreIsBest = true;
                    }

                    if (gScoreIsBest) {
                        neighbour.parent = current;
                        neighbour.g = gScore;
                        neighbour.f = neighbour.g + neighbour.h;
                    }
                }
            }
            else {
                openlist.splice(0, 1);
            }
        }
    }

    return [];
};

/**
 * Check if the two tiles are diagonal.
 * 
 * @method IsDiagonal
 * @memberof Astar
 * @private
 * @param {TileModel} tileA - The first tile.
 * @param {TileModel} tileB - The second tile.
 * @returns {Boolean} Result.
 */
Astar._isDiagonal = function (tileA, tileB) {
    if (tileA.x !== tileB.x && tileA.y !== tileB.y) return true;
    else return false;
};

/**
 * Method to check if the tiles should be first or not in the sorting process.
 * 
 * @method SortOnF
 * @memberof Astar
 * @private
 * @param {TileModel} a - The first tile.
 * @param {TileModel} b - The second tile.
 * @returns {integer} Result for the sorting process.
 */
Astar._sortOnF = function (a, b) {
    if (a.f > b.f || a.f === b.f && a.h > b.h) {
        return 1;
    } else {
        return -1;
    }
};


/**
 * Get the final path to the tile. This method loops through the parents untill it reaches the tile without a parent. 
 * On the end it will reverse the list to get the full path from A to B.
 * 
 * @method GetPathToTile
 * @memberof Astar
 * @private
 * @param {TileModel} tile - The destination tile.
 * @returns {Array} Array of TileModels- the path from A till B.
 */
Astar._getPathToTile = function (tile) {
    var path = [];

    while (tile.parent) {
        var contains = (path.indexOf(tile) > -1);

        if (!contains) {
            path.push(tile.position);
            tile = tile.parent;
        }
    }

    path.reverse();

    return path;
};

/**
 * Calculate the Heuristic from two positions 
 * 
 * @method Heuristic
 * @memberof Astar
 * @private
 * @param {Vector2} posA 
 * @param {Vector2} posB
 * @returns {Number} The result of the heuristic process. 
 */
Astar._heuristic = function (posA, posB) {
    var d1 = Math.abs(posB.x - posA.x);
    var d2 = Math.abs(posB.y - posA.y);
    return d1 + d2;
};