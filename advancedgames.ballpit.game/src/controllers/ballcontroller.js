/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

/**
 * Enum for ball events.
 * @readonly
 * @enum {String}
 * @typedef {(String)} events
 */
ballpit.Event = ballpit.Event || {};
ballpit.Event.ON_BALL_ALIGN = "on_ball_align";
ballpit.Event.ON_BALLS_SPAWNED = "on_balls_spawned";

ballpit.BallController = (function () {

     /**
     * @class BallController
     * @constructor
     * @param {layer} layer - The layers
     * @param {ballContainer} ballContainer - The ball controller
     */
    function BallController(layer, ballContainer) {
                
        /**
        * @property {layer} layer - The layers
        * @public
        */
        this._layer = layer;

        /**
        * @property {ballContainer} ballContainer - The ball controller
        * @private
        */
        this._ballContainer = ballContainer;

        /**
        * @property {rows} rows - The tile row
        * @private
        */
        this._rows = this._layer.tiledata;

        /**
        * @property {helper} helper - The helper 
        * @private
        */
        this._helper = new ballpit.BallHelper(this._layer, this._ballContainer);

        Listener.Listen(ballpit.Event.ON_BALL_ALIGN, this, this._onBallAlign.bind(this), this);
        Listener.Listen(ballpit.Event.ON_BALL_DESTINATION_REACHED, this, this._onBallDestinationReached.bind(this));
    }
    var p = BallController.prototype;

     /**
     * @method Initialize
     * @memberof BallController
     * @public
     */
    p.Initialize = function () {
        var len = this._layer.width;
        for (var x = 0; x < len; x++) {
            this.RestoreColumn(x, true);
        }
    };
    
     /**
     * @method Swap
     * @memberof BallController
     * @public
     * @param {Tile} selected - the selected tile
     * @param {Tile} targeted - the target tile
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
     * @method Move
     * @memberof BallController
     * @public
     * @param {Tile} selected - the selected tile
     * @param {Tile} targeted - the target tile
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
     * @method DropColumn
     * @memberof BallController
     * @public
     * @param {number} tileX - the horizontal of the tile
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
     * @method DropBall
     * @memberof BallController
     * @public
     * @param {Tile} tile - The tile
     */
    p.DropBall = function (tile) {
        var lowest = this._helper.GetLowestBeneath(tile);

        if (tile !== lowest) {
            tile.occupier.state = ballpit.BallStates.FALLING;
            this.Move(tile, lowest);
        }
    };
     /**
     * @method DropBall
     * @memberof BallController
     * @public
     * @param {number} tileX -  the horizontal of the tile
     */
    p.RestoreColumn = function (tileX, forceType) {
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

                        var ball = null;
                        var type = tile.properties.type || "random";

                        if (forceType !== true) type = "random";

                        if (type === "random") {
                            ball = this._ballContainer.AddRandomBall(position);
                        } else {
                            ball = this._ballContainer.AddBall(position, type);
                        }
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
     * @method OnBallDestinationReached
     * @memberof BallController
     * @private
     * @param {caller} caller -  the caller
     * @param {params} params -  the params
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
     * @method OnBallAlign
     * @memberof BallController
     * @private
     * @param {caller} caller -  the caller
     * @param {params} params -  the params
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
     * @method Dispose
     * @memberof BallController
     * @public
     */
    p.Dispose = function () {
        delete this._layer;
        delete this._ballContainer;

        delete this._rows;

        this._helper.Dispose();
        delete this._helper;
        
        Listener.Mute(ballpit.Event.ON_BALL_ALIGN, this);
        Listener.Mute(ballpit.Event.ON_BALL_DESTINATION_REACHED, this);
    
    };

    return BallController;
})();