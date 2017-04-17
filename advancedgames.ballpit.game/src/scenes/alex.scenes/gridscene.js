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
        this.ballController = new ballpit.BallController(this.tilemap.mainLayer, this.ballContainer);

        this.ballController.Initialize();

        this.swipePositions = { start: null, end: null };

        Listener.Listen(ADCore.InputEvent.ON_DOWN, this, this._onDown.bind(this));
        Listener.Listen(ADCore.InputEvent.ON_UP, this, this._onUp.bind(this));
    }
    Gridscene.prototype = Object.create(Phaser.Group.prototype);
    Gridscene.prototype.constructor = Gridscene; 
    var p = Gridscene.prototype;

    p.update = function (deltatime) {
        if (this.swipePositions.start && !this.swipePositions.end) {
            Debug.DrawLine(this.swipePositions.start, inputSystem.inputPosition, "#FF0000", false);
        }

        this.ballContainer.Update(deltatime);
    };

    p.render = function () {
        this.viewContainer.render();
    };

     p._onDown = function (caller, params) {
         this.swipePositions.start = params.position.Clone();
    };

    p._onUp = function (caller, params) {
        this.swipePositions.end = params.position.Clone();

        var diff = this.swipePositions.end.Clone().Substract(this.swipePositions.start);

        if (diff.x !== 0 && diff.y !== 0) {
            var selected = this.tilemap.mainLayer.GetTileByScreenPosition(this.swipePositions.start);
            if (this.ballController.CanSwap(selected)) {
                var targeted = this.tilemap.mainLayer.GetNeighbourFromTileByDirection(selected, diff.Normalize());
                
                if (this.ballController.CanSwap(targeted)) {
                    selected.occupier.beginning = selected;
                    targeted.occupier.beginning = targeted;

                    this.ballController.Swap(selected, targeted);
                }
            }
        }

        this.swipePositions.start = null;
        this.swipePositions.end = null;
    };

    p.dispose = function () {
    
    };

    return Gridscene;
}());
