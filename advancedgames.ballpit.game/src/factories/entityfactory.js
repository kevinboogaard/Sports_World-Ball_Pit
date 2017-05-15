/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

/**
 * @namespace EntityFactory
 */
let EntityFactory = {}; // For documentation purposes.
ballpit.EntityFactory = EntityFactory;

/**
 * @method AddBall
 * @memberof EntityFactory 
 * @param {Vector2} position - 
 * @param {BallContainer} ballContainer - 
 */
ballpit.EntityFactory.AddBall = function(position,type){
    var model = new ballpit.BallModel(position,type);
    Listener.Dispatch(ADCore.Event.ON_MODEL_ADD, this, { "model": model, "key": type, "viewtype": ballpit.BallView});
    return model;
};

/**
 * @method AddCoach
 * @memberof EntityFactory
 * @param {Vector2} position
 * @param {BallType} type
 * @param {TaskHandler} taskhandler
 */
ballpit.EntityFactory.AddCoach = function(position, type, taskhandler){
    var model = new ballpit.CoachModel(position, taskhandler);
    Listener.Dispatch(ADCore.Event.ON_MODEL_ADD, this, { "model": model, "key": type, "viewtype": ballpit.CoachView});
    return model;
};