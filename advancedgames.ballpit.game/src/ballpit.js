var ballpit = ballpit || {};

ballpit.Core = ( function () {

    /**
     * 'Core'
     */
    function Core() {
        this.levelLoader = new ballpit.LevelLoader();
    }
    var p = Core.prototype;

    /**
     * 'Start'
     */
    p.Start = function () {
        this.levelLoader.Initialize();
        
        sceneLoader.Load( scene.MainMenu );
        Listener.ListenOnce(scene.Event.ON_SCENE_SWITCH, this, function () {
<<<<<<< HEAD
            this.levelLoader.level = 0;
            this.levelLoader.LoadLevel();
=======
            sceneLoader.Load( scene.Tutorialscene );
            Listener.ListenOnce(scene.Event.ON_SCENE_SWITCH, this, function () {
                this.levelLoader.level = 0;
                this.levelLoader.LoadLevel();
            }.bind(this));
>>>>>>> development
        }.bind(this), sceneLoader.current);
    };

    /**
     * 'Update'
     */
    p.Update = function ( deltaTime ) {
        var currentScene = sceneLoader.current;
        if ( currentScene && currentScene.update ) {
            currentScene.update( deltaTime );
        }
    };

    /**
     * 'Render'
     */
    p.Render = function () {
        var currentScene = sceneLoader.current;

        if ( currentScene && currentScene.render ) {
            currentScene.render();
        }
    };

    return Core;
}());