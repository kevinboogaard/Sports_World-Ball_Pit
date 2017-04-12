var scene = scene || {};

scene.Preloader = (function () {

    /**'
     * 'Preloader'
     */
    function Preloader() {
        Phaser.Group.call(this, ADCore.phaser, null, "Preloader");

        console.log("Entering Preloader");
    }
    Preloader.prototype = Object.create(Phaser.Group.prototype);
    Preloader.prototype.constructor = Preloader; 
    var p = Preloader.prototype;

    /**'
     * 'Complete'
     * This is the function that is called when the preloader is complete.
     */
    p.Complete = function () {

    };

    /**'
     * 'Dispose'
     */
    p.dispose = function () {
        
    };

    return Preloader;
}());