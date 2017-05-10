/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};
ballpit.Coach = ballpit.Coach || {};

ballpit.Coach.Emotions = {
    ANGRY: "angry",
    HAPPY: "happy",
    NEUTRAL: "neutral",
    SUPER_ANGRY: "super_angry",
    SUPER_HAPPY: "super_happy"
};

ballpit.Coach.States = {
    IDLE: "idle",
    WALK: "walk",
    TALK: "talk"
};

ballpit.CoachView = (function () {

    /**'
     * @class CoachView
     * @constructor 
     * @extends Interface
     * @param {CoachModel} model
     * @param {String} key
     */
    function CoachView(position, key, model) {
        ADCore.Interface.call(this, position, key + "coachbody");

        this.__display_play(ballpit.Coach.States.IDLE + "_" + ballpit.Coach.Emotions.SUPER_ANGRY, 30, true);

        this.mouth = new ADCore.Interface(new Vector2(this.width *0.55, this.height *0.75), key + "coachmouth");
        this.mouth.anchor.set(0.5, 0.5);
        this.addChild(this.mouth);

        this.model = model;

        this.mouth.Play(ballpit.Coach.Emotions.SUPER_ANGRY + "_" + "mouth", 30, true);
    }
    CoachView.prototype = Object.create(ADCore.Interface.prototype);
    CoachView.prototype.constructor = CoachView;
    var p = CoachView.prototype;

    /**
     * @method Play
     * @memberof CoachView
     * @param {String} name
     * @returns {Phaser.Animation}
     */
    p.__display_play = p.Play;
    p.Play = function(name, frameRate, loop, killOnComplete){
        this.mouth.Play(name, framerate, loop, killOnComplete);
        this.__display_play(name, frameRate, loop, killOnComplete);
    };

    return CoachView;
})();