/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.LevelLoader = ( function () {

    /**
     * @class LevelLoader
     * @constructor
     */
    function LevelLoader() {
        /**
         * @property {number} _Level 
         * @private
         * @default -1
         */
        this._level = -1;

        /**
         * @property {Scene} _SceneToBeLoaded
         * @private 
         * @default null
         */
        this._sceneToBeLoaded = null;

        ADCore.EnableMutators( this );
    }
    var p = LevelLoader.prototype;

    /**
     * @method IsSceneLevel
     * @memberof LevelLoader
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
     * @method LoadLevel
     * @memberof LevelLoader
     * @public 
     * @param {Scene} levelscene
     */
    p.LoadLevel = function (levelscene) {
        if (Debug.ENABLED && Debug.FORCE_LOAD_DEBUG_LEVEL) this.level = Debug.DEBUG_LEVEL;

        var resources =  Config.ResourceLists.LEVELS[this.level];
        if (typeof resources === "undefined") throw new Error("Level is not known.");

        if (sceneLoader.current === null) sceneLoader.Load( scene.Names.PRELOADER, [ this._onLoadComplete.bind(this) ] );
        else sceneLoader.switch ( scene.Names.PRELOADER, [ this._onLoadComplete.bind(this) ]); 

         this._sceneToBeLoaded = levelscene;
         preloader.Preload( resources, ADCore.PreloadCategories.LEVEL );
    };

    /**
     * @method _OnLoadComplete
     * @memberof LevelLoader
     * @private
     */
    p._onLoadComplete = function ( ) {
        sceneLoader.DisposeCurrent();

        sceneLoader.Load(this._sceneToBeLoaded);
        this._sceneToBeLoaded = null;
    };

    /**
     * Getters & Setters internal function.
     * 
     * @method GettersAndSetters
     * @memberof LevelLoader
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