/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};
ballpit.Event = ballpit.Event || {};

/**
 * @event ON_TASK_BEGIN
 */
ballpit.Event.ON_TASK_BEGIN = "on_tast_begin";

/**
 * @event ON_TASK_DONE
 */
ballpit.Event.ON_TASK_DONE = "on_task_done";

/**
 * @event ON_STAGE_BEGIN
 */
ballpit.Event.ON_STAGE_BEGIN = "on_stage_begin";

/**
 * @event ON_STAGE_END
 */
ballpit.Event.ON_STAGE_DONE = "on_stage_done";

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
            Listener.Dispatch(ballpit.Event.ON_STAGE_BEGIN, this);
            console.log("NEW STAGE: " + this._tasks[0].type + ", amount: " + this._tasks[0].amount );
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
        if (this.inTraining === false) return;

        var current_task = this._tasks[0];
        var current_type = current_task.type;

        var type = params.owner.occupier.type;
        var amount = params.aligned.length + 1; // + 1 = owner.

        if (current_type === type) {
            current_task.amount -= amount;
            if (current_task.amount < 0) current_task.amount = 0;

            console.log("CURRENT TASK: " + this._tasks[0].type + ", amount left:" + this._tasks[0].amount );
            if (current_task.amount <= 0) {
                Listener.Dispatch(ballpit.Event.ON_TASK_DONE, this);

                this._tasks.splice(0, 1);

                if (this._tasks.length === 0) {
                    Listener.Dispatch(ballpit.Event.ON_STAGE_DONE, this);

                    this.Stop();
                    this._stopwatch.Round();
                    this.Start();
                }

                Listener.Dispatch(ballpit.Event.ON_TASK_BEGIN, this);
                console.log("NEW TASK: " + this._tasks[0].type + ", amount: " + this._tasks[0].amount );
            }
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