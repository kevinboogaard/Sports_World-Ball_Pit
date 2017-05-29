/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.Timer = (function () {

    /**
     * @class Timer
     * @constructor
     */
    function Timer(startTime, multiplier,callback) {
        /**
        * @property {Number} StartTime 
        * @public
        */
        this.startTime = startTime;

        /**
        * @property {Number} Multiplier
        * @public
        */
        this.multiplier = multiplier;
        
        /**
        * @property {Function} Callback
        * @public
        */
        this.callback = callback;

        /**
        * @property {Number} Count 
        * @public
        */
        this.count = startTime; 

        /**
        * @property {Boolean} _TimerStarted
        * @private
        */
        this._timerStarted = false;
    }
    var p = Timer.prototype;

    /**
     * @method Start
     * @memberof Timer
     * @public 
     */
    p.Start = function(){
        this._timerStarted = true;
    };
    
    /**
     * @method Stop
     * @memberof Timer
     * @public 
     */
    p.Stop = function(){
        this._timerStarted = false;
    };

    /**
     * @method Add
     * @memberof Timer
     * @public 
     * @param {Integer} value
     */
    p.Add = function(value){
        this.count += value;
    };

    /**
     * @method Substract
     * @memberof Timer
     * @public 
     * @param {Integer} value
     */
    p.Substract = function(value){
        this.count -= value;
    };
    
    /**
     * @method Reset
     * @memberof Timer
     * @public 
     */
    p.Reset = function(){
        this.count = 0;
    };

    /**
     * @method Update
     * @memberof Timer
     * @public 
     * @param {Integer} deltaTime
     */
    p.Update = function(deltaTime){
        if(this._timerStarted === true){
            this.count -= (deltaTime * this.multiplier);

            if (this.count <= 0) {
                ClearTimer(this);
                this.callback();
            }
        }
    };

    return Timer;
})();