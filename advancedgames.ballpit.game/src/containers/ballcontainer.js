/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.BallContainer = (function () {

     /**
     * @class ballpit.BallContainer
     * @constructor
     */
    function BallContainer() {
        this.balls = [];
    }
    var p = BallContainer.prototype;
    
     /**
     * @method Update
     * @memberof ballpit.BallContainer
     * @public
     */
    p.Update = function () {
        var len = this.balls.length;
        for (var i = len - 1; i >= 0; i--) {
            var ball = this.balls[i];
            ball.Update();
        }
    };

    /**
     * @method AddBall
     * @memberof ballpit.BallContainer
     * @public
     * @param {Vector2} position - the position of the added ball
     * @param {type} type - The type of a ball
     */
    p.AddBall = function(position,type){
        var ballModel = new ballpit.EntityFactory.AddBall(position,type);
        this.balls.push(ballModel);
        return ballModel;
    };

    /**
     * @method AddRandomBall
     * @memberof ballpit.BallContainer
     * @public
     * @param {Vector2} position - the position of the added ball
     */
    p.AddRandomBall = function (position) {
        var keys = Object.keys(ballpit.ballTypes);
        var randomType = ballpit.ballTypes[keys[ keys.length * Math.random() << 0]];

        return this.AddBall(position, randomType);
    };
    
    /**
     * @method RemoveBall
     * @memberof ballpit.BallContainer
     * @public
     * @param {ball} ball - the ball
     */
    p.RemoveBall = function(ball){
        var index = this.balls.indexOf(ball);
        this.balls.splice(index, 1);

        ball.Destroy( function () { 
            Listener.Dispatch(ADCore.Event.ON_MODEL_REMOVE, this, { "model": ball});
            ball.Dispose();
        }.bind(this));
    };

    return BallContainer;
})();