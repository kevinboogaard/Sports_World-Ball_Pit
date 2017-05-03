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

    p.Start = function(){
        this._startTimer = true;
    };
    
    p.Stop = function(){
        this._startTimer = false;
    };
    
    p.Reset = function(){
        this.starttime = 0;
    };

    p.Update = function(deltaTime){
        if(startTimer === true){
            this._counter += this.multiplier * deltaTime;
        }
    };
    p.Round = function(){
        var roundtime = this._counter;
        this._rounds.push(roundtime);
    };
    return Timer;
})();