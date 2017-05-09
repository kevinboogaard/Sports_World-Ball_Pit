var ADCore = ADCore || {};

 /**
 * 'Initialize'
 * Function that initializes the framework of ADCore. 
 * Call Initialize on start or on window.load to run the framework.
 */
function Initialize() {
    /**
     * Create the phaser: 'Heart of the game'. The framework creates the renderer for the game. ( http://phaser.io/docs/2.4.4/Phaser.Game.html )
     * Once the heart has been made, the game will preload using the 'preload' method.
     * The create function will be called once the preloader has finished preloading.
     */   
    ADCore.phaser = new Phaser.Game(Config.Core.Dimensions.width, Config.Core.Dimensions.height, Config.Core.Renderer, Config.Core.Parent, {
        preload: _preload.bind(this), 
        create: _create.bind(this),
        update: _update.bind(this),
        render: _render.bind(this)
    });

    // Initialize the main of the game.
    this.main = new ballpit.Core();
    // Create the scene loader system.
    this.sceneLoader = new ADCore.Sceneloader();
    // Create the preloader system that preloads the resources in a json file.
    this.preloader = new ADCore.Preloader(ADCore.phaser);
}

 /**
 * 'Preload'
 * @private
 * Called by Phaser on Preload. 
 * This is the first function that will be called once Phaser has been initialized.
 */
function _preload () {
    // Initialize the preloader.
    this.preloader.Initialize();

    // Preload the generic files.
    var len = Config.ResourceLists.GENERIC.length;
    if ( len > 0 ) {
        preloader.Preload( Config.ResourceLists.GENERIC, ADCore.PreloadCategory.GENERIC  );
    }
}

 /**
 * 'Create'
 * @private
 * Called by Phaser after preload.
 * This function will be called once the game has been preloaded by Phaser. 
 */
function _create () {
    // Align the canvas horizontally and refresh the scale.
    ADCore.phaser.scale.pageAlignHorizontally = true;
    ADCore.phaser.scale.pageAlignVertically = true;
    ADCore.phaser.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    ADCore.phaser.scale.refresh();

    // Create the input system.
    this.inputSystem = new ADCore.InputSystem(ADCore.phaser.input);

    // If the main is started immediately some things will bug out.
    // To prevent any errors from happening we use a timeout.
    setTimeout(function () {
        this.main.Start();
    }.bind(this), 1);
}
 
 /**
 * 'Update'
 * @private
 * Called by Phaser on Update call.
 * This function will be called right after create. 
 * I use this function to update the main and to update the input.
 */
function _update () {
    var deltaTime;
    if (ADCore.phaser.device.desktop) {
        deltaTime = ADCore.phaser.time.elapsed / 1000;
    } else {
        deltaTime = 1/60; // Seems to run weird on mobile when using Time.Elapsed
    }

    // Update main.
    this.main.Update( deltaTime );
    // Update Input system aswell.
    this.inputSystem.Update( deltaTime );
}

 /**
 * 'Render'
 * @private
 * Called by Phaser on Render.
 * This function will be called right after create.
 * I use this function to render the main.
 */
function _render () {
    // Render main.
    this.main.Render();
}

ADCore.EnableMutators = function ( prototype ) {
    prototype.Get = function ( propertyString, callback ) {
        Object.defineProperty( this, propertyString, {
            get: callback.bind( this )
        } );
    };
    prototype.Set = function ( propertyString, callback ) {
        Object.defineProperty( this, propertyString, {
            set: callback.bind( this )
        } );
    };
    prototype.Define = function ( propertyString, callback ) {
        Object.defineProperty( this, propertyString, {
            get: callback.get.bind( this ),
            set: callback.set.bind( this )
        } );
    };

    prototype.gettersAndSetters();
};