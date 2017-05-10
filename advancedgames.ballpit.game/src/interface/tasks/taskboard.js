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
     * @param {TaskHandler} taskHandler
     */
    function TaskBoard(position, key, taskHandler) {
        ADCore.Interface.call(this,position,key);

        this._taskHandler = taskHandler;

        this._initialize();
    }
    TaskBoard.prototype = Object.create(ADCore.Interface.prototype);
    TaskBoard.prototype.constructor = TaskBoard;
    var p = TaskBoard.prototype;

    /**
     * @method Initialize
     * @memberof TaskBoard
     * @private
     * @ignore
     */
    p._initialize = function () { 

    };

    /**
     * @method Render
     * @memberof TaskBoard
     * @public
     */
    p.Render = function () {
        
    };

    return TaskBoard;
}());
