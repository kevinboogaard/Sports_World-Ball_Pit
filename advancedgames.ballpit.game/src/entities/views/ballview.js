/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.ballAnimations = ballpit.ballAnimations || {};
ballpit.ballAnimations.HINT = "hint";
ballpit.ballAnimations.PLOP = "plop";
ballpit.ballAnimations.SWIPE_FAIL = "swipefail";

ballpit.BallView = (function () {

    /**
     * @class ballpit.BallView
     * @constructor
     * @param {BallModel} model - The model of the ball
     * @param {String} key - The key of the ballsprite
     */
    function BallView(model, key) {
        ADCore.Display.call( this, model, key );

        Listener.Listen(ballpit.Event.ON_BALL_STATE_CHANGE, this, this._onStateChange.bind(this), model);
        Listener.Listen(ballpit.Event.ON_BALL_DESTROY, this, this._onDestroy.bind(this), model);
    }
    BallView.prototype = Object.create(ADCore.Display.prototype);
    BallView.prototype.constructor = BallView;
    var p = BallView.prototype;

     /**
     * @method OnStateChange
     * @memberof ballpit.BallView
     * @private
     * @listens Event.ON_BALL_STATE_CHANGE
     * @param {Object} caller -  Dispatcher of the event.
     * @param {Object} params - The given parameters.
     * @param {String} params.state - The new state.
     */
    p._onStateChange = function (caller, params) {
        switch (params.state) {
            case ballpit.BallStates.REVERTING:
                //this.Play(ballpit.ballAnimations.SWIPE_FAIL);
            break;
        }
    };

     /**
     * @method OnDestroy
     * @memberof ballpit.BallView
     * @private
     * @listens Event.ON_BALL_DESTROY
     * @param {Object} caller -  Dispatcher of the event.
     * @param {Object} params - The given parameters.
     * @param {String} params.callback - A callback is a functions that is executed in response to the event.
     */
    p._onDestroy = function (caller, params) {
        //var animation = this.Play(ballpit.ballAnimations.PLOP);
        //animation.onComplete.add(params.callback);

        //var explosion = new ADCore.Sprite(new Vector2(0,0), "explosion");
        //this.addChild(explosion);
        //explosion.Play("explosion");

        params.callback();
    };

     /**
     * @method Dispose
     * @memberof ballpit.BallView
     * @public
     */
    p.__display_dispose = p.Dispose;
    p.Dispose = function () {
        this.__display_dispose();
    };

    return BallView;
}());