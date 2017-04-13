var ballpit = ballpit || {};

ballpit.BallController = (function () {

    /**'
     * 'BallController'
     * @param {Tilemap} 'tilemap'
     * @param {BallContainer} 'ballcontainer'
     */
    function BallController(tilemap, ballContainer) {
        this.tilemap = tilemap;
        this.ballContainer = ballContainer;

        this.layer = this.tilemap.mainLayer;
        this.columns = this.layer.tiledata;
    }
    var p = BallController.prototype;

    /**
     * 'Initialize'
     * Method to Initialize the balls on the grid.
     * Use this method before you allow the player to move balls!
     */
    p.Initialize = function () {
        var column_len = this.columns.length;
        for (var y = 0; y < column_len; y++) {
            var row = this.columns[y];

            var row_len = row.length;
            for (var x = 0; x < row_len; x++) {
                var tile = row[x];
                
                if (tile.occupier === null) {
                    var ball = this.ballContainer.AddRandomBall(tile.position);
                    tile.occupier = ball;
                }
            }
        }
    };

    /**
     * 'SwapBallsBySwipe'
     * @param {Vector2} 'StartPosition' - Screen Position.
     * @param {Vector2} 'EndPosition'   - Screen Position.
     */
    p.SwapBallsBySwipe = function (startPosition, endPosition) {
        var tile = this.layer.GetTileByScreenPosition(startPosition);

        var difference = endPosition.Clone().Substract(startPosition);
        var direction = difference.Normalize();

        var neighbour = this.GetNeighbourFromTileByDirection(tile, direction);
        this._swap(tile, neighbour);
    };

    /**
     * 'Swap' 
     * @private
     * @param {TileModel} 'tileA'
     * @param {TileModel} 'tileB'
     */
    p._swap = function (tileA, tileB) {
        var occupierA = tileA.occupier;
        var occupierB = tileB.occupier;

        tileA.occupier = occupierB;
        tileB.occupier = occupierA;

        occupierA.position = tileB.position;
        occupierB.position = tileA.position;
    };

    /**
     * 'GetNeighbourFromTileByDirection'
     * @returns {BallModel}
     * @param {TileModel} 'tile'
     * @param {Vector2} 'direction'
     */
    p.GetNeighbourFromTileByDirection = function ( tile, direction ) {
        var neighbours = tile.neighbours;
        var len = neighbours.length;
        for ( var i = 0; i < len; i++) {
            var neighbour = neighbours[i];
            
            if (neighbour.tileposition.x === (tile.tileposition.x + direction.x) && neighbour.tileposition.y === (tile.tileposition.y + direction.y) ) {
                return neighbour;
            }
        }
        return null;
    };

    /**
     * 'Dispose'
     */
    p.dispose = function () {
        throw new Error("NOT MADE YET");
    };

    return BallController;
})();