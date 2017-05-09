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
     * @param {Array} stages - Lists of stages with the stages that come in the current level.
     */
    function TaskHandler(stages) {
        
        /**
         * @property {Array} stages
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

                var type = task.type;
                var amount = task.amount;

                if (type === "random") {
                    var keys = Object.keys(ballpit.ballTypes);
                    type = ballpit.ballTypes[keys[ keys.length * Math.random() << 0]];
                } 

                if (typeof amount === 'object') {
                    amount = Math.randomRange(task.amount.min, task.amount.max);
                }

                stage.push({ "type": type, "amount": amount });
            }
        }

        return stage;
    };

    return TaskHandler;
})();