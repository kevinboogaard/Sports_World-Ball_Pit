/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

/**
 * @namespace Event
 */
this.Event; // For documentation purposes.
ballpit.Event = ballpit.Event || {};

/**
 * @property {String} ON_TASK_BEGIN
 * @memberof Event
 * @readonly
 */
ballpit.Event.ON_TASK_BEGIN = "on_tast_begin";

/**
 * @property {String} ON_TASK_DONE
 * @memberof Event
 * @readonly
 */
ballpit.Event.ON_TASK_DONE = "on_task_done";

/**
 * @property {String} ON_STAGE_BEGIN
 * @memberof Event
 * @readonly
 */
ballpit.Event.ON_STAGE_BEGIN = "on_stage_begin";

/**
 * @property {String} ON_STAGE_DONE
 * @memberof Event
 * @readonly
 */
ballpit.Event.ON_STAGE_DONE = "on_stage_done";


ballpit.Coach = ballpit.Coach || {};

/**
 * @namespace CoachEmotions
 */
let CoachEmotions = {}; // For documentation purposes.
ballpit.Coach.Emotions = CoachEmotions; 

/**
 * @property {String} NEUTRAL
 * @memberof CoachEmotions
 * @readonly
 */
ballpit.Coach.Emotions.NEUTRAL = "neutral";

/**
 * @property {String} ANGRY
 * @memberof CoachEmotions
 * @readonly
 */
ballpit.Coach.Emotions.ANGRY = "angry";

/**
 * @property {String} HAPPY
 * @memberof CoachEmotions
 * @readonly
 */
ballpit.Coach.Emotions.HAPPY = "happy";

/**
 * @property {String} SUPER_ANGRY
 * @memberof CoachEmotions
 * @readonly
 */
ballpit.Coach.Emotions.SUPER_ANGRY = "super_angry";

/**
 * @property {String} SUPER_HAPPY
 * @memberof CoachEmotions
 * @readonly
 */
ballpit.Coach.Emotions.SUPER_HAPPY = "super_happy";

/**
 * @namespace CoachStates
 */
let CoachStates = {}; // For documentation purposes.
ballpit.Coach.States = CoachStates; 

/**
 * @property {String} IDLE
 * @memberof CoachStates
 * @readonly
 */
ballpit.Coach.States.IDLE = "idle";

/**
 * @property {String} WALK
 * @memberof CoachStates
 * @readonly
 */
ballpit.Coach.States.WALK = "walk";

/**
 * @property {String} TALK
 * @memberof CoachStates
 * @readonly
 */
ballpit.Coach.States.TALK = "talk";

ballpit.CoachModel = (function () {

    /**
     * @class CoachModel
     * @extends Entity
     * @constructor 
     * @param {Vector2} position
     * @param {TaskHandler} taskhandler
     */
    function CoachModel(position, taskhandler) {
        ADCore.Entity.call(this, position);

        /**
         * @property {Boolean} InTraining
         * @public
         * @readonly
         * @default false
         */
        this.inTraining = false;

        /**
         * @property {States} State
         * @public
         * @readonly
         * @default States.IDLE
         */
        this.state = ballpit.Coach.States.IDLE;

        /**
         * @property {Emotions} Emotion
         * @public
         * @readonly
         * @default Emotions.NEUTRAL
         */
        this.emotion = ballpit.Coach.Emotions.NEUTRAL;

        /**
         * @property {TaskHandler} _Taskhandler
         * @private
         */
        this._taskhandler = taskhandler;

        /**
         * @property {Array} _Tasks
         * @private
         * @default Empty
         */
        this._tasks = [];

        /**
         * @property {Stopwatch} _Stopwatch
         * @private
         */
        this._stopwatch = SetStopwatch();

        Listener.Listen(ballpit.Event.ON_BALL_ALIGN, this, this._onBallAlign.bind(this));
    }
    CoachModel.prototype = Object.create(ADCore.Entity.prototype);
    CoachModel.prototype.constructor = CoachModel;
    var p = CoachModel.prototype;

    /**
     * @method Start
     * @memberof CoachModel
     * @public
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
     * @public
     */
    p.Stop = function () {
        this.inTraining = false;
        if(this._stopwatch) this._stopwatch.Stop();
    };
    
    /**
     * @method Reset
     * @memberof CoachModel
     * @public
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
     * @method _OnBallAlign
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
     * @public
     */
    p.Dispose = function () {
        throw new Error("Dispose not made yet");
    };

    /**
     * Getters & Setters internal function.
     * 
     * @method GettersAndSetters
     * @memberof CoachModel
     * @private 
     * @ignore
     */
    p.__entity_gettersAndSetters = p.gettersAndSetters;
    p.gettersAndSetters = function () {
        this.Get( "activeTask", function () {
            return this._tasks[0];
        });
        this.__entity_gettersAndSetters();
    };

    return CoachModel;
})();