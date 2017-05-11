/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.CoachView = (function () {

    /**'
     * @class CoachView
     * @constructor 
     * @extends Display
     * @param {CoachModel} model
     * @param {String} key
     */
    function CoachView(model, key) {
        ADCore.Display.call( this, model, key + "coachbody" );

        this.anchor.set(0.5, 1);
        this.scale.set(0.75, 0.75);
        
        this.__display_play(this.model.state + "_" + this.model.emotion, 30, true);

        var offsetX = 5;
        var offsetY = 12.5;

        this.mouth = new ADCore.Interface(new Vector2(0, -(this.height / 2) - offsetY), key + "coachmouth");
        this.mouth.anchor.set(0.5, 0.5);
        this.mouth.x += offsetX;  
        this.addChild(this.mouth);

        this.mouth.Play(this.model.emotion + "_" + "mouth", 30, true);
    }
    CoachView.prototype = Object.create(ADCore.Display.prototype);
    CoachView.prototype.constructor = CoachView;
    var p = CoachView.prototype;

    /**
     * @method Render
     * @memberof CoachView
     * @public
     */
    p.Render = function () {
        this.x = this.model.x;
        this.y = this.model.y;
    };

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