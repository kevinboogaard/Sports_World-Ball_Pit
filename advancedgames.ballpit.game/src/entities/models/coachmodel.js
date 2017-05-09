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
    }
    var p = CoachModel.prototype;

    return CoachModel;
})();