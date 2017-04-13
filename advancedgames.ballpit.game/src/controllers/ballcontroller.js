var ballpit = ballpit || {};

ballpit.Event = ballpit.Event || {};
ballpit.Event.ON_BALL_SWAP = "on_ball_swap";

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

        this.helper = new ballpit.BallHelper(this.layer, ballContainer);
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
     * 'Swap'
     * @param {Vector2} 'start'
     * @param {Vector2} 'end'
     */
    p.Swap = function (start, end) {
        var tiles = this.GetTilesByDirectionFromPositions(start, end);
        this.SwapBallsByArray(tiles);

        var alignedArray = this.GetAlignedArrayByTiles(tiles);

        var counter = 0;
        for (var i = 0; i < 2; i++) {
            if (alignedArray[i].length > 0) {
                this.RemoveBallsByArray(alignedArray[i]);
                this.ballContainer.RemoveBall(tiles[i].occupier);
                counter += 1;
            } 
        }
        
        if (counter === 0)  {
            this.SwapBallsByArray(tiles);
        }
    };

    /**
     * 'GetTilesByDirectionFromPositions'
     * @returns { [] }
     * @param {Vector2} 'StartPosition' - Screen Position.
     * @param {Vector2} 'EndPosition'   - Screen Position.
     */
    p.GetTilesByDirectionFromPositions = function (startPosition, endPosition) {
        var tile = this.layer.GetTileByScreenPosition(startPosition);

        var difference = endPosition.Clone().Substract(startPosition);
        var direction = difference.Normalize();

        var neighbour = this.layer.GetNeighbourFromTileByDirection(tile, direction);
        
        return [ tile, neighbour ];
    };
    
    /**
     * 'SwapBallsByArray'
     * @param { [] } 'array'
     */
    p.SwapBallsByArray = function (array) {
        var occupierA = array[0].occupier;
        var occupierB = array[1].occupier;

        array[0].occupier = occupierB;
        array[1].occupier = occupierA;

        occupierA.position = array[1].position;
        occupierB.position = array[0].position;
    };
    
    /**
     * 'RemoveBallsByArray'
     * @param { [] } 'array'
     */
    p.RemoveBallsByArray = function (array) {
        var len = array.length;
        for (var i = 0; i < len; i++) {
            var current = array[i];
            var occupier = current.occupier;
            this.ballContainer.RemoveBall(occupier);
        }
    };

    /**
     * 'GetAlignedArrayByTiles'
     * @returns { [] }
     * @param { [] } 'array'
     */
    p.GetAlignedArrayByTiles = function (array) {
        var aligned_a = this.helper.GetAligned(array[0]);
        var aligned_b = this.helper.GetAligned(array[1]);

        return [ aligned_a, aligned_b ];
    };

    /**
     * 'Dispose'
     */
    p.dispose = function () {
        throw new Error("NOT MADE YET");
    };

    return BallController;
})();