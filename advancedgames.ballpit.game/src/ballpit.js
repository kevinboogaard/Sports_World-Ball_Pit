/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.Core = ( function () {

    /**
     * @class Core
     * @constructor
     */
    function Core() {
        this.levelLoader = new ballpit.LevelLoader();
        Listener.Listen(scene.Event.ON_SCENE_SWITCH, this, this._onSceneSwitch.bind(this) );
    }
    var p = Core.prototype;
    
     /**
     * This method calls when the framework has been loaded.
     *    
     * @method Initialize
     * @memberof Core
     * @public
     */
    p.Initialize = function () {
        // Load the preloader.
        sceneLoader.Load( scene.Names.PRELOADER, [ this._create.bind(this) ] );

        // The framework has loaded- now let's preload our own files now.
        this._preload();
    };

    p._preload = function () {
        // Preload the generic files.
        var len = Config.ResourceLists.GENERIC.length;
        if ( len > 0 ) {
            preloader.Preload( Config.ResourceLists.GENERIC, ADCore.PreloadCategories.GENERIC  );
        }
    };

    p._create = function () {
        // Dispose the preloader scene.
        sceneLoader.DisposeCurrent();

        // Load the generic sounds.
        soundSystem.Load(Global.Loaded.generic.sounds);

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
     * @memberof Core
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
     * @memberof Core
     * @public
     */
    p.Render = function () {
        var currentScene = sceneLoader.current;
        if ( currentScene && currentScene.Render ) {
            currentScene.Render();
        }
    };

    /**
     * @method _OnSceneSwitch
     * @memberof Core
     * @private 
     * @param {Object} caller
     * @param {Object} params
     * @param {String} params.scene
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