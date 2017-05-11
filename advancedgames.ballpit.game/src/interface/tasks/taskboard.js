/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.TaskBoard = (function () {

    /**'
     * @class TaskBoard
     * @constructor 
     * @extends Interface
     * @param {Vector2} position
     * @param {String} key
     * @param {CoachModel} coach
     */
    function TaskBoard(position, key, coach) {
        ballpit.Speech.call(this,position,key);

        this._coach = coach;

        this._currentTask = this._coach.activeTask;
    }
    TaskBoard.prototype = Object.create(ballpit.Speech.prototype);
    TaskBoard.prototype.constructor = TaskBoard;
    var p = TaskBoard.prototype;

    /**
     * @method Initialize
     * @memberof Speech
     * @private
     * @ignore
     */
    p._initialize = function () { 
        this._text = new ADCore.Text().position(new Vector2(30, 10)).weight("bold").size(12).font("comfortaa").wrap(this.width).finish();
        this._text.anchor.set(0, 0);
        this.addChild(this._text);
    };

    /**
     * @method Render
     * @memberof TaskBoard
     * @public
     */
    p.Render = function () {
        if (this._coach.activeTask) {
            if (this._coach.activeTask !== this._currentTask) {
                this._currentTask = this._coach.activeTask; 

                var message = "Collect " + this._currentTask.amount + " " + this._currentTask.type + "s";
                var speed = 50;

                if (this.IsTalking()) { 
                    this.Mute();
                    this.Talk(message, speed);
                } else {
                    this.Talk(message, speed);
                }
            }
        } else {
            this._text.text = "";
        }
    };

    return TaskBoard;
}());
