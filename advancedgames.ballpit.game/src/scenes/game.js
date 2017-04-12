var scene = scene || {};

scene.Game = (function () {

    /**'
     * 'Game'
     */
    function Game() {
        Phaser.Group.call(this, ADCore.phaser, null, "Game");

        console.log("Entering Game");
    }
    Game.prototype = Object.create(Phaser.Group.prototype);
    Game.prototype.constructor = Game; 
    var p = Game.prototype;

    /**'
     * 'Dispose'
     */
    p.dispose = function () {
        
    }

    return Game;
}());