/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.Infobar = (function () {

    /**
     * @class Infobar
     * @constructor 
     * @extends Interface
     * @param {Vector2} position
     * @param {String} key
     * @param {ScoreHolder} scoreHolder
     */
    function Infobar(position, key, scoreHolder) {
        ADCore.Interface.call( this, position, key );

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
        this._scoreText = null;
        
        /**
         * @property {Text} _HighscoreText
         * @public
         */
        this._highscoreText = null;

        this._initialize();
    }
    Infobar.prototype = Object.create(ADCore.Interface.prototype);
    Infobar.prototype.constructor = Infobar;
    var p = Infobar.prototype;

    /**
     * @method _Initialize
     * @memberof Infobar
     * @private
     * @ignore
     */
    p._initialize = function () {       
        this._scoreText = new ADCore.Text().Value("0").Size(23).Font("digital-7").Color("#FFFFFF").Finish();
        this._scoreText.x = 15;
        this._scoreText.y = this.height * 0.55;
        this._scoreText.anchor.set(0, 0.5);
        this.addChild(this._scoreText);

        this._highscoreText = new ADCore.Text().Value("0").Size(23).Font("digital-7").Color("#FFFFFF").Finish();
        this._highscoreText.x = this._scoreText.x + 95;
        this._highscoreText.y = this._scoreText.y;
        this._highscoreText.anchor.set(0, 0.5);
        this.addChild(this._highscoreText);
    };

    /**
     * @method Render
     * @memberof Infobar
     * @public
     */
    p.Render = function () {
        var score = this._scoreHolder.score;
        if (this._visibleScore !== score) { 
            var step = this._calculateStep( this._visibleScore, score);
            this._visibleScore += step;
        }

        var shownScore = parseInt(this._visibleScore);
        this._scoreText.text = shownScore;

        if (this._scoreHolder.highscore && this._scoreHolder.score < this._scoreHolder.highscore.score) {
            this._highscoreText.text = this._scoreHolder.highscore.score;
        } else {
            this._highscoreText.text = shownScore;
        }
    };

    /**
     * @method _CalculateStep
     * @memberof Infobar
     * @private
     */
    p._calculateStep = function (current, goal) {
        var delta = goal - current;
        var result = delta / this._stepSpeed;
        return result;
    };

    /**
     * @method Dispose
     * @memberof Infobar
     * @public
     */
    p.Dispose = function () {
        delete this._scoreHolder;
        delete this._visibleScore;
        delete this._stepSpeed;

        this.removeChild(this._scoreText);
        delete this._scoreText;
        
        this.removeChild(this._highscoreText);
        delete this._highscoreText;
    };
    
    return Infobar;
})();