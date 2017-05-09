/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.BallHelper = (function () {

    /**
     * @class ballpit.BallHelper
     * @constructor
     * @param {TileLayer} layer - 
     * @param {BallContainer} ballContainer - 
     */
    function BallHelper(layer, ballContainer) {
         /**
         * @property {layer} layer - A layer of the game
         * @public
         */
        this.layer = layer; 
        
        /**
         * @property {ballContainer} ballContainer - The container of the balls
         * @public
         */
        this.ballContainer = ballContainer;
    }
    var p = BallHelper.prototype;
    
    /**
     * @method GetLowestBeneath
     * @memberof ballpit.BallHelper
     * @public
     * @param {tile} tile - This is one of the tiles
     */
    p.GetLowestBeneath = function (tile) {
        var result = tile;
        var direction = new Vector2(0, 1);

        var checked = this.layer.GetNeighbourFromTileByDirection(tile, direction);
        while (checked !== null && checked.occupier === null) {
            result = checked;
            checked = this.layer.GetNeighbourFromTileByDirection(checked, direction);
        }

        return result;
    };

    /**
     * @method GetTilesByDirection
     * @memberof ballpit.BallHelper
     * @public
     * @param {tile} tile - This is one of the tiles
     * @param {number} direction - This is one of the tiles
     */
    p.GetTilesByDirection = function (tile, direction ) {
        var tiles = [];

        var checked = tile;
        while (checked) {
            if (checked !== tile) tiles.push(checked);
            checked = this.layer.GetNeighbourFromTileByDirection(checked, direction);
        } 

        return tiles;  
    };

     /**
     * @method GetAligned
     * @memberof ballpit.BallHelper
     * @public
     * @param {tile} tile - This is one of the tiles
     */
    p.GetAligned = function (tile) {
        if (tile.occupier === null) throw new Error("Tile doesn't have a ball on it.");
        var aligned = [];

        var horizontal_aligns = this.GetAlignedByAxis(tile, 0);
        if (horizontal_aligns.length + 1 >= 3) aligned = aligned.concat(horizontal_aligns);

        var vertical_aligns = this.GetAlignedByAxis(tile, 1);
        if (vertical_aligns.length + 1 >= 3) aligned = aligned.concat(vertical_aligns);

        return aligned;
    };

    /**
     * @method GetAlignedByDirection
     * @memberof ballpit.BallHelper
     * @public
     * @param {tile} tile - This is one of the tiles
     * @param {number} direction - This is one of the tiles
     */
    p.GetAlignedByDirection = function (tile, direction) {
        if (tile.occupier === null) throw new Error("Tile doesn't have a ball on it.");
        var occupier = tile.occupier;

        var aligned = [];
        var type = occupier.type;

        var checked = tile;
        while (checked && checked.occupier && checked.occupier.type === type) {
            if (checked !== tile) aligned.push(checked);
            checked = this.layer.GetNeighbourFromTileByDirection(checked, direction);
        } 

        return aligned;  
    };

    /**
     * @method GetAlignedByAxis
     * @memberof ballpit.BallHelper
     * @public
     * @param {tile} tile - This is one of the tiles
     * @param {number} axis - The direction
     */
    p.GetAlignedByAxis = function (tile, axis) {
        if (tile.occupier === null) throw new Error("Tile doesn't have a ball on it.");
        var aligned = [];

        var directions;
        if (axis === 0) directions = [ new Vector2(1,0), new Vector2(-1,0) ];
        else if (axis === 1) directions =  [ new Vector2(0,1), new Vector2(0, -1) ];
        else throw new Error("Axis not known");

        var len = directions.length;
        for (var i = 0; i < len; i++) {
            var dir_aligns = this.GetAlignedByDirection(tile, directions[i]);
            aligned = aligned.concat(dir_aligns);
        }

        return aligned;
    };
    /**
     * @method Dispose
     * @memberof ballpit.BallHelper
     * @public
     */
    p.Dispose = function () {
        delete this.layer;
        delete this.ballContainer;
    };

    return BallHelper;
})();