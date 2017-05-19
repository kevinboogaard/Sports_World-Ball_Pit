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
     * @param {Integer} min
     * @param {Integer} max
     * @param {Vector2} position
     * @param {String} key_bg - The background key from the preloader.
     * @param {String} key_handle - The handle key from the preloader.
     */
    function Slider(min, max, position, key_bg, key_handle) {
        ADCore.Interface.call(this, position, key_bg, key_handle);

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
         * @property {Integer} Current
         * @public
         * @readonly 
         */
        this._current = this_min;

        /**
         * @property {Button} _Handle
         * @private 
         * @default  null
         */
        this._handle = null;

        this._initialize(key_handle);
        ADCore.EnableMutators(this);
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
            this._handle = new ADCore.Button(new Vector2(0,0), key_handle);
            this._handle.onInputUp = this._onHandleUp.bind(this);
            this.addChild(this._handle);
    };

    /**
     * @method _OnHandleUp
     * @memberof Slider
     * @private
     * @param {Button} caller
     */
    p._onHandleUp = function(caller) {
        var inputPositionCurrent = inputSystem.inputPosition;
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
        delete this._min;
        delete this._max;
        delete this._current;

        this._handle.Dispose();
        this.removeChild(this._handle);
        delete this._handle;

        this.__interface_dispose();
    };

    /**
     * Internal function getters & setters.
     * 
     * @method GettersAndSetters
     * @private 
     * @ignore
     */
    p.gettersAndSetters = function () {
        this.Get("min", function () {
            return this._min;
        });
        
        this.Get("max", function () {
            return this._max;
        });

        this.Define("current", {
            get: function () {
                return this._current;
            },
            set: function (val) {
                this._current = val;
            }
        });
    };

    return Slider;
}());