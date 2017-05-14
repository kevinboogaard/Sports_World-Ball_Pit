/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */ 
var ballpit = ballpit || {};

/**
 * @namespace Event
 */
this.Event; // For documentation purposes.
ballpit.Event = ballpit.Event || {};

/**
 * @property {String} ON_BALL_DESTINATION_REACHED
 * @memberof Event
 * @readonly
 */
ballpit.Event.ON_BALL_DESTINATION_REACHED = "on_ball_destination_reached";

/**
 * @property {String} ON_BALL_STATE_CHANGE
 * @memberof Event
 * @readonly
 */
ballpit.Event.ON_BALL_STATE_CHANGE = "on_ball_state_change";

/**
 * @property {String} ON_BALL_DESTROY
 * @memberof Event
 * @readonly
 */
ballpit.Event.ON_BALL_DESTROY = "on_ball_destroy";

/**
 * @property {String} ON_BALL_SWAP_WRONG
 * @memberof Event
 * @readonly
 */
ballpit.Event.ON_BALL_SWAP_WRONG = "on_ball_swap_wrong";

/**
 * @namespace BallTypes
 */
let BallTypes = {};
ballpit.BallTypes = BallTypes;

/** 
 * @property {String} SOCCERBALL
 * @memberof BallTypes
 * @readonly 
 */
ballpit.BallTypes.SOCCERBALL = "soccerball";

/** 
 * @property {String} BASKETBALL
 * @memberof BallTypes
 * @readonly 
 */
ballpit.BallTypes.BASKETBALL = "basketball";

/** 
 * @property {String} TENNISBALL
 * @memberof BallTypes
 * @readonly 
 */
ballpit.BallTypes.TENNISBALL = "tennisball";

/** 
 * @property {String} BOWLINGBALL
 * @memberof BallTypes
 * @readonly 
 */
ballpit.BallTypes.BOWLINGBALL = "bowlingball";

/** 
 * @property {String} BASEBALL
 * @memberof BallTypes
 * @readonly 
 */
ballpit.BallTypes.BASEBALL = "baseball";
    

/**
 * @namespace BallStates
 */
let BallStates = {};
ballpit.BallStates = BallStates;

/** 
 * @property {String} IDLING
 * @memberof BallStates
 * @readonly 
 */
ballpit.BallStates.IDLING = "idling";

/** 
 * @property {String} SWAPPING
 * @memberof BallStates
 * @readonly 
 */
ballpit.BallStates.SWAPPING = "swapping";

/** 
 * @property {String} MOVING
 * @memberof BallStates
 * @readonly 
 */
ballpit.BallStates.MOVING = "moving";

ballpit.BallModel = (function () {

     /**
     * @class BallModel
     * @extends Entity
     * @constructor
     * @param {Vector2} position - The position of the ball
     * @param {BallTypes} type - Type of the ball
     */
    function BallModel(position, type) {
        ADCore.Entity.call(this, position);
       
        /**
        * @property {BallTypes} Type - Type of the ball
        * @readonly
        * @public
        */
        this._type = type;       
        
        /**
        * @property {BallStates} State - The states of the ball
        * @public
        */
        this._state = ballpit.BallStates.IDLING;
        
        /**
        * @property {Number} _Velocity - The velocity of the ball
        * @readonly
        * @public
        */
        this._velocity = Settings.Velocity.BALL;

        /**
        * @property {Boolean} Beginning - The velocity of the ball
        * @public
        */
        this.beginning = null;

        /**
        * @property {Boolean} _Destination - The velocity of the ball
        * @private
        */
        this._destination = null;

        /**
         * @property {Boolean} IsMoving - True if the ball is moving.
         * @memberof BallModel
         * @public
         * @instance
         */
        let IsMoving; // For documentation purposes.
    }
    BallModel.prototype = Object.create(ADCore.Entity.prototype);
    BallModel.prototype.constructor = BallModel;
    var p = BallModel.prototype;

     /**
     * @method Update
     * @memberof BallModel
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

                this.state = ballpit.BallStates.IDLING;
                Listener.Dispatch(ballpit.Event.ON_BALL_DESTINATION_REACHED, this, { "ball": this });
            }
        }
    };

     /**
     * @method MoveTo
     * @memberof BallModel
     * @public
     * @param {Vector2} vector - The destenation 
     */
    p.MoveTo = function (vector) {
        this._destination = vector.Clone();
        this.state = ballpit.BallStates.MOVING;
    };

     /**
     * @method SwapTo
     * @memberof BallModel
     * @public
     * @param {Vector2} vector - The destenation 
     */
    p.SwapTo = function (vector) {
        this._destination = vector.Clone();
        this.state = ballpit.BallStates.SWAPPING;
    };

     /**
     * @method Destroy
     * @memberof BallModel
     * @public
     * @param {Function} callback - The destenation 
     */
    p.Destroy = function (callback) {
        Listener.Dispatch(ballpit.Event.ON_BALL_DESTROY, this, { "callback": callback });
    };

     /**
     * @method Dispose
     * @memberof BallModel
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
     * @memberof BallModel
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
                if (ADCore.Utilities.HasObjectValue(ballpit.BallStates, value) === false) throw new Error(this._state + ":State doesn't exist");
                this._state = value;
                Listener.Dispatch(ballpit.Event.ON_BALL_STATE_CHANGE, this, { "state": this.state });
            }
        });

        this.Get( "velocity", function () {
                return this._velocity;
        });

        this.Get("isMoving", function () {
            var state_moving = (this.state === ballpit.BallStates.SWAPPING || this.state === ballpit.BallStates.MOVING);
            var destination_exists = (this._destination);
            return (state_moving && destination_exists);
        });
        this.__entity_gettersAndSetters();
    };

    return BallModel;
}());