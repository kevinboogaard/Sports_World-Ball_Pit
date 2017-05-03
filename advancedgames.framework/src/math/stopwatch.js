this.Stopwatch = (function () {

    /**'
     * 'Function / stopwatch name'
     * 
     */
    function Stopwatch() {
        this.elapsed = null;
        this._startwatch = false;

    }
    var p = Stopwatch.prototype;

    /**'
     * 'Start'
     */
    p.Start = function(){
        this._startwatch = true;
    };

    /**'
     * 'Stop'
     */
    p.Stop = function(){
        this._startwatch = false;
    };

    /**'
     * 'Reset'
     */
    p.Reset = function(){
        this.elapsed = 0;
    };

    /**'
     * 'Update'
     */
    p.Update = function(deltaTime){
        if(this._startwatch === true){
            this.elapsed += deltaTime;
        }
    };

    return Stopwatch;
})();