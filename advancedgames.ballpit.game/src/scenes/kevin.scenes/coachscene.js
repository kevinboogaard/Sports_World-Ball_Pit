/**
 * @ignore
 */
var scene = scene || {};

scene.Names = scene.Names || {};
scene.Names.COACHSCENE = "Coachscene";

scene.Coachscene = (function () {

    /**
     * 'Spritesheetscene'
     * @ignore
     */
    function Coachscene() {
        Phaser.Group.call(this, ADCore.phaser, null, "Coachscene");

        var halfWidth = Config.Core.Dimensions.width / 2;
    
        this.coach = new ballpit.CoachModel(new Vector2(halfWidth, 150), null);
        var view = new ballpit.CoachView(new Vector2(halfWidth, 150), "soccer", this.coach);
        this.addChild(view);
    }
    Coachscene.prototype = Object.create(Phaser.Group.prototype);
    Coachscene.prototype.constructor = Coachscene; 
    var p = Coachscene.prototype;

    return Coachscene;
}());