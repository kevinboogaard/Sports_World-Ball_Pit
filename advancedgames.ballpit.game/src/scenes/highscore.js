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

        // Play in-game music.
        this.music_identifier = soundSystem.PlayMusic("music_endscreen", 1, true);

        net.GET_HIGHSCORES.Send( {"amount": Settings.HighscoreScene.AMOUNT_SCORES_SHOWN}, this._initialize.bind(this));
    }
    Highscore.prototype = Object.create(Phaser.Group.prototype);
    Highscore.prototype.constructor = Highscore; 
    var p = Highscore.prototype;

    p._initialize = function(json_highscores){
        var parsed_highscores = JSON.parse(json_highscores);

        var offsetX = 40;
        var offsetY = 27;
        var scoreOffset = 210;
        var startY = 190;

        var textSize = 11;
        var fontName = "djb-bbi";
        var textColor = "#000000";

        var halfWidth = Config.Core.Dimensions.width / 2;
        var halfHeight = Config.Core.Dimensions.height / 2;

        this.background = new ADCore.Interface(new Vector2(0,0),"hs_background")        ;
        this.addChild(this.background);

        this.highscoreBackground = new ADCore.Interface(new Vector2(halfWidth, halfHeight), "hs_highscorescreenpopup");
        this.highscoreBackground.y -= this.highscoreBackground.height / 2;
        var hs_bg_height = this.highscoreBackground.height;
        this.highscoreBackground.anchor.set(0.5, 0);
        this.highscoreBackground.scale.set(1, 0);
        this.addChild(this.highscoreBackground);

        var len = parsed_highscores.length;
        for(var i = 0; i < len; i++) {
            var scoretext = {};
            var previous = this.scoretextsdata[i - 1] || null;

            var string_user_name = parsed_highscores[i].name;
            var string_user_score = parsed_highscores[i].score;
            var order = i + 1;

            var x = (previous !== null) ? previous.x : 55;
            var y = (previous !== null) ? previous.y + offsetY : startY;

            var text_order = new ADCore.Text()
                .Value(order + ".")
                .Position(new Vector2(x, y))
                .Size(textSize)
                .Color(textColor)
                .Font(fontName)
                .Finish();
            text_order.alpha = 0;
            this.addChild(text_order);
            scoretext["textOrder"] = text_order;

            var text_user_name = new ADCore.Text()
                .Value(string_user_name)
                .Position(new Vector2(x + offsetX, y))
                .Size(textSize)
                .Color(textColor)
                .Font(fontName)
                .Finish();
            this.addChild(text_user_name);
            text_user_name.alpha = 0;
            scoretext["textUserName"] = text_user_name;

            var text_user_score = new ADCore.Text()
                .Value(string_user_score)
                .Anchor(new Vector2(1,0))
                .Position(new Vector2(text_user_name.x + scoreOffset, y))
                .Size(textSize)
                .Color(textColor)
                .Font(fontName)
                .Finish();
            this.addChild(text_user_score);
            text_user_score.alpha = 0;
            scoretext["textUserScore"] = text_user_score;

            scoretext["x"] = x;
            scoretext["y"] = y;
            this.scoretextsdata.push(scoretext);
        }
        this.toppartofmenu = new ADCore.Interface(new Vector2(this.highscoreBackground.x, Config.Core.Dimensions.height * 0.1),"hs_toppartofmenu");
        this.toppartofmenu.y += this.toppartofmenu.height / 2;
        this.toppartofmenu.anchor.set(0.5, 0.5);

        this.bottompartofmenu = new ADCore.Interface(new Vector2(this.highscoreBackground.x, this.toppartofmenu.y ),"hs_bottompartofmenu");
        this.bottompartofmenu.y += this.bottompartofmenu.height;
        this.bottompartofmenu.anchor.set(0.5, 0.5);

        this.logo = new ADCore.Interface(new Vector2(this.highscoreBackground.x, this.toppartofmenu.y ), "hs_highscorelogo");
        this.logo.y -= this.logo.height / 2;
        this.logo.anchor.set(0.5, 0.5);
        this.logo.scale.setTo(0.01,0.01);
        TweenLite.to(this.logo.scale,0.2,{ease: Back.easeInOut.config(1.7), x:1,y:1});
   
        this.restartButton = new ADCore.Button(new Vector2(this.highscoreBackground.x - this.highscoreBackground.width * 0.25, this.bottompartofmenu.y),"hs_restartbutton");
        this.restartButton.y += this.restartButton.height * 0.1;
        this.restartButton.onInputUp = this._onRestartButtonInputUp.bind(this);
        this.restartButton.anchor.set(0.5, 0.5);
        this.restartButton.scale.setTo(0.01,0.01);
        TweenLite.to(this.restartButton.scale,0.2,{ease: Back.easeInOut.config(1.7), x:1,y:1});

        this.quitButton = new ADCore.Button(new Vector2(this.highscoreBackground.x + this.highscoreBackground.width * 0.25, this.restartButton.y), "hs_quitbutton");        
        this.quitButton.onInputUp = this._onQuitButtonInputUp.bind(this);
        this.quitButton.anchor.set(0.5, 0.5);
        this.quitButton.scale.setTo(0.01,0.01);
        TweenLite.to(this.quitButton.scale,0.2,{ease: Back.easeInOut.config(1.7), x:1,y:1});

        this.text_name = new ADCore.Text()
                .Value("Name")
                .Position(new Vector2(halfWidth - this.highscoreBackground.width * 0.28, this.toppartofmenu.y))
                .Anchor(new Vector2(0.5, 0.5))
                .Size(13)
                .Color(textColor)
                .Font(fontName)
                .Finish();
        this.text_name.y += this.text_name.height * 0.75;
        this.text_name.scale.set(0.01, 0.01);

        this.text_score = new ADCore.Text()
                .Value("Score")
                .Position(new Vector2(halfWidth + this.highscoreBackground.width * 0.28, this.text_name.y))
                .Anchor(new Vector2(0.5, 0.5))
                .Size(13)
                .Color(textColor)
                .Font(fontName)
                .Finish();
        this.text_score.scale.set(0.01, 0.01);
            
        this.addChild(this.toppartofmenu);
        this.addChild(this.bottompartofmenu);
        this.addChild(this.logo);
        this.addChild(this.quitButton);
        this.addChild(this.restartButton);
        this.addChild(this.text_name);
        this.addChild(this.text_score);

        TweenLite.to(this.text_score.scale, 0.15, { x: 1, y: 1});
        TweenLite.to(this.text_name.scale, 0.15, { x: 1, y: 1, onComplete: function () {
            setTimeout(function() {
                TweenLite.to(this.highscoreBackground.scale, 0.5, { y: 1 });
                TweenLite.to(this.bottompartofmenu, 0.5, { y: this.bottompartofmenu.y + hs_bg_height, onUpdate: function () {
                    this.restartButton.y = this.bottompartofmenu.y;
                    this.quitButton.y = this.bottompartofmenu.y;
                }.bind(this), onComplete: function () {
                    var len = this.scoretextsdata.length;
                    for (var i = 0; i < len; i++) {
                        setTimeout(function(i) {
                            TweenLite.to(this.scoretextsdata[i].textOrder, 0.5, { alpha: 1 });
                            TweenLite.to(this.scoretextsdata[i].textUserName, 0.5, { alpha: 1 });
                            TweenLite.to(this.scoretextsdata[i].textUserScore, 0.5, { alpha: 1 });
                        }.bind(this, i), 250 * i);
                    }
                }.bind(this) });
            }.bind(this), 1000);
        }.bind(this) });
    };

    p._onRestartButtonInputUp = function () {
        Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.GAME });
    };

    p._onQuitButtonInputUp = function () {
        Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.MAINMENU});
    };


    p.Dispose = function () {
        this.music_identifier.audio.pause();
    };

    return Highscore;
})();
