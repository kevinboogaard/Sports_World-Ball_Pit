var ballpit = ballpit || {};

ballpit.Core = ( function () {

    /**
     * 'Core'
     */
    function Core() {
        
    }
    var p = Core.prototype;

    /**
     * 'start'
     */
    p.Start = function () {
        sceneLoader.Load(scene.Gridscene);
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
