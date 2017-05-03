var ballpit = ballpit || {};

ballpit.Core = ( function () {

    /**
     * 'Core'
     * @param {Preloader} 'preloader'
     * @param {SceneLoader} 'sceneloader'
     */
    function Core(preloader, sceneLoader) {
        this._sceneLoader = sceneLoader;
        this.levelLoader = new ballpit.LevelLoader(preloader, this._sceneLoader);
    }
    var p = Core.prototype;

    /**
     * 'Start'
     */
    p.Start = function () {
        this.levelLoader.Initialize();
        
        this._sceneLoader.Load( scene.MainMenu );
        Listener.ListenOnce(scene.Event.ON_SCENE_SWITCH, this, function () {
            this._sceneLoader.DisposeCurrent();
            this._sceneLoader.Load( scene.Tutorialscene );
            Listener.ListenOnce(scene.Event.ON_SCENE_SWITCH, this, function () {
                this._sceneLoader.DisposeCurrent();
                this.levelLoader.level = 0;
                this.levelLoader.LoadLevel();
            }.bind(this));
        }.bind(this), this._sceneLoader.current);
    };

    /**
     * 'Update'
     */
    p.Update = function ( deltaTime ) {
        var currentScene = this._sceneLoader.current;
        if ( currentScene && currentScene.Update ) {
            currentScene.Update( deltaTime );
        }
    };

    /**
     * 'Render'
     */
    p.Render = function () {
        var currentScene = this._sceneLoader.current;

        if ( currentScene && currentScene.Render ) {
            currentScene.Render();
        }
    };

    return Core;
}());