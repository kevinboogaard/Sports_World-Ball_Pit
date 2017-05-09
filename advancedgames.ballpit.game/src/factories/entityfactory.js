var ballpit = ballpit || {};
ballpit.EntityFactory = {};

/**'
 * 'AddBall '
 * @param {balltype} 'type'
 * @param {vector2} 'position'
 */
ballpit.EntityFactory.AddBall = function(position,type){
    var model = new ballpit.BallModel(position,type);
    Listener.Dispatch(ADCore.Event.ON_MODEL_ADD, this, { "model": model, "key": type, "viewtype": ballpit.BallView});
    return model;
};