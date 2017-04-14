var ballpit = ballpit || {};

ballpit.LevelLoader = ( function () {

    /**
     * 'LevelLoader'
     */
    function LevelLoader() {
        this._level = -1;

        ADCore.EnableMutators( this );
    }
    var p = LevelLoader.prototype;

    /**
     * 'Initialize'
     */
    p.Initialize = function () {
        var load = ADCore.phaser.load;
        load.onLoadComplete.add( this._onLoadComplete.bind( this ), this );
    };

    /**
     * 'LoadLevel'
     */
    p.LoadLevel = function () {
        if (Debug.ENABLED && Debug.FORCE_LOAD_DEBUG_LEVEL) this.level = Debug.DEBUG_LEVEL;

        var resources =  Config.ResourceLists.LEVELS[this.level];
        if (typeof resources === "undefined") throw new Error("Level is not known.");

        sceneLoader.Load(scene.Preloader);
        preloader.Preload( resources, ADCore.PreloadCategory.LEVEL );
    };
    
    /**
     * 'OnLoadUpdate'
     * @private
     */
    /*
    p._onLoadUpdate = function ( progress ) {
        if ( !sceneLoader.current || sceneLoader.current.constructor !== scene.Preloader ) return;

        var currentScene = sceneLoader.current;
        currentScene.update( progress );
    };
    */

    /**
     * 'OnLoadComplete'
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
     * 'Getters And Setters'
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