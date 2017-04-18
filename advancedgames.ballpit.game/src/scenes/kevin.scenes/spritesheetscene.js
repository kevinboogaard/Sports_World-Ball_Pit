var scene = scene || {};

scene.Spritesheetscene = (function () {

    /**
     * 'Spritesheetscene'
     */
    function Spritesheetscene() {
        Phaser.Group.call(this, ADCore.phaser, null, "Spritesheetscene");

        var logo_anim = new ADCore.Interface(new Vector2(300, 300), "logo");
        this.addChild(logo_anim);
    }
    Spritesheetscene.prototype = Object.create(Phaser.Group.prototype);
    Spritesheetscene.prototype.constructor = Spritesheetscene; 
    var p = Spritesheetscene.prototype;


    p.Dispose = function () {
     
    };
    return Spritesheetscene;
}());