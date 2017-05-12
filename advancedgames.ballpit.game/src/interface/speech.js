/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.Event = ballpit.Event || {};
ballpit.Event.ON_SPEECH_DONE = "on_speech_done";

ballpit.Speech = (function () {

    /**'
     * @class Speech
     * @constructor 
     * @extends Interface
     * @param {Vector2} position
     * @param {String} key
     */
    function Speech(position, key) {
        ADCore.Interface.call(this,position,key);

        this._text = null;

        this._string = null;
        this._interval = -1;

        this._index = 0;
        this._id = -1;

        this._initialize();
    }
    Speech.prototype = Object.create(ADCore.Interface.prototype);
    Speech.prototype.constructor = Speech;
    var p = Speech.prototype;

    /**
     * @method Initialize
     * @memberof Speech
     * @private
     * @ignore
     */
    p._initialize = function () { 
        this._text = new ADCore.Text().Position(new Vector2( this.width / 2, 10)).Font("comfortaa").Wrap(this.width * 0.9).Finish();
        this._text.anchor.set(0.5, 0);
        this.addChild(this._text);
    };

    /**
     * @method Talk
     * @memberof Speech
     * @public
     */
    p.Talk = function (text, interval) { 
        if (this._id !== -1) throw new Error("The speech is already talking");
        this._text.text = ""; 
        this._string = text;
        this._interval = interval;
        this._start();
    };

    /**
     * @method Mute
     * @memberof Speech
     * @public
     */
    p.Mute = function () { 
            this._stop();
            this._reset();
            Listener.Dispatch(ballpit.Event.ON_SPEECH_DONE, this);
    };

    /**
     * @method IsTalking
     * @memberof Speech
     * @public 
     * @returns {Boolean} result
     */
    p.IsTalking = function () {
        return (this._id !== -1);
    };

    /**
     * @method Start
     * @memberof Speech
     * @private
     */
    p._start = function () { 
        this._id = setInterval(this._update.bind(this), this._interval);
    };

    /**
     * @method Stop
     * @memberof Speech
     * @private
     */
    p._stop = function () { 
        clearInterval(this._id);
        this._id = -1;
    };

    /**
     * @method AddLetter
     * @memberof Speech
     * @private
     */
    p._addLetter = function(letter) {
          this._text.text += letter;
    };
    
    /**
     * @method Update
     * @memberof Speech
     * @private
     */
    p._update = function() {
        var letter = this._string.charAt(this._index);
        this._addLetter(letter);
        this._index++;

        if (this._index === this._string.length) {
            this.Mute();
        }
    };

    /**
     * @method Reset
     * @memberof Speech
     * @private
     */
    p._reset = function () {
        this._string = null;
        this._interval = -1;
        this._index = 0;
    };

    /**
     * @method Render
     * @memberof Speech
     * @public
     */
    p.Render = function () {
        
    };

    return Speech;
}());
