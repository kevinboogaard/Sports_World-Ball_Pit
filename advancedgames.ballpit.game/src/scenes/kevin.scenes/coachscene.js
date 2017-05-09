var scene = scene || {};

scene.Coachscene = (function () {

    /**
     * 'Spritesheetscene'
     */
    function Coachscene() {
        Phaser.Group.call(this, ADCore.phaser, null, "Coachscene");
        this.coach = new ballpit.CoachModel(Global.Loaded.level.tasks);
    }
    Coachscene.prototype = Object.create(Phaser.Group.prototype);
    Coachscene.prototype.constructor = Coachscene; 
    var p = Coachscene.prototype;

    return Coachscene;
}());