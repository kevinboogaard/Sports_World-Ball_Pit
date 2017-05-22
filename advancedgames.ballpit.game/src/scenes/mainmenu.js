/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var scene = scene || {};

scene.Names = scene.Names || {};
scene.Names.MAINMENU = "MainMenu";

scene.MainMenu = (function () {

    /**
     * This is the Main Menu Scene.
     * 
     * @class MainMenu
     * @extends Phaser.Group
     * @constructor
     */
    function MainMenu() {
        Phaser.Group.call(this, ADCore.phaser, null, "MainMenu");

        var halfWidth = Config.Core.Dimensions.width/2;

        /** @property {Interface} */
        this.background = new ADCore.Interface(new Vector2(0, 0),"menubackground");
        this.addChild(this.background);

        /** @property {Interface} */
        this.logo = new ADCore.Interface(new Vector2(0, 0), "logo");
        this.logo.anchor.set(0.5, 0.5);
        this.logo.x = halfWidth;
        this.logo.y = this.logo.height / 2;
        this.addChild(this.logo);

        /** @property {Button} */
        this.startButton = new ADCore.Button(new Vector2(this.logo.x, this.logo.y + this.logo.height * 0.70),"startbutton-inactive");
        this.startButton.onInputUp = this._onStartButtonInputUp.bind(this);
        this.addChild(this.startButton);

        this.logo.Play("entry");
        this.identifier = soundSystem.PlayMusic("music_menu", 1, true);
    }
    MainMenu.prototype = Object.create(Phaser.Group.prototype);
    MainMenu.prototype.constructor = MainMenu; 
    var p = MainMenu.prototype;

    /**
     * @method _OnStartButtonInputUp
     * @memberof MainMenu
     * @private
     * @ignore
     */
    p._onStartButtonInputUp = function () {
        Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.TUTORIALSCENE });
    };

    /**
     * @method Dispose
     * @memberof MainMenu
     * @public
     */
    p.Dispose = function () {  
      this.identifier.audio.pause();
      this.removeChild(this.background);
      this.background.Dispose();
      delete this.background;

      this.removeChild(this.logo);
      this.logo.Dispose();
      delete this.logo;

      this.removeChild(this.startButton);
      this.startButton.Dispose();
      delete this.startButton;
    };

    return MainMenu;
}());