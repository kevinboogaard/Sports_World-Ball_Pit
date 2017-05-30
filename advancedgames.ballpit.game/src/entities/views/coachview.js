/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.CoachView = (function () {

    /**
     * @class CoachView
     * @extends Display
     * @constructor 
     * @param {CoachModel} model
     * @param {String} key
     */
    function CoachView(model, key) {
        ADCore.Display.call( this, model, key + "coachbody" );

        /**
         * @property {Interface} Mouth
         * @public
         */
        this.mouth = null;

        this._initialize(key);
        Listener.Listen(ballpit.Event.ON_COACH_STATE_EMOTION_CHANGE, this, this.PlayEmotionState.bind(this));
    }
    CoachView.prototype = Object.create(ADCore.Display.prototype);
    CoachView.prototype.constructor = CoachView;
    var p = CoachView.prototype;

    /**
     * @method _Initialize
     * @memberof CoachView
     * @private
     * @param {String} key
     */
    p._initialize = function (key) {
        this.anchor.set(0.5, 1);
        this.scale.set(0.75, 0.75);
        
        this.mouth = new ADCore.Interface(new Vector2(0, 0), key + "coachmouth");
        this.mouth.anchor.set(0.5, 0.5);
        this.addChild(this.mouth);
        
        this.PlayEmotionState();
    };

    /**
     * @method Render
     * @memberof CoachView
     * @public
     */
    p.Render = function () {
        this.x = this.model.x;
        this.y = this.model.y;

        var offsetX = 3;
        var offsetY = 3;

        this.mouth.x = offsetX;
        this.mouth.y = -(this.height / 2) + offsetY;
    };

    /**
     * @method Play
     * @memberof CoachView
     * @public
     * @param {String} name
     * @param {Integer} [frameRate = 30]
     * @param {Boolean} [loop = false]
     * @param {Boolean} [killOnComplete = false]
     */
    p.__display_play = p.Play;
    p.Play = function(name, frameRate, loop, killOnComplete){
        this.mouth.Play(name, framerate, loop, killOnComplete);
        this.__display_play(name, frameRate, loop, killOnComplete);
    };

    /**
     * @method PlayEmotionState
     * @memberof CoachView
     * @public
     */
    p.PlayEmotionState = function(caller, params){
        var prms = params || {};

        var fps = prms.fps || 30;
        var loop = (prms.loop === false) ? false : true;

        this.__display_play(this.model.state + "_" + this.model.emotion, fps, loop);
        this.mouth.Play(this.model.emotion + "_" + "mouth", fps, loop);
    };

    /**
     * @method Dispose
     * @memberof CoachView
     * @public
     */
    p.Dispose = function () {
        this.removeChild(this.mouth);
        this.mouth.Dispose();
        delete this.mouth;

        Listener.Mute(ballpit.Event.ON_COACH_STATE_EMOTION_CHANGE, this);
    };

    return CoachView;
})();