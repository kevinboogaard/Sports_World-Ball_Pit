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
         * @property {TaskBoard} TaskBoard 
         * @public
         */
        this.taskboard = null;

        /**
         * @property {Button} PauseButton 
         * @public
         */
        this.pausebutton = null;

        this._initialize(gameTimer, scoreHolder, coach);
    }
    InterfaceLayer.prototype = Object.create( Phaser.Group.prototype );
    InterfaceLayer.prototype.constructor = InterfaceLayer;
    var p = InterfaceLayer.prototype;

    /**
     * @method _Initialize
     * @memberof InterfaceLayer
     * @private
     * @param {Timer} gameTimer 
     * @param {ScoreHolder} scoreHolder
     * @param {CoachModel} coach
     * @ignore
     */
    p._initialize = function (gameTimer, scoreHolder, coach) {
        this.infobar = new ballpit.Infobar(new Vector2(), "infobar", gameTimer, scoreHolder);
        this.addChild(this.infobar);

        this.taskboard = new ballpit.TaskBoard(new Vector2(Config.Core.Dimensions.width * 0.33, 125), "bubble", coach);
        this.taskboard.x -= this.taskboard.width * 0.33;
        this.addChild(this.taskboard);

        this.pausebutton = new ADCore.Button(new Vector2(Config.Core.Dimensions.width * 0.82, 10), "ps_pausebutton");
        this.pausebutton.onInputUp = function () {
            if ( Input.paused ) return;
            Listener.Dispatch( ballpit.Event.ON_PAUSE_BUTTON_UP, this );
        }.bind(this);
        this.addChild(this.pausebutton);
    };

    /**
     * @method Render
     * @memberof InterfaceLayer
     * @public
     */
    p.Render = function () {
        this.infobar.Render();
        this.taskboard.Render();
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