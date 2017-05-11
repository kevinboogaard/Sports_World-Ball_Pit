/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.ScoreHolder = (function () {

    /**'
     * @class ScoreHolder
     * @constructor 
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

    /**'
     * 'CalculateScoreByAmountAligned'
     * @param {int} 'amountAligned'
     */
    p.CalculateScoreByAmountAligned = function (amountAligned) {
        return amountAligned;
    };

    /**
     * 'gettersAndSetters'
     */
    p.gettersAndSetters = function () {
        this.Get("score", function () {
            return this._score;
        });

        this.Get("highscore", function () {
            return this._highscores[0];
        });

        this.Get("highscores", function () {
            return this._highscores;
        });
    };

    return ScoreHolder;
}());