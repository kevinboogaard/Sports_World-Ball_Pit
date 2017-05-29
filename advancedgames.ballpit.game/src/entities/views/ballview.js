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

        this.scale.set(this.model.scaleX, this.model.scaleY);

        /**
         * @property {Boolean} InAnim
         * @private
         * @default false
         */
        this._inAnim = false;

        Listener.Listen(ballpit.Event.ON_BALL_STATE_CHANGE, this, this._onStateChange.bind(this), model);
        Listener.Listen(ballpit.Event.ON_BALL_DESTROY, this, this._onDestroy.bind(this), model);
        Listener.Listen(ballpit.Event.ON_BALL_SWAP_WRONG, this, this._onWrong.bind(this), model);
    }
    BallView.prototype = Object.create(ADCore.Display.prototype);
    BallView.prototype.constructor = BallView;
    var p = BallView.prototype;

    /** 
     * @method Render
     * @memberof BallView
     * @public
     */
    p.__display_render = p.Render;
    p.Render = function () {
        if (this._inAnim) return;

        if(this.scale.x != this.model.scaleX) this.scale.x = this.model.scaleX;
        if(this.scale.y != this.model.scaleY) this.scale.y = this.model.scaleY;
        if(this.anchor.x != this.model.anchorX) this.anchor.x = this.model.anchorX;
        if(this.anchor.y != this.model.anchorY) this.anchor.y = this.model.anchorY;
        if(this.angle != this.model.angle) this.angle = this.model.angle;

        this.__display_render();
    };

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

        soundSystem.PlaySound("sound_ballexplosion", 3, false);

        explosion.bringToTop();
    };

    /**
     * @method _OnWrong
     * @memberof BallView
     * @private
     * @param {BallModel} caller
     * @param {Object} params
     * @param {Vector2} params.direction
     */
    p._onWrong = function (caller, params) {
        var startpos = new Vector2(this.model.x, this.model.y);

        params.direction.Exponentiate(3);

        this._inAnim = true;
        TweenLite.to(this, 0.1, { x: params.direction.x + startpos.x, y: params.direction.y + startpos.y, onComplete: function(startpos) {
            params.direction.Exponentiate(1);
            TweenLite.to(this, 0.2, { ease: Bounce.easeInOut, x: params.direction.y + startpos.x, onComplete: function(startpos) {
                params.direction.Exponentiate(-1);
                TweenLite.to(this, 0.2, { ease: Bounce.easeInOut, x: params.direction.y + startpos.x, onComplete: function(startpos) {
                    TweenLite.to(this, 0.1, { x: startpos.x, y: startpos.y });
                    this._inAnim = false;
                }.bind(this, startpos)});
            }.bind(this, startpos)});
        }.bind(this, startpos)});
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