var ballpit = ballpit || {};

ballpit.BallHelper = (function () {

    /**'
     * 'BallHelper'
     * @param {Tilemap} 'tilemap'
     * @param {BallContainer} 'ballcontainer'
     */
    function BallHelper(layer, ballContainer) {
        this.layer = layer;
        this.ballContainer = ballContainer;
    }
    var p = BallHelper.prototype;

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

    p.GetTilesByDirection = function (tile, direction ) {
        var tiles = [];

        var checked = tile;
        while (checked) {
            if (checked !== tile) tiles.push(checked);
            checked = this.layer.GetNeighbourFromTileByDirection(checked, direction);
        } 

        return tiles;  
    };

    p.GetAligned = function (tile) {
        if (tile.occupier === null) throw new Error("Tile doesn't have a ball on it.");
        var aligned = [];

        var horizontal_aligns = this.GetAlignedByAxis(tile, 0);
        if (horizontal_aligns.length + 1 >= 3) aligned = aligned.concat(horizontal_aligns);

        var vertical_aligns = this.GetAlignedByAxis(tile, 1);
        if (vertical_aligns.length + 1 >= 3) aligned = aligned.concat(vertical_aligns);

        return aligned;
    };

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
     * 'GetAlignedByAxis'
     * @param {TileModel} 'tile' 
     * @param {int} 'axis' : 0 = Horizontal | 1 = Vertical
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

    p.Dispose = function () {
        delete this.layer;
        delete this.ballContainer;
    };

    return BallHelper;
})();