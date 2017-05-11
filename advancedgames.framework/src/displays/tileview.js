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

        this.visible = model.layer.visible;
    }
    TileView.prototype = Object.create(ADCore.Display.prototype);
    TileView.prototype.constructor = TileView;
    var p = TileView.prototype;

    /**
     * 'Render'
     */
    p.__display_render = p.render;
    p.render = function () {
        if (!this.visible) return;
        this.__display_render();
    };

    /**
     * 'Dispose'
     */
    p.__display_dispose = p.Dispose;
    p.Dispose = function () {
        this.__display_dispose();
    };

    return TileView;
}());