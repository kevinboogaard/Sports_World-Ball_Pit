/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.ScoreHolder = (function () {

    /**
     * @class ScoreHolder
     * @constructor 
     */
    function ScoreHolder() {
        /**
         * @property {Integer} _Score
         * @public
         * @readonly
         */
        this._score = 0;
        
        /**
         * @property {Integer} _Highscores
         * @public
         * @readonly
         */
        this._highscores = [];

        /**
         * @property {Integer} _MaxHighscores
         * @private
         * @readonly
         */
        this._maxHighscores = 1;

        /**
         * @property {Integer} _Highscore
         * @memberof ScoreHolder
         * @public
         * @readonly
         * @instance
         */
        let highscore = 0; // For documentation purposes.

        this._initialize();
        ADCore.EnableMutators( this );
    }
    var p = ScoreHolder.prototype;

    /**
     * @method _initialize
     * @memberof ScoreHolder
     * @private
     */
    p._initialize = function () {
        net.GET_HIGHSCORES.Send( {"amount": this._maxHighscores} , function(result) {
            this._highscores = JSON.parse(result);
        }.bind(this));
    };

    /**
     * Add is used to add the points to the score.
     * 
     * @method Add
     * @memberof ScoreHolder
     * @public 
     * @param {Integer} n
     */
    p.Add = function (n) {
        this._score += n;
    };

    /**'
     * @method CalculateScoreByAmountAligned
     * @memberof ScoreHolder
     * @public 
     * @param {Integer} amountAligned
     */
    p.CalculateScoreByAmountAligned = function (amountAligned) {
        return amountAligned;
    };

    /**
     * Getters & Setters internal function.
     * 
     * @method GettersAndSetters
     * @memberof ScoreHolder
     * @private 
     * @ignore
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