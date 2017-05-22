/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

/**
 * @namespace BallAnimations
 */
let BallAnimations = ballpit.ballAnimations || {}; // For documentation purposes.
ballpit.ballAnimations = BallAnimations;

/**
 * @property {String} HINT
 * @memberof BallAnimations
 * @readonly
 */
ballpit.ballAnimations.HINT = "hint";

/**
 * @property {String} PLOP
 * @memberof BallAnimations
 * @readonly
 */
ballpit.ballAnimations.PLOP = "plop";

/**
 * @property {String} SWIPE_FAIL
 * @memberof BallAnimations
 * @readonly
 */
ballpit.ballAnimations.SWIPE_FAIL = "swipefail";

ballpit.BallView = (function () {

    /**
     * @class BallView
     * @extends Display
     * @constructor
     * @param {BallModel} model - The model of the ball
     * @param {String} key - The key of the ballsprite
     */
    function BallView(model, key) {
        ADCore.Display.call( this, model, key );

        this.width = 45;
        this.height = 45;

        Listener.Listen(ballpit.Event.ON_BALL_STATE_CHANGE, this, this._onStateChange.bind(this), model);
        Listener.Listen(ballpit.Event.ON_BALL_DESTROY, this, this._onDestroy.bind(this), model);
        Listener.Listen(ballpit.Event.ON_BALL_SWAP_WRONG, this, this._onWrong.bind(this), model);
    }
    BallView.prototype = Object.create(ADCore.Display.prototype);
    BallView.prototype.constructor = BallView;
    var p = BallView.prototype;

     /**
     * @method _OnStateChange
     * @memberof BallView
     * @private
     * @listens Event.ON_BALL_STATE_CHANGE
     * @param {Object} caller -  Dispatcher of the event.
     * @param {Object} params - The given parameters.
     * @param {String} params.state - The new state.
     */
    p._onStateChange = function (caller, params) {
        switch (params.state) {
            case ballpit.BallStates.REVERTING:
                this.Play(ballpit.ballAnimations.SWIPE_FAIL);
            break;
        }
    };

     /**
     * @method _OnDestroy
     * @memberof BallView
     * @private
     * @listens Event.ON_BALL_DESTROY
     * @param {Object} caller -  Dispatcher of the event.
     * @param {Object} params - The given parameters.
     * @param {String} params.callback - A callback is a functions that is executed in response to the event.
     */
    p._onDestroy = function (caller, params) {
        var animation = this.Play(ballpit.ballAnimations.PLOP);
        animation.onComplete.add(params.callback);

        var explosion = new ADCore.Sprite(new Vector2(0,0), "explosion");
        this.addChild(explosion);
        explosion.Play("explosion", null, null, true);

        explosion.bringToTop();
    };

    /**
     * @method _OnWrong
     * @memberof BallView
     * @private
     * @param {BallModel} caller
     * @param {Object} params
     */
    p._onWrong = function (caller, params) {
        this.Play(ballpit.ballAnimations.SWIPE_FAIL); 
    };

     /**
     * @method Dispose
     * @memberof BallView
     * @public
     */
    p.__display_dispose = p.Dispose;
    p.Dispose = function () {
        this.__display_dispose();
    };

    return BallView;
}());