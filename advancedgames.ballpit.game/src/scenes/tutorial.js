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
        scene.Game.call(this);
        
        /** @property {Overlay} */
        this.overlay = new ballpit.Overlay(0x000000, 0.7);
        this.addChild(this.overlay);

        /** @property {Interface} */
        this.chatCloud = new ballpit.Speech(new Vector2(40, 100), "tut_bubble", 6);
        this.chatCloud.alpha = 0.01;
        this.overlay.addChild(this.chatCloud);

        /** @property {Interface} */
        this.trainer = new ADCore.Interface(new Vector2(this.chatCloud.x + this.chatCloud.width, this.chatCloud.y), "tut_trainer");
        this.trainer.alpha = 0.01;
        this.overlay.addChild(this.trainer);

        /** @property {Button} */
        this.acceptButton = null;

        /** @property {Button} */
        this.rejectButton = null;

        /** @property {Boolean} */
        this.inTutorial = true;

        /** @property {Integer} */
        this.tutorialCount = 0;

        /** @property {Array} */
        this.timeouts = [];

       this.gameTimer.callback = function () {
            Input.paused = true;
            setTimeout(function() {
                soundSystem.PlaySound("sound_timerdone", 1, false);
                Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.GAME, "levelUp": true });
            }.bind(this), 1000);
        }.bind(this);

        Input.paused = true;

        setTimeout( function () { 
            this.SwitchExplanation();
        }.bind(this), 1000);
    }
    Tutorial.prototype = Object.create(scene.Game.prototype);
    Tutorial.prototype.constructor = Tutorial; 
    var p = Tutorial.prototype;

    /**
     * @method SwitchExplanation
     * @memberof Tutorial
     * @public
     */
    p.SwitchExplanation = function () {
        this.__clearTimeoutList();

        switch(this.tutorialCount) {
            case 0:
                this.AskForTutorial();
                break;

            case 1: 
                this.ExplainCombination();
                break;

            case 2:
                this.ExplainTimer();
                break;

            case 3: 
                this.ExplainInfobar();
                break;

            case 4:
                this.ExplainCoach();
                break;

            case 5: 
                this.StartGame();
                break;
        }
    };

    /**
     * @method AskForTutorial
     * @memberof Tutorial
     * @public
     */
    p.AskForTutorial = function() {
        // Accept / Reject tutorial
        this.overlay.TransitionIn(function () {

            this.acceptButton = new ADCore.Button(new Vector2(this.chatCloud.x + this.chatCloud.width / 2, this.chatCloud.y + this.chatCloud.height), "tut_v_button");
            this.acceptButton.anchor.set(0.5, 0.5);
            this.acceptButton.x += this.acceptButton.width / 2;
            this.acceptButton.y += this.acceptButton.height / 2;
            this.acceptButton.scale.set(0, 0);
            this.acceptButton.onInputUp = function () {
                this.ClearAskForTutorial(function () {
                    this.tutorialCount++;
                    this.SwitchExplanation();
                }.bind(this));
            }.bind(this);
            this.overlay.addChild(this.acceptButton);

            this.rejectButton = new ADCore.Button(new Vector2(this.chatCloud.x + this.chatCloud.width / 2, this.chatCloud.y + this.chatCloud.height), "tut_x_button");
            this.rejectButton.anchor.set(0.5, 0.5);
            this.rejectButton.x -= this.rejectButton.width / 2;
            this.rejectButton.y += this.rejectButton.height / 2;
            this.rejectButton.scale.set(0, 0);        
            this.rejectButton.onInputUp = function () {
                this.ClearAskForTutorial(function () {
                    Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.GAME, "levelUp": true });
                }.bind(this));
            }.bind(this);
            this.overlay.addChild(this.rejectButton);

            TweenLite.to(this.trainer, 0.5, { alpha: 1, onComplete: function () { 
                TweenLite.to(this.chatCloud, 0.5, { alpha: 1, onComplete: function () { 
                    this.trainer.Play("talk", 30, true);
                    this.chatCloud.Talk("Wilt u de tutorial spelen?", 30, function () {
                        this.trainer.Play("idle", 30, true);
                        TweenLite.to(this.rejectButton.scale, 0.5, { x: 1, y: 1 });
                        TweenLite.to(this.acceptButton.scale, 0.5, { x: 1, y: 1 });
                    }.bind(this));
                }.bind(this)});
            }.bind(this)});
        }.bind(this));
    };
    
    /**
     * @method ClearAskForTutorial
     * @memberof Tutorial
     * @public
     * @param {Function} callback
     */
    p.ClearAskForTutorial = function (callback) {
        this.acceptButton.onInputUp = null;
        this.rejectButton.onInputUp = null;

        TweenLite.to(this.rejectButton.scale, 0.5, { x: 0, y: 0 });
        TweenLite.to(this.acceptButton.scale, 0.5, { x: 0, y: 0 });

        this.overlay.Clear();
        this.overlay.Draw();

         this.chatCloud.Clear();
        TweenLite.to(this.chatCloud, 0.5, { alpha: 0, onComplete: function () {
            callback();
        }.bind(this)});
    };

    /**
     * @method ExplainCombination
     * @memberof Tutorial
     * @public
     */
    p.ExplainCombination = function () { 
        TweenLite.to(this.chatCloud, 0.5, { alpha: 1, onComplete: function () {
            this.trainer.Play("talk", 30, true);
            this.chatCloud.Talk("Verschuif naast elkaar gelegen ballen zodat deze van plek verwisselen.", 30, function () {
                this.overlay.Clear();

                // First combination tutorial
                var tileWidth = this.tilemap.tilewidth;
                var tileHeight = this.tilemap.tileheight;
                var tile_1 = this.tilemap.mainLayer.GetTileByTilePosition(new Vector2(4, 1));
                this.overlay.ExcludeRect({ position: { x: tile_1.x, y: tile_1.y }, dimensions: { width: tileWidth, height: tileHeight } });
                var tile_2 = this.tilemap.mainLayer.GetTileByTilePosition(new Vector2(3, 1));
                this.overlay.ExcludeRect({ position: { x: tile_2.x, y: tile_2.y }, dimensions: { width: tileWidth, height: tileHeight } });
                var tile_3 = this.tilemap.mainLayer.GetTileByTilePosition(new Vector2(3, 2));
                this.overlay.ExcludeRect({ position: { x: tile_3.x, y: tile_3.y }, dimensions: { width: tileWidth, height: tileHeight } });
                var tile_4 = this.tilemap.mainLayer.GetTileByTilePosition(new Vector2(3, 3));
                this.overlay.ExcludeRect({ position: { x: tile_4.x, y: tile_4.y }, dimensions: { width: tileWidth, height: tileHeight } });
                this.overlay.Draw();

                Input.paused = false;
                this.timeouts.push(setTimeout( function () { 
                    this.chatCloud.Talk("Zorg er op deze manier voor dat je drie dezelfde ballen naast of boven elkaar plaatst. Hier krijg je punten voor.", 30, function () {
                        this.timeouts.push(setTimeout( function () { 
                            this.chatCloud.Talk("Voor een rij van vier of vijf dezelfde ballen krijg je zelfs meer punten!", 30, function () {
                                this.trainer.Play("idle", 30, true);
                            }.bind(this));
                        }.bind(this), 3000));
                    }.bind(this));
                }.bind(this), 2000));
            }.bind(this));
        }.bind(this)});
    };

    /**
     * @method ExplainTimer
     * @memberof Tutorial
     * @public
     */
    p.ExplainTimer = function () {
        TweenLite.to(this.chatCloud, 0.5, { alpha: 1, onComplete: function () {
            // Timer tutorial
            var timebar = this.interfaceLayer.timeBarBackground;
            this.overlay.Clear();
            this.overlay.ExcludeRect({ position: { x: timebar.x - 5, y: timebar.y - 5 - (timebar.height / 2) }, dimensions: { width: timebar.width + 10, height: timebar.height + 10 } });
            this.overlay.Draw();

            this.trainer.Play("talk", 30, true);
            this.chatCloud.Talk("Dit is de timer, hier kun je zien hoeveel tijd je nog over hebt.", 30, function () {
                this.trainer.Play("idle", 30, true);

                this.gameTimer.Start();
                this.gameTimer.multiplier = 20;
                this.timeouts.push(setTimeout( function () {
                    this.gameTimer.multiplier = -20;
                    this.timeouts.push(setTimeout( function () {
                        TweenLite.to(this.chatCloud, 0.5, { alpha: 0, onComplete: function () { 
                            this.chatCloud.Clear();

                            this.overlay.Clear();
                            this.overlay.Draw();

                            this.timeouts.push(setTimeout(function () {
                                this.tutorialCount++;
                                this.SwitchExplanation();
                            }.bind(this), 1000));
                        }.bind(this) });
                    }.bind(this), 2000));
                }.bind(this), 2000));
            }.bind(this));
        }.bind(this)});
    };

    /**
     * @method ExplainInfobar
     * @memberof Tutorial
     * @public
     */
    p.ExplainInfobar = function () {
        TweenLite.to(this.chatCloud, 0.5, { alpha: 1, onComplete: function () {
            // Infobar tutorial
            var infobar = this.interfaceLayer.infobar;
            this.overlay.Clear();
            this.overlay.ExcludeRect({ position: { x: infobar.x - 5, y: infobar.y - 5 }, dimensions: { width: infobar.width + 10, height: infobar.height + 10 } });
            this.overlay.Draw();

            this.trainer.Play("talk", 30, true);
            this.chatCloud.Talk("Hier kun je je eigen score en de highscore terug zien.", 30, function () {
                this.trainer.Play("idle", 30, true);
                this.timeouts.push(setTimeout(function () {
                    this.scoreHolder.Add(1000);
                }.bind(this), 1000));

                this.timeouts.push(setTimeout(function () {
                    this.chatCloud.Clear();
                    TweenLite.to(this.chatCloud, 0.5, { alpha: 0, onComplete: function () { 
                        this.overlay.Clear();
                        this.overlay.Draw();

                        this.timeouts.push(setTimeout(function () {
                            this.tutorialCount++;
                            this.SwitchExplanation();
                        }.bind(this), 1000));
                    }.bind(this) });
                }.bind(this), 4000));
            }.bind(this));
        }.bind(this)});
    };

    /**
     * @method ExplainCoach
     * @memberof Tutorial
     * @public
     */
    p.ExplainCoach = function () {
        var offset = 150;

        this.chatCloud.y += offset;
        this.trainer.y += offset;

        TweenLite.to(this.chatCloud, 0.5, { alpha: 1, onComplete: function () {
            // Coach tutorial
            this.overlay.Clear();
            this.overlay.ExcludeRect({ position: { x: Config.Core.Dimensions.width * 0.05, y: 80 }, dimensions: { width: Config.Core.Dimensions.width * 0.9, height:  140 } });
            this.overlay.Draw();

            this.trainer.Play("talk", 30, true);
            this.chatCloud.Talk("Hier staat de coach. De coach geeft bepaalde opdrachten die je moet uitvoeren zodat je meer tijd en punten krijgt.", 30, function () {
                this.timeouts.push(setTimeout( function () {
                    this.chatCloud.Talk("Pas op! Zolang de opdrachten blijven staan , loopt de tijd sneller!", 30, function () {
                        this.trainer.Play("idle", 30, true);
                        this.coach.Start();

                        this.timeouts.push(setTimeout(function () {
                            this.chatCloud.Clear();
                            TweenLite.to(this.chatCloud, 0.5, { alpha: 0, onComplete: function () { 
                                this.overlay.Clear();
                                this.overlay.Draw();

                                this.chatCloud.y -= offset;
                                this.trainer.y -= offset;

                                this.timeouts.push(setTimeout(function () {
                                    this.tutorialCount++;
                                    this.SwitchExplanation();
                                }.bind(this), 1000));
                            }.bind(this) });
                        }.bind(this), 4000));
                    }.bind(this));
                }.bind(this), 3000));
            }.bind(this));
        }.bind(this) });
    };
    
    /**
     * @method StartGame
     * @memberof Tutorial
     * @public
     */
    p.StartGame = function () {
        TweenLite.to(this.chatCloud, 0.5, { alpha: 1, onComplete: function () {
            this.trainer.Play("talk", 30, true);
            this.chatCloud.Talk("Oke, de tutorial is nu afgerond. Je kan nu de game vrij spelen totdat de timer is afgelopen.", 30, function () {
                this.timeouts.push(setTimeout(function() {
                    this.chatCloud.Talk("Omdat dit nog het tutorial level is zal de timer sneller lopen en zal je scoren niet deelnemen aan het highscore lijst.", 30, function () {
                        this.timeouts.push(setTimeout(function() {
                            this.chatCloud.Talk("Succes! De game begint in 3. 2. 1.", 30, function () {
                                this.trainer.Play("idle", 30, true);
                                this.timeouts.push(setTimeout(function () {
                                    TweenLite.to(this.chatCloud, 0.5, { alpha: 0, onComplete: function () { 
                                        TweenLite.to(this.trainer, 0.5, { alpha: 0 });
                                        this.overlay.TransitionOut( function () {
                                            this.inTutorial = false;
                                            this.started = true;
                                            this.gameTimer.multiplier = 5;
                                            Input.paused = false;
                                        }.bind(this));
                                    }.bind(this) });
                                }.bind(this), 2000));
                            }.bind(this));
                        }.bind(this), 3000));
                    }.bind(this));
                }.bind(this), 3000));
            }.bind(this));
        }.bind(this)});
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
    p.__game_onBallAlign = p._onBallAlign;
    p._onBallAlign = function (caller, params) {
        this.__game_onBallAlign(caller, params);

        if (this.inTutorial) {
            this.chatCloud.Mute();
            this.chatCloud.Clear();
            
            Input.paused = true;
            this.trainer.Play("idle", 30, true);

            TweenLite.to(this.chatCloud, 0.5, { alpha: 0, onComplete: function () { 
                this.overlay.Clear();
                this.overlay.Draw();

                this.timeouts.push(setTimeout(function () {
                    this.tutorialCount++;
                    this.SwitchExplanation();
                }.bind(this), 1000));
            }.bind(this) });
        }
    };

    /**
     * @method _CheckGameTimer
     * @memberof Tutorial
     * @private
     * @override 
     */
    p.__game_checkGameTimer = p._checkGameTimer;
    p._checkGameTimer = function () {
        if (this.inTutorial === false) this.__game_checkGameTimer();
    };

    /**
     * @method _OnStageBegin
     * @memberof Game
     * @override 
     * @private
     * @ignore 
     */
    p._onStageBegin = function () {};

    /**
     * @method _OnStageDone
     * @memberof Game
     * @override 
     * @private
     * @ignore 
     */
    p._onStageDone = function () {};

    p.__clearTimeoutList = function () {
        var len = this.timeouts.length;
        for ( var i = len - 1; i >= 0; i--) {
            var timeout = this.timeouts[i];
            clearTimeout(timeout);
            this.timeouts.splice(i, 1);
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
                    Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.TUTORIAL });
                });
                break;

            case ballpit.OptionsInputs.CROSS:
                this.popupContainer.ConcealPopup();
                break;

            case ballpit.OptionsInputs.HIGHSCORE:
                this.popupContainer.ConcealAllPopups(function () {
                    Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.MAINMENU });
                });
                break;
        }
    };

    /**
     * @method Dispose
     * @memberof Tutorial
     * @public
     */
    p.__game_dispose = p.Dispose;
    p.Dispose = function () {
        this.chatCloud.Dispose();
        this.overlay.removeChild(this.chatCloud);
        delete this.chatCloud;

        this.trainer.Dispose();
        this.overlay.removeChild(this.trainer);
        delete this.trainer;

        this.acceptButton.Dispose();
        this.overlay.removeChild(this.acceptButton);
        delete this.acceptButton;
                                    
        this.rejectButton.Dispose();
        this.overlay.removeChild(this.rejectButton);
        delete this.rejectButton;

        this.overlay.Dispose();
        this.removeChild(this.overlay);
        delete this.overlay;

        delete this.inTutorial;
        delete this.tutorialCount;

        this.__game_dispose();
    };

    return Tutorial;
}());
