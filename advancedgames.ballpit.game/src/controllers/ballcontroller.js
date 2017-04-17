var ballpit = ballpit || {};

ballpit.Event = ballpit.Event || {};
ballpit.Event.ON_BALL_ALIGN = "on_ball_align";
ballpit.Event.ON_BALLS_SPAWNED = "on_balls_spawned";

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
        this.rows = this.layer.tiledata;

        this.helper = new ballpit.BallHelper(this.layer, ballContainer);

        Listener.Listen(ballpit.Event.ON_BALL_ALIGN, this, this._onBallAlign.bind(this), this);
        Listener.Listen(ballpit.Event.ON_BALL_DESTINATION_REACHED, this, this._onBallDestinationReached.bind(this));
    }
    var p = BallController.prototype;

    /**
     * 'Initialize'
     * Method to Initialize the balls on the grid.
     * Use this method before you allow the player to move balls!
     */
    p.Initialize = function () {
        var len = this.layer.width;
        for (var x = 0; x < len; x++) {
            this.RestoreColumn(x);
        }
    };

    /**
     * 'Swap'
     * @param {TileModel} 'selected'.
     * @param {TileModel} 'targeted'.
     */
    p.Swap = function (selected, targeted) {
        if (selected === targeted) throw new Error("Can't swap the selected with the selected");

        // Get the occupiers of the selected tiles.
        var selected_occupier = selected.occupier;
        var targeted_occupier = targeted.occupier;

        // Swap the occupiers.
        selected.occupier = targeted_occupier;
        targeted.occupier = selected_occupier;

        // If the occupier exists- change the occupiedPosition also.
        if (selected_occupier) selected_occupier.MoveTo(targeted.position.Clone());
        if (targeted_occupier) targeted_occupier.MoveTo(selected.position.Clone());
    };

    /**
     * 'CanSwap'
     * @param {TileModel} 'tile'.
     */
    p.CanSwap = function (tile) {
        return (tile !== null && tile.occupier !== null);
    };

    /**
     * 'DropBall'
     * @param {TileModel} 'tile'.
     */
    p.DropBall = function (tile) {
        var lowest = this.helper.GetLowestBeneath(tile);

        if (tile !== lowest) {
            this.Swap(tile, lowest);
        }
    };

    /**
     * 'DropColumn'
     * @param {Int} 'tileX'.
     */
    p.DropColumn = function (tileX) {
        var len = this.rows.length;
        for (var y = len -1; y >= 0; y--) {
            var row = this.rows[y];

            var row_len = row.length;
            for (var x = 0; x < row_len ; x++) {
                if (x === tileX) {
                    var tile = row[x];

                    if (this.CanSwap(tile)) {
                        this.DropBall(tile);
                    }
                }
            }
        }
    };

    /**
     * 'RestoreColumn'
     * @param {Int} 'tileX'.
     */
    p.RestoreColumn = function (tileX) {
        var len = this.rows.length;
        for (var y = len -1; y >= 0; y--) {
            var row = this.rows[y];

            var row_len = row.length;
            for (var x = 0; x < row_len ; x++) {
                if (x === tileX) {
                    var tile = row[x];

                    if (this.CanSwap(tile) === false) {
                        var ball = this.ballContainer.AddRandomBall(tile.position.Clone());
                        tile.occupier = ball;
                    }
                }
            }
        }
    };

    /**
     * 'OnBallAlign'
     * @param { {} } 'caller'.
     * @param { {TileModel}: "owner", {TileModel[]}: "aligned" } 'params'.
     */
    p._onBallAlign = function (caller, params) {
        var tiles = params.aligned;
        var rowsAffected = [];
        tiles.push(params.owner);

        var len = tiles.length;
        for (var i = 0; i < len; i++) {
            var tile = tiles[i];
            var occupier = tile.occupier;

            this.ballContainer.RemoveBall(occupier);
            tiles[i].occupier = null;

            if (!rowsAffected.contains(tile.tileposition.x)) {
                rowsAffected.push(tile.tileposition.x);
            }
        }
        
        var col_len = rowsAffected.length;
        for (var j = 0; j < col_len; j++) {
            this.DropColumn(rowsAffected[j]);
            this.RestoreColumn(rowsAffected[j]);
        }
    };

    /**
     * 'OnBallDestinationReached'
     * @param { {} } 'caller'.
     * @param { {BallModel}: "ball" } 'params'.
     */
    p._onBallDestinationReached = function (caller, params) {
        var tile = this.layer.GetTileByOccupier(params.ball);
        var aligned = this.helper.GetAligned(tile);

        if (aligned.length > 0) {
            params.ball.beginning = null;
            Listener.Dispatch(ballpit.Event.ON_BALL_ALIGN, this, { "owner": tile, "aligned": aligned });
        } else {
            if (params.ball.isSwiped) {
                var other = params.ball.beginning.occupier;
                if (other.beginning !== null) {
                    if (other.closed === true) {
                        this._return(tile);
                    } else {
                        params.ball.closed = true;
                    }
                }
            }
        }
    };
    
    /**
     * 'Return'
     * @param {TileModel} 'tile'
     */
    p._return = function (tile) {
        var occupier = tile.occupier;
        var occupier_beginning = occupier.beginning;

        var other = occupier_beginning.occupier;
        var other_beginning = other.beginning;

        this.Swap(occupier_beginning, other_beginning);

        tile.occupier.beginning = null;
        occupier_beginning.occupier.beginning = null;

        occupier.closed = false;
        other.closed = false;
    };

    /**
     * 'Dispose'
     */
    p.dispose = function () {
        throw new Error("NOT MADE YET");
    };

    return BallController;
})();