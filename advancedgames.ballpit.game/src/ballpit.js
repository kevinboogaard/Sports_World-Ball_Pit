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

        this.levelLoader.level = 0;
        this.levelLoader.LoadLevel();
    };

    /**
     * 'Update'
     */
    p.Update = function ( deltaTime ) {
        var currentScene = sceneLoader.current;
        if ( currentScene && currentScene.update ) {
            currentScene.Update( deltaTime );
        }
    };

    /**
     * 'Render'
     */
    p.Render = function () {
        var currentScene = sceneLoader.current;

        if ( currentScene && currentScene.render ) {
            currentScene.Render();
        }
    };

    return Core;
}());