var ballpit = ballpit || {};

ballpit.BallContainer = (function () {

    /**'
     * 'BallContainer'
     */
    function BallContainer() {
        this.balls = [];
    }
    var p = BallContainer.prototype;
    
    /**
     * 'Update' 
     */
    p.Update = function () {
        var len = this.balls.length;
        for (var i = len - 1; i >= 0; i--) {
            var ball = this.balls[i];
            ball.Update();
        }
    };

    /**
     * 'AddBall'
     * @param {vector2} 'position'
     * @param {balltype} 'type'
     */
    p.AddBall = function(position,type){
        var ballModel = new ballpit.EntityFactory.AddBall(position,type);
        this.balls.push(ballModel);
        return ballModel;
    };

    /**
     * 'AddRandomBall'
     * @param {vector2} 'position'
     */
    p.AddRandomBall = function (position) {
        var keys = Object.keys(ballpit.ballTypes);
        var randomType = ballpit.ballTypes[keys[ keys.length * Math.random() << 0]];

        return this.AddBall(position, randomType);
    };

     /**
     * 'AddBall'
     * @param {ball} 'ball'
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