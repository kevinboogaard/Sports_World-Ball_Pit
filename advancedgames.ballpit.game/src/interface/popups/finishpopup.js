/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.Event = ballpit.Event || {};

ballpit.Event.ON_FINISH_POPUP_INPUT = "on_finish_popup_input";

ballpit.FinishInputs = ballpit.FinishInputs || {};

ballpit.FinishInputs.REDO = "redo";
ballpit.FinishInputs.HIGHSCORE = "highscore";
ballpit.FinishInputs.CROSS = "cross";

ballpit.FinishPopup = (function(){

     /**
     * @class finishpopup
     * @extends Popup
     * @constructor
     * @param {Function} callback
     * @param {Timer} gameTimer
     * @param {CoachModel} coach
     * @param {ScoreHolder} scoreHolder
     */

    function FinishPopup(callback, gameTimer, coach, scoreHolder){
        ADCore.Popup.call(this, callback);
        this.gameTimer = gameTimer;
        this.coach = coach;
        this.scoreHolder = scoreHolder;
    

         this._initialize();
    }
    FinishPopup.prototype = Object.create(ADCore.Popup.prototype);
    FinishPopup.prototype.constructor = FinishPopup;
    var p = FinishPopup.prototype;

    p._initialize = function () {
        this.background = new ADCore.Interface(new Vector2(Config.Core.Dimensions.width / 2,Config.Core.Dimensions.height /2),"scorebord"); 
        this.background.anchor.set(0.5, 0.5);
        this.addChild(this.background);

        this.finishlogo = new ADCore.Interface(new Vector2(this.background.x,this.background.y*0.25),"hs_finishlogo");
        this.finishlogo.anchor.set(0.5,0.5);
        this.finishlogo.scale.setTo(0.01,0.01);
        this.addChild(this.finishlogo);

        this.highscorebutton = new ADCore.Button(new Vector2(this.background.x,this.background.y * 1.6),"highscorebutton");
        this.highscorebutton.anchor.set(0.5,0.5);
        this.highscorebutton.scale.setTo(0.01,0.01);
        this.highscorebutton.onInputUp = function () { this._callback(ballpit.FinishInputs.HIGHSCORE) }.bind(this);
        this.addChild(this.highscorebutton);

        this.restartlogo = new ADCore.Button(new Vector2(this.highscorebutton.x/2,this.highscorebutton.y),"hs_restartbutton");
        this.restartlogo.anchor.set(0.5,0.5);
        this.restartlogo.scale.setTo(0.01,0.01);
        this.restartlogo.onInputUp = function () { this._callback(ballpit.FinishInputs.REDO) }.bind(this);
        this.addChild(this.restartlogo);

        this.quitbutton = new ADCore.Button(new Vector2(this.highscorebutton.x*1.5,this.highscorebutton.y),"hs_quitbutton");
        this.quitbutton.anchor.set(0.5,0.5);
        this.quitbutton.scale.setTo(0.01,0.01);
        this.quitbutton.onInputUp = function () { this._callback(ballpit.FinishInputs.CROSS) }.bind(this);
        this.addChild(this.quitbutton);

        this.resulttext = new ADCore.Text()               
            .Value("Results")
            .Position(new Vector2(this.background.x, this.background.y * 0.45))
            .Anchor(new Vector2(0.5,0.5))
            .Font("djb-bbi")
            .Size(25)
            .Finish();
        this.resulttext.scale.setTo(0.01,0.01);
        this.addChild(this.resulttext)

        this.taskscompletedtext = new ADCore.Text()
            .Value("Tasks Completed")           
            .Position(new Vector2(this.resulttext.x, this.background.y * 0.6))
            .Anchor(new Vector2(0.5,0.5))
            .Font("djb-bbi")
            .Size(10)
            .Finish();
        this.taskscompletedtext.scale.setTo(0.01,0.01);
        this.addChild(this.taskscompletedtext)

        this.timeplayedtext = new ADCore.Text()
            .Value("Time Played")
            .Position(new Vector2(this.resulttext.x, this.background.y * 0.775))
            .Anchor(new Vector2(0.5,0.5))
            .Font("djb-bbi")        
            .Size(10)
            .Finish();
        this.timeplayedtext.scale.setTo(0.01,0.01);
        this.addChild(this.timeplayedtext)        
        
        this.combotext = new ADCore.Text()
            .Value("Combo's")
            .Position(new Vector2(this.resulttext.x, this.background.y * 0.950))
            .Anchor(new Vector2(0.5,0.5))
            .Font("djb-bbi")        
            .Size(10)
            .Finish();
        this.combotext.scale.setTo(0.01,0.01);
        this.addChild(this.combotext)

        this.finalscoretext = new ADCore.Text()               
            .Value("Final Score")
            .Position(new Vector2(this.background.x, this.background.y * 1.175))
            .Anchor(new Vector2(0.5,0.5))
            .Font("djb-bbi")
            .Size(20)
            .Finish();
        this.finalscoretext.scale.setTo(0.01,0.01);
        this.addChild(this.finalscoretext)

        this.finalscore_value = this.scoreHolder.score;
        this.finalscore_current = 0;
        this.finalscore = new ADCore.Text()
            .Value(this.finalscore_current)
            .Position(new Vector2(this.finalscoretext.x, this.finalscoretext.y + 70))
            .Anchor(new Vector2(0.5,0.5))
            .Font("djb-bbi")
            .Size(20)
            .Finish();
        this.finalscore.alpha = 0;
        this.addChild(this.finalscore)
        
        this.timeplayed_value = this.gameTimer.elapsed;
        this.timeplayed_current = 0;
        this.timeplayed = new ADCore.Text()
            .Value(this.timeplayed_current)
            .Position(new Vector2(this.timeplayedtext.x, this.timeplayedtext.y + 30))
            .Anchor(new Vector2(0.5,0.5))
            .Font("djb-bbi")
            .Size(10)
            .Finish();
        this.timeplayed.alpha = 0;
        this.addChild(this.timeplayed)

        this.combo_value = this.coach.amountCombos;
        this.combo_current = 0;
        this.combo = new ADCore.Text()
            .Value(this.combo_current)
            .Position(new Vector2(this.combotext.x, this.combotext.y + 30))
            .Anchor(new Vector2(0.5,0.5))
            .Font("djb-bbi")
            .Size(10)
            .Finish();
        this.combo.alpha = 0;
        this.addChild(this.combo)

        this.tasks_value = this.coach.amountTasks;
        this.tasks_current = 0;
        this.tasks = new ADCore.Text()
            .Value(this.tasks_current)
            .Position(new Vector2(this.taskscompletedtext.x, this.taskscompletedtext.y + 30))
            .Anchor(new Vector2(0.5,0.5))
            .Font("djb-bbi")
            .Size(10)
            .Finish();
        this.tasks.alpha = 0;
        this.addChild(this.tasks)

        setTimeout(function() { // 1
            TweenLite.to(this.tasks, 0.2, { alpha: 1, onComplete: function () { // 2
                TweenLite.to(this, 1, { tasks_current: this.tasks_value, onUpdate: function () { // 3
                    this.tasks.text = Math.round(this.tasks_current);
                }.bind(this), onComplete: function () { // 3 - > 4
                    TweenLite.to(this.timeplayed, 0.2, { alpha: 1, onComplete: function () { // 5
                        TweenLite.to(this, 1, { timeplayed_current: this.timeplayed_value, onUpdate: function () { // 6
                            this.timeplayed.text = ADCore.Utilities.MsToTime(this.timeplayed_current, [ "minutes", "seconds" ]);
                        }.bind(this), onComplete: function () { // 6 - > 7
                            TweenLite.to(this.combo, 0.2, { alpha: 1, onComplete: function () { // 8
                                TweenLite.to(this, 1, { combo_current: this.combo_value, onUpdate: function () { // 9
                                    this.combo.text = Math.round(this.combo_current);
                                }.bind(this), onComplete: function () { // 9 - > 10
                                    TweenLite.to(this.finalscore, 0.2, { alpha: 1, onComplete: function () { // 11
                                        TweenLite.to(this, 1, { timeplayed_current: this.timeplayed_value, onUpdate: function () { // 12
                                            this.finalscore.text = Math.round( this.timeplayed_current );
                                        }.bind(this) }); // 12
                                    }.bind(this)}); // 11
                                }.bind(this)}); // 10
                            }.bind(this)}); // 8
                        }.bind(this)}); // 7
                    }.bind(this) }); // 5
                }.bind(this) }); // 4
            }.bind(this)}); // 2
        }.bind(this), 1000); // 1
    };

    return FinishPopup;
})();