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
        this.startTime = startTime;
        this.multiplier = multiplier;
        this._callback = callback;

        this.count = startTime; 
        this._timerStarted = false;
    }
    var p = Timer.prototype;

    /**
     * 'Start'
     */
    p.Start = function(){
        this._timerStarted = true;
    };
    
    /**'
     * 'Stop'
     */
    p.Stop = function(){
        this._timerStarted = false;
    };

    /**
     * 'Add'
     */
    p.Add = function(value){
        this.count += value;
    };

    /**
     * 'Substract'
     */
    p.Substract = function(value){
        this.count -= value;
    };
    
    /**'
     * 'Reset'
     */
    p.Reset = function(){
        this.count = 0;
    };

    /**'
     * 'Update'
     */
    p.Update = function(deltaTime){
        if(this._timerStarted === true){
            this.count -= (deltaTime * this.multiplier);

            if (this.count <= 0) {
                ClearTimer(this);
                this._callback();
            }
        }
    };

    return Timer;
})();