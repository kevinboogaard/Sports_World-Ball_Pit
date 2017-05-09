/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};
ballpit.Event = ballpit.Event || {};

/**
 * @event ON_STAGE_END
 */
ballpit.Event.ON_STAGE_END = "on_round_begin";

/**
 * @event ON_STAGE_END
 */
ballpit.Event.ON_STAGE_END = "on_round_done";

ballpit.TaskHandler = (function() {

    /**
     * @class TaskHandler
     * @constructor
     * @param {Array} tasks - Lists of tasks with the tasks that come in the current level.
     */
    function TaskHandler(tasks) {
        
        /**
         * @property {Array} tasks
         * @private
         */
        this._tasks = tasks;
    }
    var p = TaskHandler.prototype;

    /**
     * @method GetNewStage
     * @memberof TaskHandler
     * @public
     */
    p.GetNewStage = function () {

    };

    return TaskHandler;
})();