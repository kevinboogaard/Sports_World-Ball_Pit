var scene = scene || {};

scene.Game = (function () {

    /**
     * 'Game'
     */
    function Game() {
        Phaser.Group.call(this, ADCore.phaser, null, "Game");
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
    Game.prototype = Object.create(Phaser.Group.prototype);
    Game.prototype.constructor = Game; 
    var p = Game.prototype;

    p.Update = function (deltatime) {
        if (this.swipePositions.start && !this.swipePositions.end) {
            Debug.DrawLine(this.swipePositions.start, inputSystem.inputPosition, "#FF0000", false);
        }

        this.ballContainer.Update(deltatime);
    };

    p.Render = function () {
        this.viewContainer.render();
    };

     p._onDown = function (caller, params) {
         this.swipePositions.start = params.position.Clone();
    };

    p._onUp = function (caller, params) {
        if (this.swipePositions.start === null) return;
        this.swipePositions.end = params.position.Clone();

        var diff = this.swipePositions.end.Clone().Substract(this.swipePositions.start);

        if (diff.x !== 0 && diff.y !== 0) {
            var selected = this.tilemap.mainLayer.GetTileByScreenPosition(this.swipePositions.start);
            if (this.ballController.CanMove(selected)) {
                var targeted = this.tilemap.mainLayer.GetNeighbourFromTileByDirection(selected, diff.Normalize());
                
                if (this.ballController.CanSwap(selected, targeted)) {
                    selected.occupier.beginning = selected;
                    targeted.occupier.beginning = targeted;

                    this.ballController.Swap(selected, targeted);
                } else if (this.ballController.CanMove(targeted)){
                    Listener.Dispatch(ballpit.Event.ON_BALL_SWAP_WRONG, selected.occupier);
                    Listener.Dispatch(ballpit.Event.ON_BALL_SWAP_WRONG, targeted.occupier);
                }
            }
        }

        this.swipePositions.start = null;
        this.swipePositions.end = null;
    };

    p.Dispose = function () {
        this.viewContainer.Dispose();
        this.removeChild(this.viewContainer);
        delete this.viewContainer;

        this.tilemap.Dispose();
        delete this.tilemap;

        this.ballContainer.Dispose();
        delete this.ballContainer;

        this.ballController.Dispose();
        delete this.ballController;
        
        delete this.swipePositions;
    };

    return Game;
}());
