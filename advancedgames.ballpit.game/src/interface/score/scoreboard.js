/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.ScoreBoard = (function () {

    /**
     * @class ScoreBoard
     * @constructor 
     * @extends Interface
     * @param {Vector2} position
     * @param {String} key
     * @param {ScoreHolder} scoreHolder
     * @deprecated This will soon merge with Watch.
     */
    function ScoreBoard(position, key, scoreHolder) {
        ADCore.Interface.call(this,position,key);

        /**
         * @property {ScoreHolder} _ScoreHolder
         * @private
         */
        this._scoreHolder = scoreHolder;

        /**
         * @property {Integer} _VisibleScore
         * @private
         */
        this._visibleScore = 0;
        
        /**
         * @property {Integer} _StepSpeed
         * @private
         */
        this._stepSpeed = 16;

        /**
         * @property {Text} _ScoreText
         * @public
         */
        this.scoreText = null;
        
        /**
         * @property {Text} _HighscoreText
         * @public
         */
        this.highscoreText = null;

        this._initialize();
    }
    ScoreBoard.prototype = Object.create(ADCore.Interface.prototype);
    ScoreBoard.prototype.constructor = ScoreBoard;
    var p = ScoreBoard.prototype;

    /**
     * @method _Initialize
     * @memberof ScoreBoard
     * @private
     * @ignore
     */
    p._initialize = function () { 
        var offset = 10;

        this.scoreText = new ADCore.Text().Value("0").Size(45).Font("dsdigi").Color("#FFFFFF").Finish();
        this.scoreText.x = (this.scoreText.width * 0.75) + offset;
        this.scoreText.y = this.height - (this.scoreText.height / 2) + offset;
        this.scoreText.anchor.set(0, 0.5);
        this.addChild(this.scoreText);

        this.highscoreText = new ADCore.Text().Value("0").Size(45).Font("dsdigi").Color("#FFFFFF").Finish();
        this.highscoreText.x = (this.highscoreText.width * 0.75) + offset;
        this.highscoreText.y = this.height + this.highscoreText.height + offset;
        this.highscoreText.anchor.set(0, 0.5);
        this.addChild(this.highscoreText);
    };

    /**
     * @method Render
     * @memberof ScoreBoard
     * @public
     */
    p.Render = function () {
        var score = this._scoreHolder.score;
        if (this._visibleScore !== score) { 
            var step = this._calculateStep( this._visibleScore, score);
            this._visibleScore += step;
        }

        var shownScore = parseInt(this._visibleScore);
        this.scoreText.text = shownScore;

        if (this._scoreHolder.score < this._scoreHolder.highscore) {
            this.highscoreText.text = this._scoreHolder.highscore;
        } else {
            this.highscoreText.text = shownScore;
        }
    };

    /**
     * @method _CalculateStep
     * @memberof ScoreBoard
     * @private
     */
    p._calculateStep = function (current, goal) {
        var delta = goal - current;
        var result = delta / this._stepSpeed;
        return result;
    };

    return ScoreBoard;
}());
