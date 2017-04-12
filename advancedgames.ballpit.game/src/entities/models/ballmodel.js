var ballpit = ballpit || {};

ballpit.ballTypes = ballpit.ballTypes || {};
ballpit.ballTypes.FOOTBALL = "football";
ballpit.ballTypes.BASKETBALL = "basketball";
ballpit.ballTypes.TENNISBALL = "tennisball";
ballpit.ballTypes.BOWLINGBALL = "bowlingball";
ballpit.ballTypes.BASEBALL = "baseball";

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
    p.dispose = function () {
        delete this.balltype;
    };

    return BallModel;
}());