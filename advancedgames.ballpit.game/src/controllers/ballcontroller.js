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
     * 'SwapBallsByTilePositions'
     */
    p.SwapBallsByTilePositions = function ( tilepositionA, tilepositionB ) {
        var tileA = this.layer.GetTileByTilePosition(tilepositionA);
        var tileB = this.layer.GetTileByTilePosition(tilepositionB);

        var occupierA = tileA.occupier;
        var occupierB = tileB.occupier;

        tileA.occupier = occupierB;
        tileB.occupier = occupierA;

        occupierA.position = tileB.position;
        occupierB.position = tileA.position;
    };

    /**
     * 'SwapBallsByScreenPositions'
     */
    p.SwapBallsByScreenPositions = function ( positionA, positionB ) {
        var tileA = this.layer.GetTileByScreenPosition(positionA);
        var tileB = this.layer.GetTileByScreenPosition(positionB);

        var occupierA = tileA.occupier;
        var occupierB = tileB.occupier;

        tileA.occupier = occupierB;
        tileB.occupier = occupierA;

        occupierA.position = tileB.position;
        occupierB.position = tileA.position;
    };

    /**
     * 'PositionsOnGridByTileposition'
     */
    p.PositionsOnGridByTileposition = function ( tilepositionA, tilepositionB ) {
        var tileA = this.layer.GetTileByTilePosition(tilepositionA);
        var tileB = this.layer.GetTileByTilePosition(tilepositionB);

        if ( tileA === null || tileB === null ) return false;
        else return true;
    };

    /**
     * 'PositionsOnGridByScreenposition'
     */
    p.PositionsOnGridByScreenposition = function ( positionA, positionB ) {
        var tileA = this.layer.GetTileByScreenPosition(positionA);
        var tileB = this.layer.GetTileByScreenPosition(positionB);

        if ( tileA === null || tileB === null ) return false;
        else return true;
    };

    /**
     * 'Dispose'
     */
    p.dispose = function () {
        throw new Error("NOT MADE YET");
    };

    return BallController;
})();