/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var scene = scene || {};

scene.Names = scene.Names || {};
scene.Names.HIGHSCORE = "Highscore";

scene.Highscore = (function () {

    /**
     * This is the Highscore Scene. 
     * 
     * @class Highscore
     * @constructor
     */
    function Highscore() {
        Phaser.Group.call(this, ADCore.phaser, null, "Highscore Scene");

        /**
         * @property {Array} ScoreTextsData
         * @public
         * @param {Object} index
         * @param {Text} index.textOrder
         * @param {Text} index.textUserName
         * @param {Text} index.textUserScore
         * @param {Integer} index.y
         */
        this.scoretextsdata = [];

        /**
         * @property {Interface} Background
         * @public
         */
        this.background = null;


        /**
         * @property {Interface} HighscoreBackground
         * @public
         */
        this.highscoreBackground = null;

        net.GET_HIGHSCORES.Send( {"amount": Settings.HighscoreScene.AMOUNT_SCORES_SHOWN}, this._initialize.bind(this));
    }
    Highscore.prototype = Object.create(Phaser.Group.prototype);
    Highscore.prototype.constructor = Highscore; 
    var p = Highscore.prototype;

    p._initialize = function(json_highscores){
        var parsed_highscores = JSON.parse(json_highscores);

        var offsetX = 10;
        var offsetY = 27;
        var startY = 192;

        var halfWidth = Config.Core.Dimensions.width / 2;
        var halfHeight = Config.Core.Dimensions.height / 2;

        this.background = new ADCore.Interface(new Vector2(0,0),"hs_background")        
        this.addChild(this.background);

        this.highscoreBackground = new ADCore.Interface(new Vector2(halfWidth, halfHeight), "hs_highscorescreenpopup");
        this.highscoreBackground.anchor.set(0.5, 0.5);
        this.addChild(this.highscoreBackground);

        var len = parsed_highscores.length;
        for(var i = 0; i < len; i++) {
            var scoretext = {};
            var previous = this.scoretextsdata[i - 1] || null;

            var string_user_name = parsed_highscores[i].name;
            var string_user_score = parsed_highscores[i].score;

            var x = (previous !== null) ? previous.x : halfWidth;
            var y = (previous !== null) ? previous.y + offsetY : startY;

            var text_order = new ADCore.Text()
                .Value(string_user_score)
                .Position(new Vector2(x, y))
                .Size(20)
                .Color("#000000")
                .Finish();
            this.addChild(text_order);
            scoretext["textOrder"] = text_order;

            var text_user_name = new ADCore.Text()
                .Value(string_user_score)
                .Position(new Vector2(x + offsetX, y))
                .Size(20)
                .Color("#000000")
                .Finish();
            this.addChild(text_user_name);
            scoretext["textUserName"] = text_user_name;

            var text_user_score = new ADCore.Text()
                .Value(string_user_score)
                .Position(new Vector2(x + offsetX + text_user_name.width * 1.5, y))
                .Size(20)
                .Color("#000000")
                .Finish();
            this.addChild(text_user_score);
            scoretext["textUserScore"] = text_user_score;

            scoretext["y"] = y;
            this.scoretextsdata.push(scoretext);
        }
        this.logo = new ADCore.Interface(new Vector2(this.highscoreBackground.x, this.highscoreBackground.y - this.highscoreBackground.height / 2), "hs_highscorelogo")
        this.logo.anchor.set(0.5, 0.5);
        this.logo.scale.setTo(0.01,0.01);
        TweenLite.to(this.logo.scale,0.2,{ease: Back.easeInOut.config(1.7), x:1,y:1});
   
        this.restartButton = new ADCore.Interface(new Vector2(this.highscoreBackground.x - this.highscoreBackground.width * 0.25, this.highscoreBackground.y + this.highscoreBackground.height * 0.45),"hs_restartbutton")
        this.restartButton.anchor.set(0.5, 0.5);
        this.restartButton.scale.setTo(0.01,0.01);
        TweenLite.to(this.restartButton.scale,0.2,{ease: Back.easeInOut.config(1.7), x:1,y:1});

        this.quitButton = new ADCore.Interface(new Vector2(this.highscoreBackground.x + this.highscoreBackground.width * 0.25, this.restartButton.y),"hs_quitbutton")
        this.quitButton.anchor.set(0.5, 0.5);
        this.quitButton.scale.setTo(0.01,0.01);
        TweenLite.to(this.quitButton.scale,0.2,{ease: Back.easeInOut.config(1.7), x:1,y:1});

        this.addChild(this.logo);
        this.addChild(this.quitButton);
        this.addChild(this.restartButton);
    };

    p.Dispose = function () {

    };

    return Highscore;
})();
