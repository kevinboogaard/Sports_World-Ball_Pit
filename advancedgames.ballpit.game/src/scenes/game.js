/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var scene = scene || {};

scene.Names = scene.Names || {};
scene.Names.GAME = "Game";

scene.Game = (function () {

    /**
     * This is the Game Scene. The main scene for the game.
     * 
     * @class Game
     * @extends Phaser.Group
     * @constructor
     */
    function Game() {
        Phaser.Group.call(this, ADCore.phaser, null, "Game");   
        
        /** @property {ViewContainer} */
        this.viewContainer = new ADCore.ViewContainer();
        this.addChild(this.viewContainer);

        // Play in-game music.
        this.identifier = soundSystem.PlayMusic("ingamesound", 1, true);
	
        /** @property {Tilemap} */
        this.tilemap = new Tilemap(Global.Loaded.level.map);
    
        /** @property {TaskHandler} */    
        this.taskHandler = new ballpit.TaskHandler(Global.Loaded.level.tasks);

        /** @property {BallContainer} */
        this.ballContainer = new ballpit.BallContainer();

        /** @property {BallController} */
        this.ballController = new ballpit.BallController(this.tilemap.mainLayer, this.ballContainer);

        /** @property {CoachModel} */
        this.coach = ballpit.EntityFactory.AddCoach(new Vector2( Config.Core.Dimensions.width * 0.8, Config.Core.Dimensions.height * 0.33), "soccer", this.taskHandler);

        /** @property {Timer} */
        this.gameTimer = SetTimer(function () {
            Input.paused = true;
            setTimeout(function() {
                Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.MAINMENU });
            }.bind(this), 10000);
        }, Settings.Game.TIME, 1);
        this.gameTimer.Stop();

        /** @property {ScoreHolder} */
        this.scoreHolder = new ballpit.ScoreHolder();

        /** @property {InterfaceLayer} */
        this.interfaceLayer = new ballpit.InterfaceLayer(this.gameTimer, this.scoreHolder, this.coach);
        this.addChild(this.interfaceLayer);

        this.ballController.Initialize();

        /** @property {Vector2} */
        this.selected = null;

        /** @property {Vector2} */
        this.started = false;

        Input.paused = false;

        Listener.Listen(ADCore.InputEvent.ON_TAP, this, this._onTap.bind(this));
        Listener.Listen(ADCore.InputEvent.ON_SWIPE, this, this._onSwipe.bind(this));
        Listener.Listen(ballpit.Event.ON_BALL_ALIGN, this, this._onBallAlign.bind(this));
        Listener.Listen(ballpit.Event.ON_STAGE_BEGIN, this, this._onStageBegin.bind(this));
        Listener.Listen(ballpit.Event.ON_STAGE_DONE, this, this._onStageDone.bind(this));
    }
    Game.prototype = Object.create(Phaser.Group.prototype);
    Game.prototype.constructor = Game; 
    var p = Game.prototype;

    /**
     * @method Update
     * @memberof Game
     * @public
     * @param {Integer} deltatime
     */
    p.Update = function (deltatime) {
        this.ballContainer.Update(deltatime);
    };

    /**
     * @method Render
     * @memberof Game
     * @public
     */
    p.Render = function () {
        this.viewContainer.Render();
        this.interfaceLayer.Render();
    };

    /**
     * @method _OnTap
     * @memberof Game 
     * @private
     * @param {Object} caller
     * @param {Object} params
     * @param {Phaser.Event} params.event
     * @param {Vector2} params.position
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
     * @method _OnSwipe
     * @memberof Game 
     * @private
     * @param {Object} caller
     * @param {Object} params
     * @param {Phaser.Event} params.event
     * @param {Vector2} params.start
     * @param {Vector2} params.direction
     */
    p._onSwipe = function (caller, params) {
        var start =  this.tilemap.mainLayer.GetTileByScreenPosition(params.start);
        var end = this.tilemap.mainLayer.GetNeighbourFromTileByDirection( start, params.direction );
        this._trySwap(start, end);
    };

    /**
     * @method OnBallAlign
     * @memberof Game
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
     * @method _TrySwap
     * @memberof Game
     * @private
     * @param {TileModel} current
     * @param {TileModel} target
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
            Listener.Dispatch(ballpit.Event.ON_BALL_SWAP_WRONG, current.occupier);
            Listener.Dispatch(ballpit.Event.ON_BALL_SWAP_WRONG, target.occupier);
        }
    };

    /**
     * @method _OnStageBegin
     * @memberof Game
     * @private
     * @param {Object} caller
     * @param {Object} params
     * @ignore 
     */
    p._onStageBegin = function (caller, params) {
        this.interfaceLayer.watch.text.tint = 0xFF0000;
        this.gameTimer.multiplier = 2;
    };

    /**
     * @method _OnStageDone
     * @memberof Game
     * @private
     * @param {Object} caller
     * @param {Object} params
     * @ignore 
     */
    p._onStageDone = function (caller, params) {
        this.interfaceLayer.watch.text.tint = 0xFFFFFF;
        this.gameTimer.multiplier = 1;
        this.gameTimer.Add(20);
    };

    /**
     * @method Dispose
     * @memberof Game
     * @public
     */
    p.Dispose = function () {
        this.identifier.stop.audio.pause();

        this.tilemap.Dispose();
        delete this.tilemap;

        this.ballContainer.Dispose();
        delete this.ballContainer;

        this.ballController.Dispose();
        delete this.ballController;

        delete this.swipePositions;

        this.viewContainer.Dispose();
        this.removeChild(this.viewContainer);
        delete this.viewContainer;
        
        Listener.Mute(ADCore.InputEvent.ON_TAP, this);
        Listener.Mute(ADCore.InputEvent.ON_SWIPE, this);
        Listener.Mute(ballpit.Event.ON_BALL_ALIGN, this);
    };

    return Game;
}());
