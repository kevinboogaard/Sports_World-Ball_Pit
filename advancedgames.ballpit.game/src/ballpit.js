var ballpit = ballpit || {};

ballpit.Core = ( function () {

    /**
     * 'Core'
     */
    function Core() {
        this.levelLoader = new ballpit.LevelLoader();
        Listener.Listen(scene.Event.ON_SCENE_SWITCH, this, this._onSceneSwitch.bind(this) );
    }
    var p = Core.prototype;

    /**
     * 'Start'
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
     * 'Update'
     */
    p.Update = function ( deltaTime ) {
        var currentScene = sceneLoader.current;
        if ( currentScene && currentScene.Update ) {
            currentScene.Update( deltaTime );
        }
    };

    /**
     * 'Render'
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