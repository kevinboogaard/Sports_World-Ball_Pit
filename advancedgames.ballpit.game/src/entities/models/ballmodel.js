var ballpit = ballpit || {};

ballpit.ballTypes = ballpit.ballTypes || {};
ballpit.ballTypes.FOOTBALL = "football";
ballpit.ballTypes.BASKETBALL = "basketball";
ballpit.ballTypes.TENNISBALL = "tennisball";
ballpit.ballTypes.BOWLINGBALL = "bowlingball";
ballpit.ballTypes.BASEBALL = "baseball";

ballpit.Event = ballpit.Event || {};
ballpit.Event.ON_BALL_DESTINATION_REACHED = "on_ball_destination_reached";

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

        this._oldTile = null;
        this._destination = null;
        this.closed = false;

        this.balltype = type;
        this.velocity = Settings.Velocity.BALL;
    }
    BallModel.prototype = Object.create(ADCore.Entity.prototype);
    BallModel.prototype.constructor = BallModel;
    var p = BallModel.prototype;

    /**
     * 'Update'
     */
    p.Update = function () {
        if (this._destination) {
            var distance = this.position.Distance(this._destination);
            
            var difference = new Vector2(this.position.x - this._destination.x, this.position.y - this._destination.y);
            var direction = difference.Normalize();

            if (distance >= 10) {
                var deltaTime = ADCore.phaser.time.elapsed / 1000;
                var vel = direction.Exponentiate(this.velocity * deltaTime);

                this.position.Substract(vel);
            } else {
                this.position = this._destination.Clone();
                this._destination = null;

                Listener.Dispatch(ballpit.Event.ON_BALL_DESTINATION_REACHED, this, { "ball": this });
            }
        }
    };

    /**
     * MoveTo
     * @param {Vector2} 'vector'
     */
    p.MoveTo = function (vector) {
        this._destination = vector.Clone();
    };

    /**
    * 'Dispose '
    */
    p.__entity_dispose = p.Dispose;
    p.Dispose = function () {
        delete this.balltype;
        this.__entity_dispose();
    };

    /**
     * 'GettersAndSetters'
     */
    p.__entity_gettersAndSetters = p.gettersAndSetters;
    p.gettersAndSetters = function () {
        this.Get( "isSwiped", function () {
            return (this._oldTile !== null);
        } );
        this.Define( "beginning", {
            "get": function () {
                return this._oldTile;
            },
            "set": function (value) {
                this._oldTile = value;
            }
        });

        this.__entity_gettersAndSetters();
    };

    return BallModel;
}());