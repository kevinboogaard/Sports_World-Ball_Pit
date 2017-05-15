/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.TaskHandler = (function() {

    /**
     * @class TaskHandler
     * @constructor
     * @param {Array} stages - Lists of stages with the stages that come in the current level.
     */
    function TaskHandler(stages) {
        
        /**
         * @property {Array} _Stages
         * @private
         */
        this._stages = stages;
    }
    var p = TaskHandler.prototype;

    /**
     * @method GetNewStage
     * @memberof TaskHandler
     * @public
     */
    p.GetNewStage = function () {
        var stage = [];

        var difficulty_len = this._stages.length;
        for (var i = 0; i< difficulty_len; i++) {
            var difficulty = this._stages[i];

            var tasks_len = difficulty.length;
            for (var j = 0; j < tasks_len; j++) {
                var task = difficulty[j];
                task = this._parseTask(task);
                stage.push({ "type": task.type, "amount": task.amount });
            }
        }

        return stage;
    };

    /**
     * @method _ParseTask
     * @memberof TaskHandler
     * @private
     * @param {Object} jsonTask
     * @returns {Object} parsedTask
     */
    p._parseTask = function (jsonTask) {
        var parsedTask = jsonTask;

        if (parsedTask.type === "random") {
            var keys = Object.keys(ballpit.BallTypes);
            parsedTask.type = ballpit.BallTypes[keys[ keys.length * Math.random() << 0]];
        } 

        if (typeof parsedTask.amount === "object") {
            parsedTask.amount = Math.randomRange(parsedTask.amount.min, parsedTask.amount.max);
        }

        return parsedTask;
    };

    return TaskHandler;
})();