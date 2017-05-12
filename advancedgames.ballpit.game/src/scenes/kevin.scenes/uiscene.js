/**
 * @ignore
 */

var scene = scene || {};

scene.Names = scene.Names || {};
scene.Names.UISCENE = "Uiscene";

scene.Uiscene = (function () {

    /**
     * 'Entityscene'
     * @ignore
     */
    function Uiscene() {
        Phaser.Group.call(this, ADCore.phaser, null, "Entityscene");
        var halfWidth = Config.Core.Dimensions.width/2;

        this.background = new ADCore.Interface(new Vector2(0, 0),"menubackground");
        this.addChild(this.background);

        this.logo = new ADCore.Interface(new Vector2(0, 0), "logo");
        this.logo.anchor.set(0.5, 0.5);
        this.logo.x = halfWidth;
        this.logo.y = this.logo.height * 0.66;
        this.addChild(this.logo);

        this.logo.Play("entry");



        /*
        this.logo = new ADCore.Interface(new Vector2(0, 0),"asset_logo");
        this.addChild(this.logo);*/

        this.startButton = new ADCore.Button(new Vector2(this.logo.x, this.logo.y + this.logo.height),"buttoninactive");
        //this.startButton.SetText( new ADCore.Text().value("Start").finish() );
        this.startButton.onInputDown = this.onStartButtonInputDown.bind(this);
        this.addChild(this.startButton);
    }
    Uiscene.prototype = Object.create(Phaser.Group.prototype);
    Uiscene.prototype.constructor = Uiscene; 
    var p = Uiscene.prototype;

    p.onStartButtonInputDown = function () {
        this.newscene = sceneLoader.Switch(scene.Entityscene);
    };

    p.Dispose = function () {
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

    return Uiscene;
}());