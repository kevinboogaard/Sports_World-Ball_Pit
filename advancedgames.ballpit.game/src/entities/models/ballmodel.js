/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.Event = ballpit.Event || {};
ballpit.Event.ON_BALL_DESTINATION_REACHED = "on_ball_destination_reached";
ballpit.Event.ON_BALL_STATE_CHANGE = "on_ball_state_change";
ballpit.Event.ON_BALL_DESTROY = "on_ball_destroy";
ballpit.Event.ON_BALL_SWAP_WRONG = "on_ball_swap_wrong";

/**
 * Enum for map orientations.
 * @readonly
 * @enum {String}
 * @typedef {(String)} Orientation
 */
ballpit.ballTypes = {
    /** The SOCCERBALL of all the balls */
    SOCCERBALL: "soccerball",
    /** The BASKETBALL of all the balls */
    BASKETBALL: "basketball",
    /** The TENNISBALL of all the balls */
    TENNISBALL : "tennisball",
    /** The BOWLINGBALL of all the balls */
    BOWLINGBALL : "bowlingball",
    /** The BASEBALL of all the balls */
    BASEBALL : "baseball"
}

ballpit.BallStates = {
    /** The idel state of the ball */
    IDLING : "idling",
    /** The swap state of the ball */
    SWAPPING : "swapping",
    /** The revert state of the ball */
    REVERTING : "reverting",
    /** The falling state of the ball */
    FALLING : "falling"
};
ballpit.BallModel = (function () {

     /**
     * @class ballpit.Core
     * @constructor
     * @param {Vector2} position - The position of the ball
     * @param {type} type - Type of the ball
     */
    function BallModel(position, type) {
        ADCore.Entity.call(this, position);
       
        /**
        * @property {type} type - Type of the ball
        * @public
        */
        this._type = type;       
        
        /**
        * @property {state} State - The states of the ball
        * @private
        */
        this._state = ballpit.BallStates.IDLING;
        
        /**
        * @property {number} velocity - The velocity of the ball
        * @private
        */
        this._velocity = Settings.Velocity.BALL;

        /**
        * @property {bool} beginning - The velocity of the ball
        * @public
        */
        this.beginning = null;

        /**
        * @property {bool} beginning - The velocity of the ball
        * @private
        */
        this._destination = null;
    }
    BallModel.prototype = Object.create(ADCore.Entity.prototype);
    BallModel.prototype.constructor = BallModel;
    var p = BallModel.prototype;

     /**
     * @method Update
     * @memberof ballpit.BallModel
     * @public
     * @param {Number} deltaTime - The number deltatime is a multiplier to convert gametime in to realtime
     */
    p.Update = function (deltaTime) {
        if (this.isMoving) {
            var distance = this.position.Distance(this._destination);
            
            var difference = new Vector2(this.position.x - this._destination.x, this.position.y - this._destination.y);
            var direction = difference.Normalize();

            if (distance >= 10) {
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
     * @method MoveTo
     * @memberof ballpit.BallModel
     * @public
     * @param {vector2} vector - The destenation 
     */
    p.MoveTo = function (vector) {
        this._destination = vector.Clone();
    };

     /**
     * @method SwapTo
     * @memberof ballpit.BallModel
     * @public
     * @param {vector2} vector - The destenation 
     */
    p.SwapTo = function (vector) {
        this._destination = vector.Clone();
        this.state = ballpit.BallStates.SWAPPING;
    };

     /**
     * @method SwapTo
     * @memberof ballpit.BallModel
     * @public
     */
    p.Revert = function () {
        this.state = ballpit.BallStates.REVERTING;
    };

     /**
     * @method SwapTo
     * @memberof ballpit.BallModel
     * @public
     * @param {callback} callback - The destenation 
     */
    p.Destroy = function (callback) {
        Listener.Dispatch(ballpit.Event.ON_BALL_DESTROY, this, { "callback": callback });
    };

     /**
     * @method Dispose
     * @memberof ballpit.BallModel
     * @public
     */
    p.__entity_dispose = p.Dispose;
    p.Dispose = function () {
        delete this._type;
        delete this._state;
        delete this._velocity;
        this.__entity_dispose();
    };

    /**
     * Getters & Setters internal function.
     * 
     * @method GettersAndSetters
     * @memberof ballpit.LevelLoader
     * @private 
     * @ignore
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
                Listener.Dispatch(ballpit.Event.ON_BALL_STATE_CHANGE, this, { "state": this.state });
            }
        });

        this.Get( "velocity", function () {
                return this._velocity;
        });

        this.Get("isMoving", function () {
            var state_moving = (this.state === ballpit.BallStates.SWAPPING || this.state === ballpit.BallStates.REVERTING || this.state === ballpit.BallStates.FALLING);
            var destination_exists = (this._destination);
            return (state_moving && destination_exists);
        });
        this.__entity_gettersAndSetters();
    };

    return BallModel;
}());