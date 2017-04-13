var ballpit = ballpit || {};

ballpit.ballTypes = ballpit.ballTypes || {};
ballpit.ballTypes.FOOTBALL = "football";
ballpit.ballTypes.BASKETBALL = "basketball";
ballpit.ballTypes.TENNISBALL = "tennisball";
ballpit.ballTypes.BOWLINGBALL = "bowlingball";
ballpit.ballTypes.BASEBALL = "baseball";

ballpit.ballTypes.LIST = [
    ballpit.ballTypes.FOOTBALL,
    ballpit.ballTypes.BASKETBALL,
    ballpit.ballTypes.TENNISBALL,
    ballpit.ballTypes.BOWLINGBALL,
    ballpit.ballTypes.BASEBALL
];

ballpit.BallModel = (function () {

    /**'
     * 'BallModel'* 
     *  @param {vector2} 'position'
     *  @param {balltype} 'type'
     */
    function BallModel(position, type) {
        ADCore.Entity.call(this, position);

        this.balltype = type;
    }
    BallModel.prototype = Object.create(ADCore.Entity.prototype);
    BallModel.prototype.constructor = BallModel;
    var p = BallModel.prototype;

    /**'
    * 'dispose '
    */
    p.__entity_dispose = p.Dispose;
    p.Dispose = function () {
        delete this.balltype;
        this.__entity_dispose();
    };

    return BallModel;
}());