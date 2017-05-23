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

        var halfWidth = Config.Core.Dimensions.width / 2;
        var halfHeight = Config.Core.Dimensions.height / 2;


        /** @property {Interface} */
        this.background = new ADCore.Interface(new Vector2(0, 0),"menubackground");
        this.addChild(this.background);

        /** @property {Interface} */
        this.eyes = new ADCore.Interface(new Vector2( halfWidth * 0.955, halfHeight * 1.33 ), "menubackgroundeyes")
        this.eyes.anchor.set(0.5, 0.5);
        this.addChild(this.eyes);

        this.id = setInterval(function () {
            this.eyes.Play("blink",10,false);
        }.bind(this), 3000);
        
        /**@property {Interface} */
        this.foreground = new ADCore.Interface(new Vector2(0,0),"menuforeground")
        this.addChild(this.foreground);
        this.foreground.Play("sparkle", 30,true);

        /** @property {Interface} */
        this.logo = new ADCore.Interface(new Vector2(0, 0), "logo");

        var logoHeight = this.logo.height;

        this.logo.anchor.set(0.5, 0.5);
        this.logo.scale.setTo(0.01,0.01);
        this.logo.x = halfWidth;
        this.logo.y = logoHeight / 2;
        this.addChild(this.logo);

        /** @property {Button} */
        this.startButton = new ADCore.Button(new Vector2(this.logo.x, this.logo.y + logoHeight * 0.70),"mainmenubutton");
        this.startButton.onInputUp = this._onStartButtonInputUp.bind(this);
        
        this.startButton.anchor.set(0.5, 0.5);
        this.startButton.scale.setTo(0.01,0.01);
        this.addChild(this.startButton);
        this.startButton.Play("active");

        setTimeout(function(){
            TweenLite.to(this.logo.scale,0.2,{ease: Back.easeInOut.config(1.7), x:1,y:1,onComplete: function(){ 
                this.logo.Play("entry");
                setTimeout(function(){
                TweenLite.to(this.startButton.scale, 0.2, {ease: Back.easeInOut.config(1.7), x:1,y:1});
               }.bind(this),700);
            }.bind(this)});
        }.bind(this),100);

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

      clearInterval(this.id);

      this.removeChild(this.background);
      this.background.Dispose();
      delete this.background;

      this.removeChild(this.eyes);
      this.eyes.Dispose();
      delete this.eyes;

      this.removeChild(this.foreground);
      this.foreground.Dispose();
      delete this.foreground;

      this.removeChild(this.logo);
      this.logo.Dispose();
      delete this.logo;

      this.removeChild(this.startButton);
      this.startButton.Dispose();
      delete this.startButton;
    };

    return MainMenu;
}());