var ADCore = ADCore || {};

function initialize() {
    /**
     * Create the phaser: 'Heart of the game'. The framework creates the renderer for the game. ( http://phaser.io/docs/2.4.4/Phaser.Game.html )
     * Once the heart has been made, the game will preload using the 'preload' method.
     * The create function will be called once the preloader has finished preloading.
     */   
    ADCore.phaser = new Phaser.Game(Config.Core.Dimensions.width, Config.Core.Dimensions.height, Config.Core.Renderer, Config.Core.Parent, {
        preload: preload.bind(this), 
        create: create.bind(this),
        update: update.bind(this),
        render: render.bind(this)
    });

    // Initialize the main of the game.
    this.main = new ballpit.Core();
    // Create the scene loader system.
    this.sceneLoader = new ADCore.Sceneloader();
    // Create the preloader system that preloads the resources in a json file.
    this.preloader = new ADCore.Preloader(ADCore.phaser);
}

function preload () {
    this.preloader.initialize();
}

function create () {
    // Create the input system.
    this.inputSystem = new ADCore.InputSystem(ADCore.phaser.input);

    setTimeout(function () {
        this.main.start();
    }.bind(this), 1);
}

function update () {
    this.main.update();
}

function render () {
    this.main.render();
}