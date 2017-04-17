var ballpit = ballpit || {};

ballpit.Event = ballpit.Event || {};
ballpit.Event.ON_BALL_DESTINATION_REACHED = "on_ball_destination_reached";

ballpit.ballTypes = ballpit.ballTypes || {};
ballpit.ballTypes.FOOTBALL = "football";
ballpit.ballTypes.BASKETBALL = "basketball";
ballpit.ballTypes.TENNISBALL = "tennisball";
ballpit.ballTypes.BOWLINGBALL = "bowlingball";
ballpit.ballTypes.BASEBALL = "baseball";

ballpit.BallStates = ballpit.BallStates || {};
ballpit.BallStates.IDLING = "idling";
ballpit.BallStates.SWAPPING = "swapping";
ballpit.BallStates.REVERTING = "reverting";
ballpit.BallStates.FALLING = "falling";

ballpit.BallModel = (function () {

    /**'
     * 'BallModel'* 
     *  @param {vector2} 'position'
     *  @param {balltype} 'type'
     */
    function BallModel(position, type) {
        ADCore.Entity.call(this, position);

        this._type = type;
        this._state = ballpit.BallStates.IDLING;
        this._velocity = Settings.Velocity.BALL;

        this.beginning = null;
        this._destination = null;
    }
    BallModel.prototype = Object.create(ADCore.Entity.prototype);
    BallModel.prototype.constructor = BallModel;
    var p = BallModel.prototype;

    /**
     * 'Update'
     */
    p.Update = function () {
        if (this.isMoving) {
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
     * SwapTo
     * @param {Vector2} 'vector'
     */
    p.SwapTo = function (vector) {
        this._destination = vector.Clone();
        this._state = ballpit.BallStates.SWAPPING;
    };

    /**
     * Revert
     */
    p.Revert = function () {
        this._state = ballpit.BallStates.REVERTING;
    };

    /**
    * 'Dispose '
    */
    p.__entity_dispose = p.Dispose;
    p.Dispose = function () {
        delete this._type;
        delete this._state;
        delete this._velocity;
        this.__entity_dispose();
    };

    /**
     * 'GettersAndSetters'
     */
    p.__entity_gettersAndSetters = p.gettersAndSetters;
    p.gettersAndSetters = function () {
        this.Get( "type", function () {
            return this._type;
        } );

        this.Define( "state", {
            "get": function () {
                return this._state;
            },
            "set": function (value) {
                if (ADCore.Utilities.HasObjectValue(ballpit.BallStates, value) === false) throw new Error(state + ":State doesn't exist");
                this._state = value;
            }
        });

        this.Get( "velocity", function () {
                return this._velocity;
        });

        this.Get("isMoving", function () {
            var state_moving = (this._state === ballpit.BallStates.SWAPPING || this._state === ballpit.BallStates.REVERTING || this._state === ballpit.BallStates.FALLING);
            var destination_exists = (this._destination);
            return (state_moving && destination_exists);
        });
        this.__entity_gettersAndSetters();
    };

    return BallModel;
}());