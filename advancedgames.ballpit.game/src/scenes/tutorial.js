/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var scene = scene || {};

scene.Names = scene.Names || {};
scene.Names.TUTORIAL = "Tutorial";

scene.Tutorial = (function () {

    /**
     * This is the Tutorial Scene. 
     * 
     * @class Tutorial
     * @extends scene.Game
     * @constructor
     */
    function Tutorial() {
        Phaser.Group.call(this, ADCore.phaser, null, "Tutorial");
        
        // Still needs to extend scene.Game. Not going to comment this part.

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

        this.interfaceLayer = new ballpit.InterfaceLayer(this.gameTimer, this.scoreHolder, this.coach);
        this.addChild(this.interfaceLayer);

        this.ballController.Initialize();

        this.selected = null;
        this.started = false;

        this.inTutorial = false;

        Input.paused = true;
        this.Initialize();

        Listener.Listen(ADCore.InputEvent.ON_TAP, this, this._onTap.bind(this));
        Listener.Listen(ADCore.InputEvent.ON_SWIPE, this, this._onSwipe.bind(this));
        Listener.Listen(ballpit.Event.ON_BALL_ALIGN, this, this._onBallAlign.bind(this));
    }
    Tutorial.prototype = Object.create(Phaser.Group.prototype);
    Tutorial.prototype.constructor = Tutorial; 
    var p = Tutorial.prototype;

    /**
     * @method Initialize
     * @memberof Tutorial
     */
    p.Initialize = function () {
        this.overlay = new ADCore.Interface(new Vector2(0,0), "tutorialoverlaygame");
        this.overlay.visible = false;
        this.addChild(this.overlay);

        this.bubble = new ballpit.Speech(new Vector2( 100,125), "tutorialbubble");
        this.addChild(this.bubble);

        this.bubble.Talk( "Hallo! Wilt u de tutorial volgen of wilt u de tutorial overslaan?", 2 );
        
        Listener.ListenOnce( ballpit.Event.ON_SPEECH_DONE, this, function () {
            this.followButton = new ADCore.Button(new Vector2(this.bubble.x + this.bubble.width * 0.1, this.bubble.y + 50), "tutorialchoice");
            this.followButton.onInputUp = function () {
                this.removeChild(this.followButton);
                this.removeChild(this.followText);
                this.removeChild(this.skipButton);
                this.removeChild(this.skipText);
                this.bubble.Talk("Verschuif naast elkaar gelegen ballen zodat deze van plek verwisselen.");
                
                Listener.ListenOnce( ballpit.Event.ON_SPEECH_DONE, this, function () {
                    this.overlay.visible = true;
                    this.inTutorial = true;
                    Input.paused = false;
                }.bind(this));
            }.bind(this);
            this.addChild(this.followButton);

            this.followText = new ADCore.Text().value("Volgen").font("comfortaa").finish();
            this.followText.x = this.followButton.x + 10;
            this.followText.y =  this.followButton.y + 5;
            this.followText.anchor.set(0, 0.5);
            this.addChild(this.followText);

            this.skipButton = new ADCore.Button(new Vector2(this.bubble.x + this.bubble.width * 0.55, this.bubble.y + 50), "tutorialchoice");
            this.skipButton.onInputUp = function () {
                Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.GAME });
            }.bind(this);
            this.addChild(this.skipButton);

            this.skipText = new ADCore.Text().value("Overslaan").font("comfortaa").finish();
            this.skipText.x = this.skipButton.x + 10;
            this.skipText.y =  this.skipButton.y + 5;
            this.skipText.anchor.set(0, 0.5);
            this.addChild(this.skipText);
        }.bind(this));
    };

    /**
     * @method Update
     * @memberof Tutorial
     * @public
     * @param {Integer} deltatime
     */
    p.Update = function (deltatime) {
        this.ballContainer.Update(deltatime);
    };

    /**
     * @method Render
     * @memberof Tutorial
     * @public
     */
    p.Render = function () {
        this.viewContainer.render();
        this.interfaceLayer.Render();
    };

    p._onTap = function (caller, params) {
        if (this.selected !== null) {
            var target = this.tilemap.mainLayer.GetTileByScreenPosition(params.position);
            this._trySwap(this.selected, target);
            this.selected = null;
        } else {
            this.selected = this.tilemap.mainLayer.GetTileByScreenPosition(params.position);
        }
    };

    p._onSwipe = function (caller, params) {
        var start =  this.tilemap.mainLayer.GetTileByScreenPosition(params.start);
        var end =  this.tilemap.mainLayer.GetTileByScreenPosition(params.end);
        this._trySwap(start, end);
    };

    p._onBallAlign = function (caller, params) {
        if (this.inTutorial === true) {
            this.inTutorial = false;
            this.overlay.visible = false;
            Input.paused = true;
            this.bubble.Talk( "Goed gedaan!", 2 );
            Listener.ListenOnce( ballpit.Event.ON_SPEECH_DONE, this, function () {
                this.bubble.Talk("Zorg er op deze manier voor dat je drie dezelfde ballen naast of boven elkaar plaatst. Hier krijg je punten voor.", 2);
        
                Listener.ListenOnce( ballpit.Event.ON_SPEECH_DONE, this, function () {
                    this.bubble.Talk("Voor een rij van vier of vijf dezelfde ballen krijg je zelfs meer punten!", 2);
                
                    Listener.ListenOnce( ballpit.Event.ON_SPEECH_DONE, this, function () {
                        this.bubble.Talk("Probeer zo veel mogelijk punten te scoren voordat de timer om is.", 2);
                        this.overlay.loadTexture("tutorialoverlaytimer",0);
                        this.overlay.visible = true;
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }

        var amount = params.aligned.length + 1; // + 1 = owner.
        var score = this.scoreHolder.CalculateScoreByAmountAligned(amount);
        this.scoreHolder.Add(score);
    };

    p._trySwap = function (current, target) {
        if (!current || !target ||  !current.neighbours.contains(target)) return;

        if (this.started === false) {
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
     * @method Dispose
     * @memberof Tutorial
     * @public
     */
    p.Dispose = function () {
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

    return Tutorial;
}());
