/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};
ballpit.Event = ballpit.Event || {};

/**
 * @event ON_TASK_DONE
 */
ballpit.Event.ON_TASK_DONE = "on_task_done";

/**
 * @event ON_TASK_DONE
 */
ballpit.Event.ON_TASK_SPAWN = "on_tast_spawn";

ballpit.CoachModel = (function () {

    /**'
     * @class CoachModel
     * @constructor 
     * @param {Vector2} position
     * @param {TaskHandler} taskhandler
     */
    function CoachModel(position, taskhandler) {

        /**
         * @property {TaskHandler} taskhandler
         * @private
         */
        this._taskhandler = taskhandler;

        /**
         * @property {Vector2} position
         * @public
         */
        this.position = position;

        /**
         * @property {Boolean} inTraining
         * @public
         * @readonly
         * @default false
         */
        this.inTraining = false;

        /**
         * @property {Array} tasks
         * @private
         * @default Empty
         */
        this._tasks = [];

        /**
         * @property {Stopwatch} stopwatch
         * @private
         */
        this._stopwatch = SetStopwatch();

        Listener.Listen(ballpit.Event.ON_BALL_ALIGN, this, this._onBallAlign.bind(this));
    }
    var p = CoachModel.prototype;

    /**
     * @method Start
     * @memberof CoachModel
     */
    p.Start = function () {
        this.inTraining = true;

        if (this._tasks.length === 0) {
            this._tasks = this._taskhandler.GetNewStage();
        }

        if(this._stopwatch) this._stopwatch.Start();
    };
    
    /**
     * @method Stop
     * @memberof CoachModel
     */
    p.Stop = function () {
        this.inTraining = false;
        if(this._stopwatch) this._stopwatch.Stop();
    };
    
    /**
     * @method Reset
     * @memberof CoachModel
     */
    p.Reset = function () {
        if (this._stopwatch) this._stopwatch.Reset();

        if (this.inTraining) {
            this._tasks = [];
            this.Start();
        } else {
            this._tasks = [];
            this.Stop();
        }
    };

    /**
     * @method OnBallAlign
     * @memberof CoachModel
     * @private
     * @param {Object} caller
     * @param {Object} params
     * @param {TileModel} params.owner
     * @param {Array} params.aligned
     * @ignore
     */
    p._onBallAlign = function (caller, params) {
        if (this._tasks.length === 0) return;

        var current_task = this._tasks[0];
        var current_type = current_task.type;

        var type = params.owner.occupier.type;
        var amount = params.aligned.length + 1; // + 1 = owner.

        if (current_type === type) {
            current_task.amount -= amount;
            console.log(current_task.amount);
        }
    };
    
    /**
     * @method Dispose
     * @memberof CoachModel
     */
    p.Dispose = function () {
        throw new Error("Dispose not made yet");
    };

    return CoachModel;
})();