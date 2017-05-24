/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

/**
 * @namespace {String} Event
 * @memberof ballpit
 */
ballpit.Event = ballpit.Event || {};

/**
 * @event ON_PAUSE_BUTTON_UP
 * @memberof Event
 */
ballpit.Event.ON_PAUSE_BUTTON_UP = "on_pause_button_clicked";

ballpit.InterfaceLayer = (function () {

    /**
     * @class InterfaceLayer
     * @constructor 
     * @extends Phaser.Group
     * @param {Timer} gameTimer 
     * @param {ScoreHolder} scoreHolder
     * @param {CoachModel} coach
     */
    function InterfaceLayer(gameTimer, scoreHolder, coach) {
        Phaser.Group.call( this, ADCore.phaser, null, "Interface Layer" );

        /**
         * @property {Infobar} Infobar 
         * @public
         */
        this.infobar = null;

        /**
         * @property {CoachModel} coach 
         * @public
         */
        this.coach = coach;

        /**
         * @property {Interface} TimeBar
         * @public
         */
        this.timeBar = null;

        /**
         * @property {Interface} TimeBarBackground
         * @public
         */
        this.timeBarBackground = null;

        /**
         * @property {Interface} TimeBarBorder
         * @public
         */
        this.timeBarBorder = null;

        /**
         * @property {TaskBoard} TaskBoard 
         * @public
         */
        this.taskboard = null;

        /**
         * @property {Button} PauseButton 
         * @public
         */
        this.pausebutton = null;

        /**
         * @property {Time} GameTimer 
         * @public
         */
        this.gameTimer = gameTimer;

        this._initialize(scoreHolder);
    }
    InterfaceLayer.prototype = Object.create( Phaser.Group.prototype );
    InterfaceLayer.prototype.constructor = InterfaceLayer;
    var p = InterfaceLayer.prototype;

    /**
     * @method _Initialize
     * @memberof InterfaceLayer
     * @private
     * @param {ScoreHolder} scoreHolder
     * @ignore
     */
    p._initialize = function (scoreHolder) {
        this.infobar = new ballpit.Infobar(new Vector2(Config.Core.Dimensions.width / 2, 0), "ui_infobar_bg", scoreHolder);
        this.infobar.x -= this.infobar.width / 2;
        this.addChild(this.infobar);

        this.timeBar = new ADCore.Interface(new Vector2(Config.Core.Dimensions.width / 2, Config.Core.Dimensions.height * 0.96), "ui_timerbar");
        this.timeBar.x -= this.timeBar.width / 2;
        this.timeBar.anchor.set(0, 0.5);
        this.timeBar.scale.set(0, 1);

        this.timeBarBackground  = new ADCore.Slider(new Vector2(Config.Core.Dimensions.width / 2, this.timeBar.y), 0, this.gameTimer.startTime, "ui_timerbar_bg");
        this.timeBarBackground.x -= this.timeBarBackground.width / 2;        
        this.timeBarBackground.value = this.gameTimer.count;
        this.timeBarBackground.anchor.set(0, 0.5);

        this.timeBarBorder  = new ADCore.Interface(new Vector2(Config.Core.Dimensions.width / 2, this.timeBar.y), "ui_timerbar_border");
        this.timeBarBorder.x -= this.timeBarBorder.width / 2;
        this.timeBarBorder.anchor.set(0, 0.5);

        this.taskboard = new ballpit.TaskBoard(new Vector2(Config.Core.Dimensions.width / 2, 150), "bubble", this.coach);
        this.taskboard.x -= this.taskboard.width * 0.33;
        this.taskboard.anchor.set(0.5, 0.5);
        this.taskboard.scale.set(0,0);
        this.addChild(this.taskboard);

        this.pausebutton = new ADCore.Button(new Vector2(this.infobar.x + this.infobar.width * 0.79, this.infobar.y), "ui_pausebutton");
        this.pausebutton.y += this.pausebutton.height / 2;
        this.pausebutton.onInputUp = function () {
            if ( Input.paused ) return;
            Listener.Dispatch( ballpit.Event.ON_PAUSE_BUTTON_UP, this );
        }.bind(this);
        this.addChild(this.pausebutton);

        this.addChild(this.timeBarBackground);
        this.addChild(this.timeBar);
        this.addChild(this.timeBarBorder);
    };

    /**
     * @method Render
     * @memberof InterfaceLayer
     * @public
     */
    p.Render = function () {
        this.infobar.Render();

        if (this.coach.activeTask) {
            if (this.taskboard.hasTransitioned) {
                this.taskboard.Render();
            } else {
                this.taskboard.TransitionIn();
            }
        } else {
            if (this.taskboard.hasTransitioned) {
                this.taskboard.TransitionOut();
            }
        }

        this.timeBarBackground.value = this.gameTimer.count;
        this.timeBar.scale.x = (1 / 100) * this.timeBarBackground.percentage;
    };

    /**
     * @method Dispose
     * @memberof InterfaceLayer
     * @public
     */
    p.Dispose = function () {
        this.infobar.Dispose();
        this.removeChild(this.infoBar);
        delete this.infobar;

        this.taskboard.Dispose();
        this.removeChild(this.taskboard);
        delete this.taskboard;

        this.pausebutton.Dispose();
        this.removeChild(this.pausebutton);
        delete this.pausebutton;
    };

    return InterfaceLayer;
})();