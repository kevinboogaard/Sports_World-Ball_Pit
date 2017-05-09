this.Timer = (function () {

    /**'
     * 'Function / Timer name'
     * 
     */
    function Timer(starttime, multiplier,callback) {
        this.starttime = starttime;
        this.multiplier = multiplier;
        this._callback = callback;
        this._counter = starttime; 
        this._startTimer = false;
        this._rounds = [];
    }
    var p = Timer.prototype;

    /**'
     * 'Start'
     */
    p.Start = function(){
        this._startTimer = true;
    };
    
    /**'
     * 'Stop'
     */
    p.Stop = function(){
        this._startTimer = false;
    };
    
    /**'
     * 'Reset'
     */
    p.Reset = function(){
        this.starttime = 0;
    };

    /**'
     * 'Update'
     */
    p.Update = function(deltaTime){
        if(startTimer === true){
            this._counter += this.multiplier * deltaTime;
        }
    };

    /**'
     * 'Round'
     */
    p.Round = function(){
        var roundtime = this._counter;
        this._rounds.push(roundtime);
    };
    return Timer;
})();