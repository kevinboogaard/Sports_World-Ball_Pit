/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.InterfaceLayer = (function () {

    /**
     * @class InterfaceLayer
     * @constructor 
     * @extends Phaser.Group
     * @param {Timer} gameTimer 
     * @param {ScoreHolder} scoreHolder
     * @param {CoachModel} coach
     */
    function InterfaceLayer(gameTimer, scoreHolder, coach) {
        Phaser.Group.call( this, ADCore.phaser, null, "Interface Layer" );

        /**
         * @property {Watch} watch 
         * @public
         */
        this.watch = null;

        /**
         * @property {ScoreBoard} ScoreBoard 
         * @public
         */
        this.scoreboard = null;

        /**
         * @property {TaskBoard} TaskBoard 
         * @public
         */
        this.taskboard = null;

        this._initialize(gameTimer, scoreHolder, coach);
    }
    InterfaceLayer.prototype = Object.create( Phaser.Group.prototype );
    InterfaceLayer.prototype.constructor = InterfaceLayer;
    var p = InterfaceLayer.prototype;

    /**
     * @method _Initialize
     * @memberof InterfaceLayer
     * @private
     * @param {Timer} gameTimer 
     * @param {ScoreHolder} scoreHolder
     * @param {CoachModel} coach
     * @ignore
     */
    p._initialize = function (gameTimer, scoreHolder, coach) {
        this.scoreboard = new ballpit.ScoreBoard(new Vector2(10, 10), "scoreboard", scoreHolder);
        this.addChild(this.scoreboard);

        this.watch = new ballpit.Watch(new Vector2(this.scoreboard.width, 10), "stopwatch", gameTimer);
        this.watch.x += this.watch.width * 0.33;
        this.addChild(this.watch);

        this.taskboard = new ballpit.TaskBoard(new Vector2(Config.Core.Dimensions.width * 0.33, 125), "bubble", coach);
        this.taskboard.x -= this.taskboard.width * 0.33;
        this.addChild(this.taskboard);
    };

    /**
     * @method Render
     * @memberof InterfaceLayer
     * @public
     */
    p.Render = function () {
        this.watch.Render();
        this.scoreboard.Render();
        this.taskboard.Render();
    };

    return InterfaceLayer;
})();