/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.TaskBoard = (function () {

    /**
     * @class TaskBoard
     * @constructor 
     * @extends Interface
     * @param {Vector2} position
     * @param {String} key
     * @param {CoachModel} coach
     */
    function TaskBoard(position, key, coach) {
        /**
         * @property {CoachModel} _Coach
         * @private
         */
        this._coach = coach;

        /**
         * @property {Interface} _Icon
         * @private
         */
        this._icon = null;

        /**
         * @property {Integer} _Amount
         * @private
         */
        this._amount = 0;

        /**
         * @property {String} _Type
         * @private
         */
        this._type = "";

        /**
         * @property {Object} _CurrentTask
         * @private
         */
        this._currentTask = this._coach.activeTask;

        /**
         * @property {Boolean} HasTransitioned
         * @public
         * @default false
         */
        this.hasTransitioned = false;

        ballpit.Speech.call(this,position,key);
    }
    TaskBoard.prototype = Object.create(ballpit.Speech.prototype);
    TaskBoard.prototype.constructor = TaskBoard;
    var p = TaskBoard.prototype;

    /**
     * @method _Initialize
     * @memberof Speech
     * @private
     * @ignore
     */
    p._initialize = function () { 
        this._icon = new ADCore.Interface(new Vector2(-this.width / 2, - this.height / 2), "tennisball");
        this._icon.width = 40;
        this._icon.height = 40;
        this._icon.x += this._icon.width / 2;
        this._icon.y += this._icon.height / 2;
        this._icon.anchor.set(0.5, 0.5);
        this.addChild(this._icon);

        this._text = new ADCore.Text().Position(new Vector2(this._icon.x, this._icon.y)).Size(12).Font("djb-bbi").Wrap(this.width).Finish();
        this._text.x += this._icon.width * 0.75;
        this._text.y += this._icon.height * 0.15;
        this._text.anchor.set(0, 0.5);
        this.addChild(this._text);
    };

    /**
     * @method Render
     * @memberof TaskBoard
     * @public
     */
    p.Render = function () {
        this._currentTask = this._coach.activeTask;
        
        if (this._currentTask.amount != this._amount) {
            this._amount = this._currentTask.amount;
            var message = this._amount.toString();
            var speed = 50;

            if (this.IsTalking()) { 
                this.Mute();
                this.Talk(message, speed);
            } else {
                this.Talk(message, speed);
            }
        }

        if (this._currentTask.type != this._type) {
            this._type = this._currentTask.type;
            this._icon.loadTexture(this._type);
        }
    };

    /**
     * @method TransitionIn
     * @memberof TaskBoard
     * @public 
     */
    p.TransitionIn = function () {
        this.hasTransitioned = true;
        TweenLite.to(this.scale, 0.2, { x: 1, y: 1 })
    };

    /**
     * @method TransitionOut
     * @memberof TaskBoard
     * @public 
     */
    p.TransitionOut = function () {
        this.hasTransitioned = false;
        TweenLite.to(this.scale, 0.2, { x: 0, y: 0 })
    };

    p.__speech_dispose = p.Dispose;
    p.Dispose = function () {
        this.__speech_dispose();
    };

    p.__speech_gettersAndSetters = p.gettersAndSetters;
    p.gettersAndSetters = function () {
        this.__speech_gettersAndSetters();

        this.Get("effectLocation", function () {
            return new Vector2(this._icon.absoluteX, this._icon.absoluteY);
        });
    };

    return TaskBoard;
}());
