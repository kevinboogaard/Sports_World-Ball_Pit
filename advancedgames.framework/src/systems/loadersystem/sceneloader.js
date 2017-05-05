/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.Sceneloader = (function () {

    /**
     * Loader of the scenes.
    *
     * @class Sceneloader
     * @constructor
     */
    function Sceneloader() {
        /**
         * Load is made when calling the 'Initialize' method of the class. 
         * @property {Scene} current - Current loaded scene.
         * @public
         * @default Null 
         */
        this.current = null;
    }
    var p = Sceneloader.prototype;
    
    /**
     * Load a scene in the game.
     * 
     * @method Load
     * @memberof Sceneloader
     * @public
     * @param {Scene} scene - Scene to be loaded.
     */
    p.Load = function(scene){
        if (typeof scene === "undefined") throw new Error("Scene doesn't exist: " + scene);

        this.current = new scene();
        ADCore.phaser.add.existing(this.current);
    };
   
    /**
     * Disposes the current scene in the game and loads a new scene.
     * 
     * @method Switch
     * @memberof Sceneloader
     * @public
     * @param {Scene} scene - New scene to be loaded.
     */
    p.Switch = function(scene) {
        this.DisposeCurrent();
        this.Load(scene);
    };

    /**
     * Disposes the current scene in the game.
     * 
     * @method DisposeCurrent
     * @memberof Sceneloader
     * @public
     */
    p.DisposeCurrent = function(){
        this.current.Dispose();
        this.current = null;

        Debug.LogWarning("Phaser add existing. There is no remove existing in the disposeCurrent.");
    };

    return Sceneloader;
}());