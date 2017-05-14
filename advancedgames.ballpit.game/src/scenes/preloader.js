/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var scene = scene || {};

scene.Names = scene.Names || {};
scene.Names.PRELOADER = "Preloader";

scene.Preloader = (function () {

    /**
     * This is the Preloader Scene.
     * 
     * @class Preloader
     * @extends Phaser.Group
     * @constructor
     */
    function Preloader() {
        Phaser.Group.call(this, ADCore.phaser, null, "Preloader");
        console.log("Entering Preloader");
    }
    Preloader.prototype = Object.create(Phaser.Group.prototype);
    Preloader.prototype.constructor = Preloader; 
    var p = Preloader.prototype;

    /**'
     * This is the function that is called when the preloader is complete.
     * 
     * @method Complete
     * @memberof Preloader 
     * @public
     */
    p.Complete = function () {

    };

    /**
     * @method Dispose
     * @memberof Preloader
     * @public
     */
    p.Dispose = function () {
        
    };

    return Preloader;
}());