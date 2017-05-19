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
 * @event ON_OPTIONS_POPUP_INPUT
 * @memberof Event
 */
ballpit.Event.ON_OPTIONS_POPUP_INPUT = "on_options_popup_input";

/**
 * @namespace {String} OptionsInputs
 * @memberof ballpit
 */
ballpit.OptionsInputs = ballpit.OptionsInputs || {};

/**
 * @property PLAY
 * @memberof OptionsInputs
 */
ballpit.OptionsInputs.PLAY = "play";

/**
 * @property REDO
 * @memberof OptionsInputs
 */
ballpit.OptionsInputs.REDO = "redo";

/**
 * @property CROSS
 * @memberof OptionsInputs
 */
ballpit.OptionsInputs.CROSS = "cross";

/**
 * @property MENU
 * @memberof OptionsInputs
 */
ballpit.OptionsInputs.MENU = "menu";

/**
 * @property HIGHSCORE
 * @memberof OptionsInputs
 */
ballpit.OptionsInputs.HIGHSCORE = "highscore";

ballpit.OptionsPopup = ( function () {

    /**
     * @class OptionsPopup
     * @extends Popup
     * @constructor
     * @param {Function} callback
     */
    function OptionsPopup(callback) {
        ADCore.Popup.call( this );

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
         * @property {} SoundSlideBar
         * @public
         */
        this.soundSlideBar = null;
        
        /**
         * @property {} SoundSlideHandle
         * @public
         */
        this.soundSlideHandle = null;
        
        /**
         * @property {Button} RedoButton
         * @public
         */
        this.redoButton = null;
        
        /**
         * @property {Button} HighscoreButton
         * @public
         */
        this.highscoreButton = null;
        
        /**
         * @property {Button} CrossButton
         * @public
         */
        this.crossButton = null;
        
        /**
         * @property {Button} PlayButton
         * @public
         */
        this.playButton = null;
        
        /**
         * @property {Button} MenuButton
         * @public
         */
        this.menuButton = null;

        /**
         * @property {Function} callback
         * @private
         */
        this._callback = callback;

        this._initialize();
    }
    OptionsPopup.prototype = Object.create( ADCore.Popup.prototype );
    OptionsPopup.prototype.constructor = OptionsPopup;
    var p = OptionsPopup.prototype;

     /**
     * @method _Initialize
     * @memberof OptionsPopup
     * @private
     */
    p._initialize = function () {
        this.background = new ADCore.Interface(new Vector2(Config.Core.Dimensions.width / 2, Config.Core.Dimensions.height * 0.27), "ps_optionsbackground");
        this.background.anchor.set(0.5, 0.5);     
        this.addChild(this.background);

        this.title = new ADCore.Text().Value("OPTIONS").Color("#FFFFFF").Anchor(new Vector2(0.5, 0.5)).Font("djb-bbi").Finish();
        this.title.y = -this.background.height * 0.25;
        this.title.stroke = "#000000'";
        this.title.strokeThickness = 4;
        this.background.addChild(this.title);

        this.redoButton = new ADCore.Button(new Vector2(), "ps_replaybutton");
        this.redoButton.anchor.set(0.5, 0.5);
        this.redoButton.x -= this.background.width * 0.125;
        this.redoButton.y += this.background.height * 0.05;
        this.redoButton.onInputUp = function () { this._callback(ballpit.OptionsInputs.REDO) }.bind(this);
        this.background.addChild(this.redoButton);
        
        this.highscoreButton =  new ADCore.Button(new Vector2(0, this.redoButton.y), "ps_highscorebutton");
        this.highscoreButton.anchor.set(0.5, 0.5);
        this.highscoreButton.x += this.background.width * 0.125;
        this.highscoreButton.onInputUp = function () { this._callback(ballpit.OptionsInputs.HIGHSCORE) }.bind(this);
        this.background.addChild(this.highscoreButton);

        this.crossButton =  new ADCore.Button(new Vector2(), "ps_crossbutton");
        this.crossButton.anchor.set(0.5, 0.5);
        this.crossButton.x -= this.background.width * 0.25;
        this.crossButton.y += this.background.height * 0.3;
        this.crossButton.onInputUp = function () { this._callback(ballpit.OptionsInputs.CROSS) }.bind(this);
        this.background.addChild(this.crossButton);

        this.playButton = new ADCore.Button(new Vector2(0, this.crossButton.y), "ps_playbutton");
        this.playButton.anchor.set(0.5, 0.5);
        this.playButton.onInputUp = function () { this._callback(ballpit.OptionsInputs.PLAY) }.bind(this);
        this.background.addChild(this.playButton);

        this.menuButton = new ADCore.Button(new Vector2(0, this.crossButton.y), "ps_quitbutton");
        this.menuButton.anchor.set(0.5, 0.5);
        this.menuButton.x += this.background.width * 0.25;
        this.menuButton.onInputUp = function () { this._callback(ballpit.OptionsInputs.MENU) }.bind(this);
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
        
        //this.soundSlideBar.Dispose();
        //this.background.removeChild(this.soundSlideBar);
        //delete this.soundSlideBar;
        
        //this.soundSlideHandle.Dispose();
        //this.background.removeChild(this.soundSlideHandle);
        //delete this.soundSlideHandle;
        
        this.redoButton.Dispose();
        this.background.removeChild(this.redoButton);
        delete this.redoButton;
        
        this.highscoreButton.Dispose();
        this.background.removeChild(this.highscoreButton);
        delete this.highscoreButton;
        
        this.crossButton.Dispose();
        this.background.removeChild(this.crossButton);
        delete this.crossButton;
        
        this.playButton.Dispose();
        this.background.removeChild(this.playButton);
        delete this.playButton;
        
        this.menuButton.Dispose();
        this.background.removeChild(this.menuButton);
        delete this.menuButton;
        
        this.background.Dispose();
        this.removeChild(this.background);
        delete this.background;

        this.__popup_dispose();
    };

    return OptionsPopup;
}() );