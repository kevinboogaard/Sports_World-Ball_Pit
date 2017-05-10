/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.InterfaceLayer = (function () {

    /**'
     * @class InterfaceLayer
     * @constructor 
     * @extends Phaser.Group
     * @param {Timer} gameTimer 
     * @param {ScoreHolder} scoreHolder
     */
    function InterfaceLayer(gameTimer, scoreHolder) {
        Phaser.Group.call( this, ADCore.phaser, null, "Interface Layer" );

        this.watch = null;
        this.scoreboard = null;
        this.coachView = null;

        this._initialize(gameTimer, scoreHolder);
    }
    InterfaceLayer.prototype = Object.create( Phaser.Group.prototype );
    InterfaceLayer.prototype.constructor = InterfaceLayer;
    var p = InterfaceLayer.prototype;

    /**
     * @method _initialize
     * @memberof InterfaceLayer
     * @private
     * @param {Timer} gameTimer 
     * @param {ScoreHolder} scoreHolder
     * @param {CoachModel} coachModel 
     * @ignore
     */
    p._initialize = function (gameTimer, scoreHolder, coachModel) {
        this.watch = new ballpit.Watch(new Vector2(0,0), "stopwatch", gameTimer);
        this.addChild(this.watch);

        this.scoreboard = new ballpit.ScoreBoard(new Vector2(0,0), "scoreboard", scoreHolder);
        this.addChild(this.scoreboard);
    };

    /**
     * @method Render
     * @memberof InterfaceLayer
     * @public
     */
    p.Render = function () {
        this.watch.Render();
        this.scoreboard.Render();
    };

    return InterfaceLayer;
})();