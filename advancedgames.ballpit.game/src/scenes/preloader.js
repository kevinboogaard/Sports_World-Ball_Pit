/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var scene = scene || {};

scene.Names = scene.Names || {};
scene.Names.PRELOADER = "Preloader";

scene.Preloader = (function () {

    /**
     * This is the Preloader Scene.
     * 
     * @class Preloader
     * @extends Phaser.Group
     * @constructor
     * @param {Function} callback
     */
    function Preloader(callback) {
        Phaser.Group.call(this, ADCore.phaser, null, "Preloader");

        /**
         * @property {Function} _Callback
         * @private
         */
        this._callback = callback;

        /**
         * @property {Interface} _BarBackground
         * @private
         */
        this._barBackground = null;

        /**
         * @property {Interface} _BarBlackBorder
         * @private
         */
        this._barBlackBorder = null;

        /**
         * @property {Interface} _BarWhiteBorder
         * @private
         */
        this._barWhiteBorder = null;

        /**
         * @property {Interface} _Bar
         * @private
         */
        this._bar = null;

        /**
         * @property {Interface} _preloaderBall
         * @private
         */
        this._preloaderBall = null;

        /**
         * @property {Interface} _preloaderBallWhiteBorder
         * @private
         */
        this._preloaderBallWhiteBorder = null;
        
        /**
         * @property {Vector2} _BarPosition
         * @private
         */
        this._barPosition = new Vector2(Config.Core.Dimensions.width / 2, Config.Core.Dimensions.height * 0.9);

        /**
         * @property {Integer} _Target
         * @private
         */
        this._target = 0; 

        /**
         * @property {Integer} _Current
         * @private
         */
        this._current = 0;

        /**
         * @property {Integer} _StepSpeed
         * @private
         */
        this._stepSpeed = 5; // 5

        /**
         * @property {Integer} _Delay
         * @private
         */
        this._delay = 50; // 50

        /**
         * @property {Boolean} _Started
         * @private
         */
        this._started = false;

        Listener.Listen(ADCore.Event.ON_PRELOAD_START, this, this._onPreloadStart.bind(this));
        Listener.Listen(ADCore.Event.ON_PRELOAD_UPDATE, this, this._onPreloadUpdate.bind(this));
    }
    Preloader.prototype = Object.create(Phaser.Group.prototype);
    Preloader.prototype.constructor = Preloader; 
    var p = Preloader.prototype;

    /**
     * This is the function that is called when the preloader starts.
     * 
     * @method _OnPreloadStart
     * @memberof Preloader 
     * @public
     * @public {Object} caller
     * @public {Object} params
     */
    p._onPreloadStart = function (caller, params) {
        this._barBackground = new ADCore.Interface(this._barPosition, "bar_bg");
        this._barBackground.x -= this._barBackground.width / 2;

        this._barPosition.x -= this._barBackground.width / 2;

        this._bar = new ADCore.Interface(this._barPosition, "bar");
        this._bar.width = 0;

        this._barWhiteBorder = new ADCore.Interface(this._barPosition, "bar_white_border");
        this._barWhiteBorder.x -= 2;
        this._barWhiteBorder.y += .025;
        this._barBlackBorder = new ADCore.Interface(this._barPosition, "bar_black_border");
        
        var keys = Object.keys(ballpit.BallTypes);
        var randomType = ballpit.BallTypes[keys[ keys.length * Math.random() << 0]];
        var ball_key = "preloader_" + randomType;

        this._preloaderBall = new ADCore.Interface(this._barPosition, ball_key);
        this._preloaderBallWhiteBorder = new ADCore.Interface(this._barPosition, "preloader_ball_white_border");
        
        this.addChild(this._preloaderBallWhiteBorder); 
        this.addChild(this._barBackground);
        this.addChild(this._bar);
        this.addChild(this._barWhiteBorder);
        this.addChild(this._barBlackBorder);
        this.addChild(this._preloaderBall);

        setTimeout(function () {
            this._started = true;
        }.bind(this), this._delay);
    };

    /**
     * This is the function that is called when the preloader updates.
     * 
     * @method _OnPreloadUpdate
     * @memberof Preloader 
     * @public
     * @public {Object} caller
     * @public {Object} params
     * @public {Integer} params.progress
     * @public {String} params.savekey
     * @public {Boolean} params.success
     */
    p._onPreloadUpdate = function (caller, params) {
        this._target  = params.progress;
    };

    /**
     * @method Render
     * @memberof Preloader
     * @public
     */
    p.Render = function () {
        this._preloaderBall.angle += 5;

        if (!this._started) return;

        if (this._current <= this._target - 1) {
            var step = this._calculateStep( this._current, this._target );
            this._current += step;
        } else {
            this._started = false;

            setTimeout(function () {
               this._callback();
            }.bind(this), this._delay);
        }

        this._bar.width = this._barBackground.width * (this._current / 100);

        this._preloaderBall.x = this._bar.x + this._bar.width;
        this._preloaderBallWhiteBorder.x = this._preloaderBall.x;
    };

    /**
     * @method _CalculateStep
     * @memberof Preloader
     * @private
     */
    p._calculateStep = function (current, goal) {
        var delta = goal - current;
        var result = delta / this._stepSpeed;
        return result;
    };

    /**
     * @method Dispose
     * @memberof Preloader
     * @public
     */
    p.Dispose = function () {
        Listener.Mute(ADCore.Event.ON_PRELOAD_START, this);
        Listener.Mute(ADCore.Event.ON_PRELOAD_UPDATE, this);

        delete this._callback;

        this._barBackground.Dispose();
        this.removeChild(this._barBackground);
        delete this._barBackground;
        
        this._barBlackBorder.Dispose();
        this.removeChild(this._barBlackBorder);
        delete this._barBlackBorder;

        this._barWhiteBorder.Dispose();
        this.removeChild(this._barWhiteBorder);
        delete this._barWhiteBorder;

        this._bar.Dispose();
        this.removeChild(this._bar);
        delete this._bar;

        this._preloaderBall.Dispose();
        this.removeChild(this._preloaderBall);
        delete this._preloaderBall;
        
        this._preloaderBallWhiteBorder.Dispose();
        this.removeChild(this._preloaderBallWhiteBorder);
        delete this._preloaderBallWhiteBorder;
        
        delete this._barPosition;
        delete this._target;
        delete this._current;
        delete this._stepSpeed;
        delete this._delay;
        delete this._started;
    };

    return Preloader;
}());