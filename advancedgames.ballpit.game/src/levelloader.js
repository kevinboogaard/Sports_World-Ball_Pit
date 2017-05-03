var ballpit = ballpit || {};

ballpit.LevelLoader = ( function () {

    /**
     * 'LevelLoader'
     * @param {Preloader} 'preloader'
     * @param {SceneLoader} 'sceneloader'
     */
    function LevelLoader(preloader, sceneLoader) {
        this._level = -1;

        this.preloader = preloader;
        this.sceneLoader = sceneLoader;
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

        this.sceneLoader.Load( scene.Preloader );
        this.preloader.Preload( resources, ADCore.PreloadCategory.LEVEL );
    };
    
    /**
     * 'OnLoadUpdate'
     * @private
     */
    /*
    p._onLoadUpdate = function ( progress ) {
        if ( !this.sceneLoader.current || this.sceneLoader.current.constructor !== scene.Preloader ) return;

        var currentScene = this.sceneLoader.current;
        currentScene.update( progress );
    };
    */

    /**
     * 'OnLoadComplete'
     * @private
     */
    p._onLoadComplete = function ( ) {
        this.sceneLoader.current.Complete();
        this.sceneLoader.DisposeCurrent();

        if (Debug.ENABLED && Debug.FORCE_LOAD_SCENE) {
            this.sceneLoader.Load( Debug.DEBUG_SCENE );
        } else { 
            this.sceneLoader.Load( scene.Game );
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