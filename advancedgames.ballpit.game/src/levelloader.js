/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.LevelLoader = ( function () {

    /**
     * @class ballpit.LevelLoader
     * @constructor
     */
    function LevelLoader() {
        /**
         * @property {number} level 
         * @private
         * @default -1
         */
        this._level = -1;

        ADCore.EnableMutators( this );
    }
    var p = LevelLoader.prototype;

    /**
     * @method Initialize
     * @memberof ballpit.LevelLoader
     * @public
     */
    p.Initialize = function () {
        var load = ADCore.phaser.load;
        load.onLoadComplete.add( this._onLoadComplete.bind( this ), this );
    };

    /**
     * @method LoadLevel
     * @memberof ballpit.LevelLoader
     * @public
     */
    p.LoadLevel = function () {
        if (Debug.ENABLED && Debug.FORCE_LOAD_DEBUG_LEVEL) this.level = Debug.DEBUG_LEVEL;

        var resources =  Config.ResourceLists.LEVELS[this.level];
        if (typeof resources === "undefined") throw new Error("Level is not known.");

        sceneLoader.Load( scene.Preloader );
        preloader.Preload( resources, ADCore.PreloadCategory.LEVEL );
    };
    
    /**
     * 'OnLoadUpdate'
     */
    /*
    p._onLoadUpdate = function ( progress ) {
        if ( !sceneLoader.current || sceneLoader.current.constructor !== scene.Preloader ) return;

        var currentScene = sceneLoader.current;
        currentScene.update( progress );
    };
    */

    /**
     * @method OnLoadComplete
     * @memberof ballpit.LevelLoader
     * @private
     */
    p._onLoadComplete = function ( ) {
        sceneLoader.current.Complete();
        sceneLoader.DisposeCurrent();

        if (Debug.ENABLED && Debug.FORCE_LOAD_SCENE) {
            sceneLoader.Load( Debug.DEBUG_SCENE );
        } else { 
            sceneLoader.Load( scene.Game );
        } 
    };

    /**
     * Getters & Setters internal function.
     * 
     * @method GettersAndSetters
     * @memberof ballpit.LevelLoader
     * @private 
     * @ignore
     */
    p.gettersAndSetters = function () {
        this.Define( "level", {
            "get": function () {
                return this._level;
            },
            "set": function (value) {
                this._level = value;
            }
        });
    };

    return LevelLoader;
}() );