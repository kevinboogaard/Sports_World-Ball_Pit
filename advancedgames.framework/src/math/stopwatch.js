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
        this.elapsed = 0;

        this._watchStarted = false;
        this._rounds = [];
    }
    var p = Stopwatch.prototype;

    /**'
     * 'Start'
     */
    p.Start = function(){
        this._watchStarted = true;
    };

    /**'
     * 'Stop'
     */
    p.Stop = function(){
        this._watchStarted = false;
    };

    /**'
     * 'Reset'
     */
    p.Reset = function(){
        this.elapsed = 0;
    };

    /**'
     * 'Round'
     */
    p.Round = function(){
        var elapsed = this.elapsed;
        this._rounds.push(elapsed);
        this.elapsed = 0;
    };

    /**'
     * 'Update'
     */
    p.Update = function(deltaTime){
        if(this._watchStarted === true){
            this.elapsed += deltaTime;
        }
    };

    return Stopwatch;
})();