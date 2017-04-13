var ballpit = ballpit || {};

ballpit.Event = ballpit.Event || {};
ballpit.Event.ON_BALL_SWAP = "on_ball_swap";
ballpit.Event.ON_BALL_ALIGN = "on_ball_align";
ballpit.Event.ON_BALL_REMOVED = "on_ball_removed";

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

        Listener.Listen(ballpit.Event.ON_BALL_SWAP, this, this._onBallSwap.bind(this), this);
        Listener.Listen(ballpit.Event.ON_BALL_ALIGN, this, this._onBallAlign.bind(this), this);
        Listener.Listen(ballpit.Event.ON_BALL_REMOVED, this, this._onBallRemove.bind(this), this);
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
     * 'Update'
     * @private
     */
    p._update = function () {
        var column_len = this.columns.length;
        for (var y = 0; y < column_len; y++) {
            var row = this.columns[y];

            var row_len = row.length;
            for (var x = 0; x < row_len; x++) {
                var tile = row[x];
                
                if (tile.occupier !== null) {
                    this.DropBall(tile);
                }
            }
        }
    };

    /**
     * 'Swap'
     * @param {TileModel} 'selected'.
     * @param {TileModel} 'targeted'.
     */
    p.Swap = function (selected, targeted) {
        this._swap(selected, targeted);
        Listener.Dispatch(ballpit.Event.ON_BALL_SWAP, this, { "selected": selected, "targeted": targeted });
    };

    /**
     * 'DropBall'
     * @param {TileModel} 'tile'.
     */
    p.DropBall = function (tile) {
        var lowest = this.helper.GetLowestBeneath(tile);
        this._swap(tile, lowest);
    };

    /**
     * 'CheckAlignment'
     * @return {Bool}
     * @param {TileModel} 'tile'.
     */
    p.CheckAlignment = function(tile) {
        var aligned = this.helper.GetAligned(tile);
        if (aligned.length === 0) return false; 

        Listener.Dispatch(ballpit.Event.ON_BALL_ALIGN, this, { "owner": tile, "aligned": aligned });
        return true;
    }

    /**
     * 'OnBallSwap'
     * @param { {} } 'caller'.
     * @param { {TileModel}: "selected", {TileModel}: "targeted" } 'params'.
     */
    p._onBallSwap = function (caller, params) {
        var select_aligned = this.CheckAlignment(params.selected);
        var target_aligned = this.CheckAlignment(params.targeted);

        // If the selected tile and targetted tile are not aligned.
        if (!select_aligned && !target_aligned) {
            // Swap the balls back.
            this._swap(params.selected, params.targeted);
            return;
        }
    };

    /**
     * 'OnBallAlign'
     * @param { {} } 'caller'.
     * @param { {TileModel}: "owner", {TileModel[]}: "aligned" } 'params'.
     */
    p._onBallAlign = function (caller, params) {
        var tiles = params.aligned;
        tiles.push(params.owner);

        var len = tiles.length;
        for (var i = 0; i < len; i++) {
            var tile = tiles[i];
            var occupier = tile.occupier;

            this.ballContainer.RemoveBall(occupier);
            tiles[i].occupier = null;

            Listener.Dispatch(ballpit.Event.ON_BALL_REMOVED, this, {"tile": tile});
        }

        this._update();
    };

    /**
     * 'OnBallRemove'
     * @param { {} } 'caller'.
     * @param { {TileModel}: "tile" } 'params'.
     */
    p._onBallRemove = function (caller, params) {
        /* Add new Balls. */
    };

    /**
     * 'Swap'
     * @private
     * @param {TileModel} 'selected'.
     * @param {TileModel} 'targeted'.
     */
    p._swap = function (selected, targeted) {
        // Get the occupiers of the selected tiles.
        var selected_occupier = selected.occupier;
        var targeted_occupier = targeted.occupier;

        // Swap the occupiers.
        selected.occupier = targeted_occupier;
        targeted.occupier = selected_occupier;

        // If the occupier exists- change the position also.
        if (selected_occupier) selected_occupier.position = targeted.position;
        if (targeted_occupier) targeted_occupier.position = selected.position;
    };

    /**
     * 'Dispose'
     */
    p.dispose = function () {
        throw new Error("NOT MADE YET");
    };

    return BallController;
})();