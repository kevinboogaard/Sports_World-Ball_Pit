var ballpit = ballpit || {};

ballpit.BallModel = (function () {

    /**'
     * 'BallModel'
     */
    function BallModel(position, type) {
        ADCore.Entity.call(this, position);

        this.balltype = type;
    }
    BallModel.prototype = Object.create(ADCore.Entity.prototype);
    BallModel.prototype.constructor = BallModel;

    var p = BallModel.prototype;

    p.dispose = function () {
        delete this.balltype;
    };

    return BallModel;
}());