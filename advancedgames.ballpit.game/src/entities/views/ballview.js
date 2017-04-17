var ballpit = ballpit || {};

ballpit.BallView = (function () {

    /**
     * BallView class.
     * @extends Display,
     * @param {TileModel} model.
     * @param {String} key.
     */
    function BallView(model, key) {
        ADCore.Display.call( this, model, key );
    }
    BallView.prototype = Object.create(ADCore.Display.prototype);
    BallView.prototype.constructor = BallView;
    var p = BallView.prototype;

    /**
     * 'Dispose'
     */
    p.__display_dispose = p.Dispose;
    p.Dispose = function () {
        this.__display_dispose();
    };

    return BallView;
}());