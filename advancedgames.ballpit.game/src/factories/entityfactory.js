var ballpit = ballpit || {};
ballpit.EntityFactory = {};

/**'
 * 'AddBall '
 * @param {balltype} 'type'
 * @param {vector2} 'position'
 */
ballpit.EntityFactory.AddBall = function(position,type){
    var model = new ballpit.BallModel(position,type);
    var key;

    switch (type) {
        case ballpit.ballTypes.BOWLINGBALL:
            key = "asset_bowlingball";
            break;

        case ballpit.ballTypes.BASKETBALL:
            key = "asset_basketball";
            break;     

        case ballpit.ballTypes.FOOTBALL:
            key = "asset_soccerball";
            break;
    
        case ballpit.ballTypes.BASEBALL:
            key = "asset_baseball";
            break;

        case ballpit.ballTypes.TENNISBALL:
            key = "asset_tennisball";
            break;

        default:
            throw new Error("Type not known");
    }
 
    Listener.Dispatch(ADCore.Event.ON_MODEL_ADD, this, { "model": model, "key": key, "viewtype": ADCore.Display});
    return model;
};