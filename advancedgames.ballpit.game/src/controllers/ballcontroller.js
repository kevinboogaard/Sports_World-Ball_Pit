var ballpit = ballpit || {};

ballpit.Event = ballpit.Event || {};
ballpit.Event.ON_BALL_ALIGN = "on_ball_align";
ballpit.Event.ON_BALLS_SPAWNED = "on_balls_spawned";

ballpit.BallController = (function () {

    /**'
     * 'BallController'
     * @param {TileLayer} 'layer'
     * @param {BallContainer} 'ballcontainer'
     */
    function BallController(layer, ballContainer) {
        this._layer = layer;
        this._ballContainer = ballContainer;

        this._rows = this._layer.tiledata;
        this._helper = new ballpit.BallHelper(this._layer, this._ballContainer);

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
        var len = this._layer.width;
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

        selected_occupier.beginning = selected;
        targeted_occupier.beginning = targeted;

        // Change the position of the balls also.
        if (selected_occupier) selected_occupier.SwapTo(targeted.position);
        if (targeted_occupier) targeted_occupier.SwapTo(selected.position);
    };

    /**
     * 'Move'
     * @param {TileModel} 'selected'.
     * @param {TileModel} 'targeted'.
     */
    p.Move = function (selected, targeted) {
        if (selected === targeted) throw new Error("Can't swap the selected with the selected");

        // Get the occupiers of the selected tiles.
        var selected_occupier = selected.occupier;
        var targeted_occupier = targeted.occupier;

        // Swap the occupiers.
        selected.occupier = targeted_occupier;
        targeted.occupier = selected_occupier;

        // Change the position of the balls also.
        if (selected_occupier) selected_occupier.MoveTo(targeted.position);
        if (targeted_occupier) targeted_occupier.MoveTo(selected.position);
    };

    /**
     * 'DropColumn'
     * @param {Int} 'tileX'.
     */
    p.DropColumn = function (tileX) {
        var len = this._rows.length;
        for (var y = len -1; y >= 0; y--) {
            var row = this._rows[y];

            var row_len = row.length;
            for (var x = 0; x < row_len ; x++) {
                if (x === tileX) {
                    var tile = row[x];

                    if (this.CanMove(tile)) {
                        this.DropBall(tile);
                    }
                }
            }
        }
    };

    /**
     * 'DropBall'
     * @param {TileModel} 'tile'.
     */
    p.DropBall = function (tile) {
        var lowest = this._helper.GetLowestBeneath(tile);

        if (tile !== lowest) {
            tile.occupier.state = ballpit.BallStates.FALLING;
            this.Move(tile, lowest);
        }
    };
    
    /**
     * 'RestoreColumn'
     * @param {Int} 'tileX'.
     */
    p.RestoreColumn = function (tileX) {
        var y_spawns = [];

        var len = this._rows.length;
        for (var y = len -1; y >= 0; y--) {
            var row = this._rows[y];

            var row_len = row.length;
            for (var x = 0; x < row_len ; x++) {
                if (!y_spawns[x]) y_spawns[x] = -1;
                
                if (x === tileX) {
                    var tile = row[x];

                    if (this.CanMove(tile) === false) {
                        var position = this._layer.TilePositionToScreenPosition(new Vector2(tile.tileposition.x,  y_spawns[x]));
                        y_spawns[x]--;

                        var ball = this._ballContainer.AddRandomBall(position);
                        tile.occupier = ball;

                        ball.MoveTo(tile.position);
                        ball.state = ballpit.BallStates.FALLING;
                    }
                }
            }
        }
    };
   
    p.CanMove = function (tile) {
        return (tile !== null && tile.occupier instanceof ballpit.BallModel);
    };

    /**
     * 'CanSwap'
     * @param {TileModel} 'tile'.
     * @param {TileModel} 'target'.
     */
    p.CanSwap = function (tile, target) {
         if (!this.CanMove(tile) || !this.CanMove(target)) return false;

        var ball_current = tile.occupier;
        var ball_target = target.occupier;
        
        tile.occupier = ball_target;
        target.occupier = ball_current;
         
        var tile_aligned = this._helper.GetAligned(tile);
        var target_aligned = this._helper.GetAligned(target);

        tile.occupier = ball_current;
        target.occupier = ball_target;

        if (tile_aligned.length === 0 && target_aligned.length === 0) return false;
        else return true;
    };

    /**
     * 'OnBallDestinationReached'
     * @param { {} } 'caller'.
     * @param { {BallModel}: "ball" } 'params'.
     */
    p._onBallDestinationReached = function (caller, params) {
        var tile_current = this._layer.GetTileByOccupier(params.ball);
        var ball_current = params.ball;

        ball_current.position = tile_current.position.Clone();
        ball_current.state = ballpit.BallStates.IDLING; 
            
        var aligned = this._helper.GetAligned(tile_current, ball_current.type);
        if (aligned.length > 0) {
            Listener.Dispatch(ballpit.Event.ON_BALL_ALIGN, this, { "owner": tile_current, "aligned": aligned });
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

            this._ballContainer.RemoveBall(occupier);
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
     * 'Dispose'
     */
    p.dispose = function () {
        throw new Error("NOT MADE YET");
    };

    return BallController;
})();