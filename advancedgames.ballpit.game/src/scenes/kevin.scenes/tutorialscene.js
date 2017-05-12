/**
 * @ignore
 */

var scene = scene || {};

scene.Names = scene.Names || {};
scene.Names.TUTORIALSCENE = "Tutorialscene";

scene.Tutorialscene = (function () {

    /**
     * 'Entityscene'
     * @ignore
     */
    function Tutorialscene() {
        Phaser.Group.call(this, ADCore.phaser, null, "Tutorialscene");

        var halfWidth = Config.Core.Dimensions.width / 2;

        this.background = new ADCore.Interface(new Vector2(0, 0),"tutorial");
        this.addChild(this.background);    

        this.startButton = new ADCore.Button(new Vector2(halfWidth, 610),"startbutton-inactive");
        this.startButton.onInputUp = this._onStartButtonInputUp.bind(this);
        this.startButton.scale.set(0.5, 0.5);
        this.addChild(this.startButton);
    }
    Tutorialscene.prototype = Object.create(Phaser.Group.prototype);
    Tutorialscene.prototype.constructor = Tutorialscene; 
    var p = Tutorialscene.prototype;

    p.Update = function () {

    };

    p._onStartButtonInputUp = function () {
        Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.GAME });
    };

    p.Dispose = function () {
        this.removeChild(this.background);  
        this.background.Dispose();  

        this.removeChild(this.startButton);
        this.startButton.Dispose();
    };

    return Tutorialscene;
}());