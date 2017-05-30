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

        /** @property {PauseSystem} */
        this.pauseSystem = new ADCore.PauseSystem();
	
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
            
            net.SAVE_HIGHSCORE.Send( { "name": "User", "score": this.scoreHolder.score} , function(result) {
                soundSystem.PlaySound("sound_timerdone", 1, false);
                setTimeout(function() {
                    this._onGameDone();
                }.bind(this), 1000);
            }.bind(this));
        }.bind(this), Settings.Game.TIME, 1);
        this.gameTimer.Stop();

        /** @property {ScoreHolder} */
        this.scoreHolder = new ballpit.ScoreHolder();

        /** @property {InterfaceLayer} */
        this.interfaceLayer = new ballpit.InterfaceLayer(this.gameTimer, this.scoreHolder, this.coach);
        this.addChild(this.interfaceLayer);

        /** @property {PopupContainer} */
        this.popupContainer = new ADCore.PopupContainer(this.pauseSystem);
        this.addChild(this.popupContainer);

        this.ballController.Initialize();

        /** @property {Vector2} */
        this.selected = null;

        /** @property {Vector2} */
        this.started = false;

        /** @property {TileLayer} */
        this.tileLayer = this.tilemap.GetLayerByName("tilelayer");

        // Put the input paused on false.
        Input.paused = false;

        // Play in-game music.
        this.music_identifier = soundSystem.PlayMusic("music_ingame", 1, true);

        // Time identifier
        this.time_identifier = null;

        Listener.Listen(ADCore.InputEvent.ON_TAP, this, this._onTap.bind(this));
        Listener.Listen(ADCore.InputEvent.ON_SWIPE, this, this._onSwipe.bind(this));
        Listener.Listen(ballpit.Event.ON_PAUSE_BUTTON_UP, this, this._onPauseButtonUp.bind(this));
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

        if (this.started) {
            if (Input.paused && this.gameTimer.timerStarted) {
                this.gameTimer.Stop();
            } else if (Input.paused === false && this.gameTimer.timerStarted === false) {
                this.gameTimer.Start();
            }
        }
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
            
            if (target) {
                soundSystem.PlaySound("sound_ballselect", 3, false);
                if (this.selected.neighbours.contains(target)) {
                    if (this.selected !== target) {
                        this._trySwap(this.selected, target);
                    }
                } else {
                    this.UnselectTile(this.selected);
                    this.selected = null;

                    this._onTap(caller, params);
                    return;
                }
            }

            this.UnselectTile(this.selected);
            this.selected = null;
        } else {
            this.selected = this.tilemap.mainLayer.GetTileByScreenPosition(params.position);

            if (this.selected) { 
                this.SelectTile(this.selected);
                soundSystem.PlaySound("sound_ballselect", 3, false);
            }
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
        
        if (!start) return;
        var end = this.tilemap.mainLayer.GetNeighbourFromTileByDirection( start, params.direction );
        this._trySwap(start, end);

        if (this.selected) {
            this.UnselectTile(this.selected);
            this.selected = null;
        }
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

        var type = params.owner.occupier.type;
        var task = this.coach.activeTask;

        if (task && type === task.type) {
            var tiles = params.aligned.slice();
            tiles.push(params.owner);
            this._createBallEffectByTiles(tiles);
        }
    };

    /**
     * @method SelectTile
     * @memberof Game 
     * @public
     */
    p.SelectTile = function(tile) {
        var antitype = this.tileLayer.GetTileByTilePosition(tile.tileposition.Clone());

        var glow = new ADCore.Interface(new Vector2(0,0), "fx_ball_select");
        glow.Play("spark", 30, true);
        antitype.effect = glow;
    };

    /**
     * @method UnselectTile
     * @memberof Game 
     * @public
     */
    p.UnselectTile = function(tile) {
        var antitype = this.tileLayer.GetTileByTilePosition(tile.tileposition.Clone());
        antitype.effect = null;
    };

    /**
     * @method _CreateBallEffectByTiles
     * @memberof Game
     * @private
     * @param {Array} tiles
     */
    p._createBallEffectByTiles = function (tiles) {
        var destination = this.interfaceLayer.taskboard.effectLocation;
        var len = tiles.length;
        
        for (var i = len - 1; i >= 0; i--) {
            var tile = tiles[i];
            var ball = tile.occupier;

            this.ballContainer.AddBallEffect(ball.position, ball.type, destination);
        }
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

        this._checkGameTimer();

        if (this.ballController.CanSwap(current, target)) {
            soundSystem.PlaySound("sound_combinationcorrect", 3, false);

            current.occupier.beginning = current;
            target.occupier.beginning = target;

            this.ballController.Swap(current, target);
        } else if (this.ballController.CanMove(target)){
            soundSystem.PlaySound("sound_combinationerror", 1, false);

            var current_dir = target.position.Clone().Substract(current.position);
            current_dir = current_dir.Normalize();
            
            var target_dir = current.position.Clone().Substract(target.position);
            target_dir = target_dir.Normalize();

            Listener.Dispatch(ballpit.Event.ON_BALL_SWAP_WRONG, current.occupier, { "direction": current_dir });
            Listener.Dispatch(ballpit.Event.ON_BALL_SWAP_WRONG, target.occupier, {"direction": target_dir});
        }
    };

    /**
     * @method _CheckGameTimer
     * @memberof Game
     * @private
     */
    p._checkGameTimer = function() {
        if (this.started === false) {
            this.coach.Start();
            this.gameTimer.Start();
            this.started = true;
            this.time_identifier = soundSystem.PlaySound("sound_timertick", 1, true);
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
        this.gameTimer.multiplier = 1;
        this.gameTimer.Add(Settings.Game.TIME_BACK_AFTER_COMBO);
    };

    /**
     * @method _OnPauseButtonUp
     * @memberof Game
     * @private
     * @param {Object} caller
     * @param {Object} params
     * @ignore 
     */
    p._onPauseButtonUp = function(caller, params) {
        var pausePopup = new ballpit.PausePopup( this._onPauseInput.bind(this) );
        this.popupContainer.DisplayPopup( pausePopup );
    };

    /**
     * @method _OnPauseInput
     * @memberof Game
     * @private
     * @param {PauseInputs} input
     * @ignore 
     */
    p._onPauseInput = function(input) {
        switch ( input ) {
            case ballpit.PauseInputs.PLAY:
                this.popupContainer.ConcealPopup();
                break;

            case ballpit.PauseInputs.OPTIONS:
                var optionsPopup = new ballpit.OptionsPopup( soundSystem, this._onOptionsInput.bind(this) );
                this.popupContainer.DisplayPopup( optionsPopup );
                break;

            case ballpit.PauseInputs.MENU:
                this.popupContainer.ConcealAllPopups(function () {
                    Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.MAINMENU });
                });
                break;
        } 
    };

    /**
     * @method _OnOptionsInput
     * @memberof Game
     * @private
     * @param {PauseInputs} input
     * @ignore 
     */
    p._onOptionsInput = function(input) {
        switch ( input ) {
            case ballpit.OptionsInputs.PLAY:
                this.popupContainer.ConcealAllPopups();
                break;

            case ballpit.OptionsInputs.MENU:
                this.popupContainer.ConcealAllPopups(function () {
                    Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.MAINMENU });
                });
                break;  

            case ballpit.OptionsInputs.REDO:
                this.popupContainer.ConcealAllPopups(function () {
                    Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.GAME });
                });
                break;

            case ballpit.OptionsInputs.CROSS:
                this.popupContainer.ConcealPopup();
                break;

            case ballpit.OptionsInputs.HIGHSCORE:
                this.popupContainer.ConcealAllPopups(function () {
                    Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.HIGHSCORE });
                });
                break;
        }
    };

    /**
     * @method _OnGameDone
     * @memberof Game
     * @private
     */
    p._onGameDone = function(){
        var finishPopup = new ballpit.FinishPopup( this._onEndgameInput.bind(this), this.gameTimer,this.coach,this.scoreHolder);
        this.popupContainer.DisplayPopup( finishPopup );
    };

    /**
     * @method _OnEndgameInput
     * @memberof Game
     * @private
     * @param {FinishInputs} input
     * @ignore 
     */
    p._onEndgameInput = function(input){
        switch(input){
             case ballpit.FinishInputs.CROSS:
                this.popupContainer.ConcealAllPopups(function () {
                    Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.MAINMENU });
                });
                break;
            case ballpit.FinishInputs.HIGHSCORE:
                this.popupContainer.ConcealAllPopups(function () {
                    Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.HIGHSCORE });
                });
                break;
            case ballpit.FinishInputs.REDO:
                this.popupContainer.ConcealAllPopups(function () {
                    Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.GAME });
                });
                break;
        }
    };

    /**
     * @method Dispose
     * @memberof Game
     * @public
     */
    p.Dispose = function () {
        this.music_identifier.audio.pause();
        if (this.time_identifier) this.time_identifier.audio.pause();

        this.tilemap.Dispose();
        delete this.tilemap;

        this.ballContainer.Dispose();
        delete this.ballContainer;

        this.ballController.Dispose();
        delete this.ballController;

        delete this.swipePositions;

       this.interfaceLayer.Dispose();
       this.removeChild(this.interfaceLayer);
       delete this.interfaceLayer;

        this.viewContainer.Dispose();
        this.removeChild(this.viewContainer);
        delete this.viewContainer;
        
        Listener.Mute(ADCore.InputEvent.ON_TAP, this);
        Listener.Mute(ADCore.InputEvent.ON_SWIPE, this);
        Listener.Mute(ballpit.Event.ON_PAUSE_BUTTON_UP, this);
        Listener.Mute(ballpit.Event.ON_BALL_ALIGN, this);
        Listener.Mute(ballpit.Event.ON_STAGE_BEGIN, this);
        Listener.Mute(ballpit.Event.ON_STAGE_DONE, this);
    };

    return Game;
}());
