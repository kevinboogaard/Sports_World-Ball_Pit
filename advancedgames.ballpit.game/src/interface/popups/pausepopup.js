/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

/**
 * @namespace {String} PauseInputs
 * @memberof ballpit
 */
ballpit.PauseInputs = ballpit.PauseInputs || {};

/**
 * @property PLAY
 * @memberof PauseInputs
 */
ballpit.PauseInputs.PLAY = "play";

/**
 * @property OPTIONS
 * @memberof PauseInputs
 */
ballpit.PauseInputs.OPTIONS = "options";

/**
 * @property MENU
 * @memberof PauseInputs
 */
ballpit.PauseInputs.MENU = "menu";

ballpit.PausePopup = ( function (callback) {

    /**
     * @class PausePopup
     * @extends Popup
     * @constructor
     * @param {Function} callback
     */
    function PausePopup( callback ) {
        ADCore.Popup.call( this, callback );

        /**
         * @property {Interface} Background
         * @public
         */
        this.background = null;
        
        /**
         * @property {Text} Title
         * @public
         */
        this.title = null;
        
        /**
         * @property {Button} PlayButton
         * @public
         */
        this.playButton = null;
        
        /**
         * @property {Button} OptionsButton
         * @public
         */
        this.optionsButton = null;
        
        /**
         * @property {Button} MenuButton
         * @public
         */
        this.menuButton = null;

        this._initialize();
    }
    PausePopup.prototype = Object.create( ADCore.Popup.prototype );
    PausePopup.prototype.constructor = PausePopup;
    var p = PausePopup.prototype;

     /**
     * @method _Initialize
     * @memberof PausePopup
     * @private
     */
    p._initialize = function () {
        this.background = new ADCore.Interface(new Vector2(Config.Core.Dimensions.width / 2, Config.Core.Dimensions.height * 0.27), "ps_pausebackground");
        this.background.anchor.set(0.5, 0.5);     
        this.addChild(this.background);

        this.title = new ADCore.Text().Value("PAUSED").Position(new Vector2()).Color("#FFFFFF").Anchor(new Vector2(0.5, 0.5)).Font("djb-bbi").Finish();
        this.title.y -= this.background.height * 0.25;
        this.title.stroke = "#000000'";
        this.title.strokeThickness = 4;
        this.background.addChild(this.title);

        this.playButton = new ADCore.Button(new Vector2(), "ps_playbutton");
        this.playButton.anchor.set(0.5, 0.5);
        this.playButton.x -= this.background.width * 0.25;
        this.playButton.y += this.background.height * 0.1;
        this.playButton.onInputUp = function() { this._callback(ballpit.PauseInputs.PLAY) }.bind(this);
        this.background.addChild(this.playButton);

        this.optionsButton = new ADCore.Button(new Vector2(0, this.playButton.y), "ps_settingsbutton");
        this.optionsButton.anchor.set(0.5, 0.5);
        this.optionsButton.onInputUp  = function() { this._callback(ballpit.PauseInputs.OPTIONS) }.bind(this);
        this.background.addChild(this.optionsButton);

        this.menuButton = new ADCore.Button(new Vector2(0, this.playButton.y), "ps_quitbutton");
        this.menuButton.anchor.set(0.5, 0.5);
        this.menuButton.x += this.background.width * 0.25;
        this.menuButton.onInputUp = function() { this._callback(ballpit.PauseInputs.MENU) }.bind(this);
        this.background.addChild(this.menuButton);

        this.background.scale.set(0.01, 0.01);  
    };

     /**
     * @method Dispose
     * @memberof Popup
     * @public
     */
    p.__popup_dispose = p.Dispose;
    p.Dispose = function () {
        this.background.removeChild(this.title);
        delete this.title;
        
        this.playButton.Dispose();
        this.background.removeChild(this.playButton);
        delete this.playButton;
        
        this.optionsButton.Dispose();
        this.background.removeChild(this.optionsButton);
        delete this.optionsButton;
        
        this.menuButton.Dispose();
        this.background.removeChild(this.menuButton);
        delete this.menuButton;

        this.background.Dispose();
        this.removeChild(this.background);
        delete this.background;
        
        this.__popup_dispose();
    };

    return PausePopup;
}() );