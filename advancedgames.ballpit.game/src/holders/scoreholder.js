var ballpit = ballpit || {};

ballpit.ScoreHolder = (function () {

    /**'
     * 'ScoreHolder'
     */
    function ScoreHolder() {
        this._score = 0;
        this._highscores = [];

        ADCore.EnableMutators( this );
    }
    var p = ScoreHolder.prototype;


    /**'
     * 'Add'
     * @param {int} 'n'
     * 
     * add is used to add the points to the score
     */
    p.Add = function (n) {
        this._score += n;
    };

    /**
     * 'gettersAndSetters'
     */
    p.gettersAndSetters = function () {
        this.Get("score", function () {
            return this._score;
        });

        this.Get("highscore", function () {
            return this._highscores;
        });
    };

    return ScoreHolder;
}());