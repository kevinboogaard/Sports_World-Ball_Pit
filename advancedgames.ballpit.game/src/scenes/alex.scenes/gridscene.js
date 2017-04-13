var scene = scene || {};

scene.Gridscene = (function () {

    /**
     * 'Gridscene'
     */
    function Gridscene() {
        Phaser.Group.call(this, ADCore.phaser, null, "Gridscene");
        console.log("Entering Gridscene");

        this.viewContainer = new ADCore.ViewContainer();
        this.addChild(this.viewContainer);
        
        this.tilemap = new Tilemap(Global.Loaded.level.map);

        this.ballContainer = new ballpit.BallContainer();
        this.ballController = new ballpit.BallController(this.tilemap, this.ballContainer);

        this.ballController.Initialize();

        this.swipePositions = { start: null, end: null };

        Listener.Listen(ADCore.InputEvent.ON_DOWN, this, this._onDown.bind(this));
        Listener.Listen(ADCore.InputEvent.ON_UP, this, this._onUp.bind(this));
    }
    Gridscene.prototype = Object.create(Phaser.Group.prototype);
    Gridscene.prototype.constructor = Gridscene; 
    var p = Gridscene.prototype;

    p.update = function () {
        if (this.swipePositions.start && !this.swipePositions.end) {
            Debug.DrawLine(this.swipePositions.start, inputSystem.inputPosition, "#FF0000", false);
        }
    };

    p.render = function () {
        this.viewContainer.render();
    };

     p._onDown = function (caller, params) {
         this.swipePositions.start = params.position.Clone();
    };

    p._onUp = function (caller, params) {
        this.swipePositions.end = params.position.Clone();

        if (this.ballController.PositionsOnGridByScreenposition( this.swipePositions.start, this.swipePositions.end)) {
            this.ballController.SwapBallsByScreenPositions( this.swipePositions.start, this.swipePositions.end );
        }

        this.swipePositions.start = null;
        this.swipePositions.end = null;
    };

    p.dispose = function () {
    
    };

    return Gridscene;
}());
