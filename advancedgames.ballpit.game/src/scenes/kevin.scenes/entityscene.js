var scene = scene || {};

scene.Entityscene = (function () {

    /**
     * 'Entityscene'
     */
    function Entityscene() {
        Phaser.Group.call(this, ADCore.phaser, null, "Entityscene");
        console.log("Entering Entityscene");

        this.viewContainer = new ADCore.ViewContainer();
        this.addChild(this.viewContainer);

        this.ballContainer = new ballpit.BallContainer();

        var ballTypes = [
            ballpit.ballTypes.FOOTBALL,
            ballpit.ballTypes.BASKETBALL,
            ballpit.ballTypes.TENNISBALL,
            ballpit.ballTypes.BOWLINGBALL,
            ballpit.ballTypes.BASEBALL
        ];

        for (var y = 0; y < 7; y++) {
            for (var x = 0; x < 7; x++) {
                var randomInt = Math.floor(Math.random() * (ballTypes.length - 1 - 0 + 1) + 0);
                this.ballContainer.AddBall(new Vector2(x * 90, y * 90),ballTypes[randomInt]);
            }
        }
    }
    Entityscene.prototype = Object.create(Phaser.Group.prototype);
    Entityscene.prototype.constructor = Entityscene; 
    var p = Entityscene.prototype;

    p.Dispose = function () {
    
    };


    return Entityscene;
}());