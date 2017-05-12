var scene = scene || {};

scene.Event = scene.Event || {};
scene.Event.ON_SCENE_SWITCH = "on_scene_switch";

scene.Names = scene.Names || {};
scene.Names.MAINMENU = "MainMenu";

scene.MainMenu = (function () {

    /**
     * 'Entityscene'
     */
    function MainMenu() {
        Phaser.Group.call(this, ADCore.phaser, null, "Entityscene");
        var halfWidth = Config.Core.Dimensions.width/2;
	
        this.identifier = soundSystem.PlayMusic("menusound", 1, true);

        this.background = new ADCore.Interface(new Vector2(0, 0),"menubackground");
        this.addChild(this.background);

        this.logo = new ADCore.Interface(new Vector2(0, 0), "logo");
        this.logo.anchor.set(0.5, 0.5);
        this.logo.x = halfWidth;
        this.logo.y = this.logo.height / 2;
        this.addChild(this.logo);

        this.logo.Play("entry");

        this.startButton = new ADCore.Button(new Vector2(this.logo.x, this.logo.y + this.logo.height * 0.70),"startbutton-inactive");
        this.startButton.onInputUp = this._onStartButtonInputUp.bind(this);
        this.addChild(this.startButton);
    }
    MainMenu.prototype = Object.create(Phaser.Group.prototype);
    MainMenu.prototype.constructor = MainMenu; 
    var p = MainMenu.prototype;

    p._onStartButtonInputUp = function () {
        Listener.Dispatch(scene.Event.ON_SCENE_SWITCH, this, { "scene": scene.Names.TUTORIALSCENE });
    };

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