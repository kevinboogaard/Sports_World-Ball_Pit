var ballpit = ballpit || {};

ballpit.ScoreView = (function () {

    /**'
     * 'ScoreView'
     */
    function ScoreView(scoreHolder,position, key) {
        ADCore.Interface.call(this,position,key);

        this.scoreHolder = scoreHolder;

        this._initialize();
    }
    ScoreView.prototype = Object.create(ADCore.Interface.prototype);
    ScoreView.prototype.constructor = ScoreView;
    var p = ScoreView.prototype;

    p._initialize = function () { 
        this.scoreText = new ADCore.Text().value("score:" + this.scoreHolder.score).finish();
        this.addChild(this.scoreText);
    };

    p.Update = function () {
        this.scoreText.text = this.scoreHolder.score.toString();
    };

    return ScoreView;
}());
