/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */

// ADCore is the frameworks namespace. Either use the existing ADCore namespace or create an object if it doesn't exist.
var ADCore = ADCore || {};

// Function that initializes the framework of ADCore. 
// Call Initialize on start or on window.load to run the framework.
function Initialize() {
    // Create the phaser: 'Heart of the game'. The framework creates the renderer for the game. ( http://phaser.io/docs/2.4.4/Phaser.Game.html )
    // Once the heart has been made, the game will preload using the 'preload' method.
    // The create function will be called once the preloader has finished preloading.
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

// Called by Phaser on Preload. 
// This is the first function that will be called once Phaser has been initialized.
function _preload () {
    // Initialize the preloader.
    this.preloader.Initialize();

    // Preload the generic files.
    var len = Config.ResourceLists.GENERIC.length;
    if ( len > 0 ) {
        preloader.Preload( Config.ResourceLists.GENERIC, ADCore.PreloadCategory.GENERIC  );
    }
}

// Called by Phaser after preload.
// This function will be called once the game has been preloaded by Phaser. 
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

// Called by Phaser on Update call.
// This function will be called right after create. 
// I use this function to update the main and to update the input.
function _update () {
    var deltaTime = ADCore.phaser.time.elapsed / 1000;

    // Update main.
    this.main.Update( deltaTime );
    // Update Input system aswell.
    this.inputSystem.Update( deltaTime );
}

// Called by Phaser on Render.
// This function will be called right after create.
// I use this function to render the main.
function _render () {
    // Render main.
    this.main.Render();
}

/**
 * To use Getters & Setters in your class use the ADCore.EnableMutators() class to enable the getter & setter functionality. 
 * This method will eventually call a method in your class named: "gettersAndSetters" where you can make your getters & setters.
 * This method also adds three new methods to the prototype: Get, Set and Define. 
 * 
 * @method EnableMutators
 * @memberof ADCore
 * @static
 * @param {Object} prototype - The prototype of the class.
 */
ADCore.EnableMutators = function ( prototype ) {

    /**
     * Makes a getter variable in the prototype.
     * 
     * @method Get
     * @memberof EnableMutators
     * @private
     * @param {string} propertyString - the getters name.
     * @param {Function} callback - the function to call if someone gets the getter.
     */
    prototype.Get = function ( propertyString, callback ) {
        Object.defineProperty( this, propertyString, {
            get: callback.bind( this )
        } );
    };

    /**
     * Makes a setter variable in the prototype.
     * 
     * @method Set
     * @memberof EnableMutators
     * @private
     * @param {string} propertyString - the setters  name.
     * @param {Function} callback - the function to call if someone gets the setter.
     */
    prototype.Set = function ( propertyString, callback ) {
        Object.defineProperty( this, propertyString, {
            set: callback.bind( this )
        } );
    };
    
    /**
     * Defines a variable in the prototype with both the get & set functionality.
     * 
     * @method Define
     * @memberof EnableMutators
     * @private
     * @param {string} propertyString - the variable's name.
     * @param {Object} callback - an object containing two methods: get and set.
     */
    prototype.Define = function ( propertyString, callback ) {
        Object.defineProperty( this, propertyString, {
            get: callback.get.bind( this ),
            set: callback.set.bind( this )
        } );
    };

    if (!prototype.gettersAndSetters) throw new Error(prototype + " doesn't contain a method called: ''gettersAndSetters");
    else prototype.gettersAndSetters();
};