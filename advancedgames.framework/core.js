var ADCore = ADCore || {};

 /**
 * 'Initialize'
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
 */
function _preload () {
    this.preloader.Initialize();
}

 /**
 * 'Create'
 * @private
 * Called by Phaser after preload..
 */
function _create () {
    // Create the input system.
    this.inputSystem = new ADCore.InputSystem(ADCore.phaser.input);

    setTimeout(function () {
        this.main.Start();
    }.bind(this), 1);
}

 /**
 * 'Update'
 * @private
 * Called by Phaser on Update call.
 */
function _update () {
    this.main.Update();
}

 /**
 * 'Render'
 * @private
 * Called by Phaser on Render.
 */
function _render () {
    this.main.Render();
}