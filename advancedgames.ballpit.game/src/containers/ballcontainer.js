var ballpit = ballpit || {};

ballpit.BallContainer = (function () {

    /**'
     * 'BallContainer'
     */
    function BallContainer() {
        this.balls = [];
    }
    var p = BallContainer.prototype;
    
    /**'
     * 'AddBall'
     * @param {vector2} 'position'
     * @param {balltype} 'type'
     */
    p.AddBall = function(position,type){
        var ballModel = new ballpit.EntityFactory.AddBall(position,type);
        this.balls.push(ballModel);
        return ballModel;
    };

    /**'
     * 'AddRandomBall'
     * @param {vector2} 'position'
     */
    p.AddRandomBall = function (position) {
        var types = ballpit.ballTypes.LIST;
        var randomType = types[Math.randomRange(0, types.length - 1)];

        return this.AddBall(position, randomType);
    };

     /**'
     * 'AddBall'
     * @param {ball} 'ball'
     */
    p.RemoveBall = function(ball){
        var index = this.balls.indexOf(ball);
        this.balls.splice(index, 1);

        Listener.Dispatch(ADCore.Event.ON_MODEL_REMOVE, this, { "model": ball});
        ball.Dispose();
    };

    return BallContainer;
})();