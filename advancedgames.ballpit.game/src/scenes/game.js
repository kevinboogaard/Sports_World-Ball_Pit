var scene = scene || {};

scene.Names = scene.Names || {};
scene.Names.GAME = "Game";

scene.Game = (function () {

    /**
     * 'Game'
     */
    function Game() {
        Phaser.Group.call(this, ADCore.phaser, null, "Game");
        this.viewContainer = new ADCore.ViewContainer();
        this.addChild(this.viewContainer);

        this.tilemap = new Tilemap(Global.Loaded.level.map);
        
        this.taskHandler = new ballpit.TaskHandler(Global.Loaded.level.tasks);

        this.ballContainer = new ballpit.BallContainer();
        this.ballController = new ballpit.BallController(this.tilemap.mainLayer, this.ballContainer);

        this.coach = ballpit.EntityFactory.AddCoach(new Vector2( Config.Core.Dimensions.width / 2, Config.Core.Dimensions.height * 0.33), "soccer", this.taskHandler);

        this.gameTimer = SetTimer(function () {
            console.log("GAME DONE!");
        }, Settings.Game.TIME, 0);
        this.gameTimer.Stop();

        this.scoreHolder = new ballpit.ScoreHolder();

        this.interfaceLayer = new ballpit.InterfaceLayer(this.gameTimer, this.scoreHolder);
        this.addChild(this.interfaceLayer);

        this.ballController.Initialize();

        this.selected = null;
        this.started = false;

        Listener.Listen(ADCore.InputEvent.ON_TAP, this, this._onTap.bind(this));
        Listener.Listen(ADCore.InputEvent.ON_SWIPE, this, this._onSwipe.bind(this));
        Listener.Listen(ballpit.Event.ON_BALL_ALIGN, this, this._onBallAlign.bind(this));
    }
    Game.prototype = Object.create(Phaser.Group.prototype);
    Game.prototype.constructor = Game; 
    var p = Game.prototype;

    /**
     * 'Update'
     * @param {int 'deltatime'
     */
    p.Update = function (deltatime) {
        this.ballContainer.Update(deltatime);
    };

    /**
     * 'Render'
     */
    p.Render = function () {
        this.viewContainer.render();
        this.interfaceLayer.Render();
    };

    /**
     * 'OnTap'
     * @param {{}} 'caller'
     * @param {{ {{}}: event, {Vector2}: position }} 'params'
     */
    p._onTap = function (caller, params) {
        if (this.selected !== null) {
            var target = this.tilemap.mainLayer.GetTileByScreenPosition(params.position);
            this._trySwap(this.selected, target);
            this.selected = null;
        } else {
            this.selected = this.tilemap.mainLayer.GetTileByScreenPosition(params.position);
        }
    };

    /**
     * 'OnSwipe'
     * @param {{}} 'caller'
     * @param {{ {{}}: event, {Vector2}: start, {Vector2}: end }} 'params'
     */
    p._onSwipe = function (caller, params) {
        var start =  this.tilemap.mainLayer.GetTileByScreenPosition(params.start);
        var end =  this.tilemap.mainLayer.GetTileByScreenPosition(params.end);
        this._trySwap(start, end);
    };

    /**
     * @method OnBallAlign
     * @private
     * @param {Object} caller
     * @param {Object} params
     * @param {TileModel} params.owner
     * @param {Array} params.aligned
     * @ignore
     */
    p._onBallAlign = function (caller, params) {
        var amount = params.aligned.length + 1; // + 1 = owner.
        var score = this.scoreHolder.CalculateScoreByAmountAligned(amount);
        this.scoreHolder.Add(score);
    };

    /**
     * 'TrySwap'
     * @param {TileModel} 'current'
     * @param {TileModel} 'target'
     */
    p._trySwap = function (current, target) {
        if (!current || !target ||  !current.neighbours.contains(target)) return;

        if (this.started === false) {
            this.coach.Start();
            this.gameTimer.Start();
            this.started = true;
        } 

        if (this.ballController.CanSwap(current, target)) {
            current.occupier.beginning = current;
            target.occupier.beginning = target;

            this.ballController.Swap(current, target);
        } else if (this.ballController.CanMove(target)){
            Listener.Dispatch(ballpit.Event.ON_BALL_SWAP_WRONG, current);
            Listener.Dispatch(ballpit.Event.ON_BALL_SWAP_WRONG, target);
        }
    };

    /**
     * 'Dispose'
     */
    p.Dispose = function () {
        this.viewContainer.Dispose();
        this.removeChild(this.viewContainer);
        delete this.viewContainer;

        this.tilemap.Dispose();
        delete this.tilemap;

        this.ballContainer.Dispose();
        delete this.ballContainer;

        this.ballController.Dispose();
        delete this.ballController;
        
        delete this.swipePositions;
    };

    return Game;
}());
