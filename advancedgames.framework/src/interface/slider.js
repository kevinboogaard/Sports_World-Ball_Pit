/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.Slider = (function () {

    /**
     * @class Slider
     * @constructor
     * @extends Interface
     * @param {Vector2} position
     * @param {Integer} min
     * @param {Integer} max
     * @param {String} key_bg - The background key from the preloader.
     * @param {String} key_handle - The handle key from the preloader.
     */
    function Slider(position, min, max, key_bg, key_handle) {
        ADCore.Interface.call(this, position, key_bg);

        /**
         * @property {Boolean} InputEnabled - Need to put input enabled for Phaser Input System. 
         * @ignore
         */
        this.inputEnabled = true;
        
        /**
         * @property {Integer} Min
         * @public
         * @readonly 
         */
        this._min = min;

        /**
         * @property {Integer} Max
         * @public
         * @readonly
         */
        this._max = max;

        /**
         * @property {Integer} Value
         * @public
         */
        this._value = this._min;

        /**
         * @property {Integer} Percentage
         * @public
         */
        this._percentage = 0;

        /**
         * @property {Button} _Handle
         * @private 
         * @default  null
         */
        this._handle = null;

        /**
         * @property {Function} OnDragUpdate
         * @public
         * @default  null
         */
        this.onDragUpdate = null;

        /**
         * @property {Function} OnInputUp - Set this variable with a function to listen to the call.
         * @public
         * @default null
         */
        this.onInputUp = null;

        this._initialize(key_handle);
    }
    Slider.prototype = Object.create(ADCore.Interface.prototype);
    Slider.prototype.constructor = Slider;
    var p = Slider.prototype;

    /**
     * @method _Initialize
     * @memberof Slider
     * @private
     * @param {String} key_handle
     */
    p._initialize = function (key_handle) {
        this._handle = new ADCore.Button(new Vector2(0, 0), key_handle);
        this._handle.anchor.set(0, 0.5);
        this._handle.input.enableDrag();
        this._handle.input.boundsRect = new Phaser.Rectangle(0, -(this._handle.height / 2), this.width, this.height * 2);
        this._handle.input.allowVerticalDrag = false;
        this._handle.events.onDragUpdate.add(this._onDragUpdate, this);
        this.addChild(this._handle);

        this.events.onInputUp.add( this._onInputUp, this );
    };

    /**
     * @method _UpdateByPercentage
     * @memberof Slider
     * @private
     */
    p._updateByPercentage = function () {
        this._handle.absoluteX =  ((this.absoluteX + this.width) / 100) * this._percentage;
        this._value = ((this._max) / 100) * this._percentage;
    };

    /**
     * @method _UpdateByValue
     * @memberof Slider
     * @private
     */
    p._updateByValue = function () {
        this._percentage = (100 / (this._max)) * this._value;
        this._updateByPercentage();
    };
    
    /**
     * @method _UpdateByPosition
     * @memberof Slider
     * @private
     */
    p._updateByPosition = function () {
        this._percentage = (100 / this.width) * this._handle.x ;
        this._value = ((this._max) / 100) * this._percentage;
    };

    /**
     * @method _OnDragUpdate
     * @memberof Slider
     * @private
     * @param {Object} caller
     */
    p._onDragUpdate = function(caller) {
        this._updateByPosition();
        if (this.onDragUpdate) this.onDragUpdate(this._value);
    };

    /**
     * @method _OnInputUp
     * @memberof Slider
     * @private
     * @param {Object} caller
     * @param {Vector2} position
     */
    p._onInputUp = function(caller, position) {
        this._handle.absoluteX = position.x;

        this._updateByPosition();
        if (this.onInputUp) this.onInputUp(this._value);
    };

    /**
     * Dispose the ViewContainer. Use this method to clean the ViewContainer and the views in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof Slider
     * @public
     */
    p.__interface_dispose = p.Dispose;
    p.Dispose = function(){
        
        this.__interface_dispose();
    };

    /**
     * Internal function getters & setters.
     * 
     * @method GettersAndSetters
     * @private 
     * @ignore
     */
    p.__interface_gettersAndSetters = p.gettersAndSetters;
    p.gettersAndSetters = function () {
        this.__interface_gettersAndSetters();

        this.Get("min", function () {
            return this._min;
        });
        
        this.Get("max", function () {
            return this._max;
        });

        this.Define("value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
                this._updateByValue();
            }
        });

        this.Define("percentage", {
            get: function () {
                return this._percentage;
            },
            set: function (value) {
                this._percentage = value;
                this._updateByPercentage();
            }
        });
    };

    return Slider;
}());