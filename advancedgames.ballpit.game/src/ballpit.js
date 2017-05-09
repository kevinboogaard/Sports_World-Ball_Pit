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
        
        sceneLoader.Load( scene.MainMenu );
        Listener.ListenOnce(scene.Event.ON_SCENE_SWITCH, this, function () {
            sceneLoader.DisposeCurrent();
            sceneLoader.Load( scene.Tutorialscene );
            Listener.ListenOnce(scene.Event.ON_SCENE_SWITCH, this, function () {
                sceneLoader.DisposeCurrent();
                this.levelLoader.level = 0;
                this.levelLoader.LoadLevel();
            }.bind(this));
        }.bind(this), sceneLoader.current);
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

    return Core;
}());