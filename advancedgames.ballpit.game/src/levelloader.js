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

        this._sceneToBeLoaded = null;

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
     * @method IsSceneLevel
     * @public 
     * @param {(Object | String)} level
     */
    p.IsSceneLevel = function (level) {
        var gamescene = scene[scene.Names.GAME];
        var tutorialscene = scene[scene.Names.TUTORIAL];
        if (typeof level === "string") level = scene[level];
        return (gamescene === level || tutorialscene === level);
    };

    /**
     * 'LoadLevel'
     * @param {Scene} levelscene
     */
    p.LoadLevel = function (levelscene) {
        if (Debug.ENABLED && Debug.FORCE_LOAD_DEBUG_LEVEL) this.level = Debug.DEBUG_LEVEL;

        var resources =  Config.ResourceLists.LEVELS[this.level];
        if (typeof resources === "undefined") throw new Error("Level is not known.");

        if (sceneLoader.current === null) sceneLoader.Load( scene.Preloader );
        else sceneLoader.switch ( scene.PreLoader); 

         this._sceneToBeLoaded = levelscene;
        preloader.Preload( resources, ADCore.PreloadCategories.LEVEL );
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

        sceneLoader.Load(this._sceneToBeLoaded);
        this._sceneToBeLoaded = null;
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