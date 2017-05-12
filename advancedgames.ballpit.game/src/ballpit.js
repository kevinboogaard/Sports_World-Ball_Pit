/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.Core = ( function () {

    /**
     * @class ballpit.Core
     * @constructor
     */
    function Core() {
        this.levelLoader = new ballpit.LevelLoader();
        Listener.Listen(scene.Event.ON_SCENE_SWITCH, this, this._onSceneSwitch.bind(this) );
    }
    var p = Core.prototype;
    
     /**
     * This function starts the game scene
     *    
     * @method Start
     * @memberof ballpit.Core
     * @public
     */
    p.Start = function () {
        this.levelLoader.Initialize();

        if (Debug.FORCE_LOAD_DEBUG_LEVEL) this.levelLoader.level = Debug.DEBUG_LEVEL;
        else this.levelLoader.level = 0;

        if (Debug.FORCE_LOAD_SCENE) {
            if (this.levelLoader.IsSceneLevel(Debug.DEBUG_SCENE)) {
                this.levelLoader.LoadLevel(Debug.DEBUG_SCENE);
            }  else {
                sceneLoader.Load(Debug.DEBUG_SCENE);
            }
        } else {
            sceneLoader.Load( scene.Names.MAINMENU );
        }
    };

     /**
     * @method Update
     * @memberof ballpit.Core
     * @public
     * @param {Number} deltaTime - The number deltatime is a multiplier to convert gametime in to realtime
     */
    p.Update = function ( deltaTime ) {
        var currentScene = sceneLoader.current;
        if ( currentScene && currentScene.Update ) {
            currentScene.Update( deltaTime );
        }
    };

     /**
     * @method Render
     * @memberof ballpit.Core
     * @public
     */
    p.Render = function () {
        var currentScene = sceneLoader.current;

        if ( currentScene && currentScene.Render ) {
            currentScene.Render();
        }
    };

    /**
     * @method _onSceneSwitch
     * @private 
     * @param {Object} caller
     * @param {Object} params
     * @param {String} params.scene;
     */
    p._onSceneSwitch = function (caller, params) {
        if (this.levelLoader.IsSceneLevel(params.scene)) {
            sceneLoader.DisposeCurrent();
            this.levelLoader.LoadLevel(params.scene);
        }  else {
            sceneLoader.Switch(params.scene);
        }
    };

    return Core;
}());