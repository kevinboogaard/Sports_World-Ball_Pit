var ballpit = ballpit || {};

ballpit.Core = ( function () {

    function Core() {
        
    }
    var p = Core.prototype;

    p.start = function () {
        sceneLoader.load(scene.Gridscene);
    }

    p.update = function ( deltaTime ) {
        var currentScene = sceneLoader.current;
        if ( currentScene && currentScene.update ) {
            currentScene.update( deltaTime );
        }
    }

    p.render = function () {
        var currentScene = sceneLoader.current;

        if ( currentScene && currentScene.render ) {
            currentScene.render();
        }
    }


    return Core;
}());