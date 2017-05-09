var scene = scene || {};

scene.Coachscene = (function () {

    /**
     * 'Spritesheetscene'
     */
    function Coachscene() {
        Phaser.Group.call(this, ADCore.phaser, null, "Coachscene");
        
        var halfWidth = Config.Core.Dimensions.width / 2;

       this.soccercoach = new ADCore.Interface(new Vector2(0, 0), "soccercoach");
        this.soccercoach.anchor.set(0.5, 0.5);
        this.soccercoach.x = halfWidth;
        this.soccercoach.y = 100;
        this.soccercoach.scale.setTo(0.5,0.5);
        this.addChild(this.soccercoach);

        this.soccercoach.Play("idle_super_angry",60,true);
    }
    Coachscene.prototype = Object.create(Phaser.Group.prototype);
    Coachscene.prototype.constructor = Coachscene; 
    var p = Coachscene.prototype;

    return Coachscene;
}());