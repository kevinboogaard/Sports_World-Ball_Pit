var scene = scene || {};

scene.Musicscene = (function () {

    /**
     * 'Spritesheetscene'
     */
    function Musicscene() {
        Phaser.Group.call(this, ADCore.phaser, null, "Musicscene");

        this.identifier = soundSystem.PlayMusic("ingamesound", 1, true);

        setTimeout(function () {
            soundSystem.Pause(this.identifier);

            setTimeout(function () {
                soundSystem.PlayMusic(this.identifier, 1, true);
            }.bind(this), 1000);
        }.bind(this), 1000);
    }
    Musicscene.prototype = Object.create(Phaser.Group.prototype);
    Musicscene.prototype.constructor = Musicscene; 
    var p = Musicscene.prototype;

    p.Update = function () {
        console.log(this.identifier.audio.isPlaying);
    };  

    return Musicscene;
}());