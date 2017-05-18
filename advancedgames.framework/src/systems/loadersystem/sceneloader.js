/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};
var scene = scene || {};

/**
 * @namespace {String} Event
 * @memberof ADCore
 * @typedef {(String)} Event
 */
scene.Event = scene.Event || {};

/**
 * @event ON_SCENE_SWITCH
 * @memberof ADCore.Event
 */
scene.Event.ON_SCENE_SWITCH = "on_scene_switch";

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
     * @param {Object} args - Arguments given to the scene.
     */
    p.Load = function(constructor, args) {
        args = args || [];

        if (typeof constructor === "undefined") throw new Error("Scene doesn't exist: " + constructor);
        if (typeof constructor === "string") constructor = scene[constructor];

        this.current = new constructor(...args);
    
        ADCore.phaser.add.existing(this.current);
    };
   
    /**
     * Disposes the current scene in the game and loads a new scene.
     * 
     * @method Switch
     * @memberof Sceneloader
     * @public
     * @param {Scene} scene - New scene to be loaded.
     * @param {Object} args - Arguments given to the scene.
     */
    p.Switch = function(scene, args) {
        this.DisposeCurrent();
        this.Load(scene, args);
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