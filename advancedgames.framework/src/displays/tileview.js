var ADCore = ADCore || {};

ADCore.TileView = (function () {

    /**
     * TileView class.
     * Used only by the tilemap class. Don't create your own tiles.
     * @extends Display,
     * @param {TileModel} model.
     * @param {String} key.
     */
    function TileView(model, key) {
        ADCore.Display.call( this, model, key );
    }
    TileView.prototype = Object.create(ADCore.Display.prototype);
    TileView.prototype.constructor = TileView;
    var p = TileView.prototype;

    /**
     * 'Render'
     */
    p.__display_render = p.render;
    p.render = function () {
        this.__display_render();
    };

    /**
     * 'Dispose'
     */
    p.__display_dispose = p.dispose;
    p.dispose = function () {
        this.__display_dispose();
    };

    return TileView;
}());