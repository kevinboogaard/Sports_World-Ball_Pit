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

/**'
 * 'AddCoach'
 * @param {Vector2} 'position'
 */
ballpit.EntityFactory.AddCoach = function(position, key, taskhandler){
    var model = new ballpit.CoachModel(position, taskhandler);
    Listener.Dispatch(ADCore.Event.ON_MODEL_ADD, this, { "model": model, "key": key, "viewtype": ballpit.CoachView});
    return model;
};