/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.Stopwatch = (function () {

    /**
     * @class Stopwatch
     * @constructor
     */
    function Stopwatch() {
        /**
        * @property {Number} Elapsed - The time elapsed since the start/reset.
        * @public
        */
        this.elapsed = 0;

        /**
        * @property {Number} WatchStarted - True if the watch has started ticking.
        * @private
        */
        this._watchStarted = false;

        /**
        * @property {Array} Rounds - Storage of all the rounds. 
        * @private
        */
        this._rounds = [];
    }
    var p = Stopwatch.prototype;

    /**
     * @method Start
     * @memberof Stopwatch
     * @public 
     */
    p.Start = function(){
        this._watchStarted = true;
    };

    /**
     * @method Stop
     * @memberof Stopwatch
     * @public 
     */
    p.Stop = function(){
        this._watchStarted = false;
    };

    /**
     * @method Reset
     * @memberof Stopwatch
     * @public 
     */
    p.Reset = function(){
        this.elapsed = 0;
    };

    /**
     * @method Round
     * @memberof Stopwatch
     * @public 
     */
    p.Round = function(){
        var elapsed = this.elapsed;
        this._rounds.push(elapsed);
        this.elapsed = 0;
    };

    /**
     * @method Update
     * @memberof Stopwatch
     * @public 
     * @param {Integer} deltaTime
     */
    p.Update = function(deltaTime){
        if(this._watchStarted === true){
            this.elapsed += deltaTime;
        }
    };

    return Stopwatch;
})();