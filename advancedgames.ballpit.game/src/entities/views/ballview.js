var ballpit = ballpit || {};

ballpit.ballAnimations = ballpit.ballAnimations || {};
ballpit.ballAnimations.HINT = "hint";
ballpit.ballAnimations.PLOP = "plop";
ballpit.ballAnimations.SWIPE_FAIL = "swipefail";

ballpit.BallView = (function () {

    /**
     * BallView class.
     * @extends Display,
     * @param {TileModel} model.
     * @param {String} key.
     */
    function BallView(model, key) {
        ADCore.Display.call( this, model, key );
        Listener.Listen(ballpit.Event.ON_BALL_STATE_CHANGE, this, this._onStateChange.bind(this), model);
    }
    BallView.prototype = Object.create(ADCore.Display.prototype);
    BallView.prototype.constructor = BallView;
    var p = BallView.prototype;

    /**
     * 'OnStateChange'
     * @params {BallModel} 'caller'
     * @params { { BallStates } : "state" } 'params'
     */
    p._onStateChange = function (caller, params) {
        switch (params.state) {
            case ballpit.BallStates.REVERTING:
                this.Play(ballpit.ballAnimations.SWIPE_FAIL);
            break;
        }
    };

    /**
     * 'Dispose'
     */
    p.__display_dispose = p.Dispose;
    p.Dispose = function () {
        this.__display_dispose();
    };

    return BallView;
}());