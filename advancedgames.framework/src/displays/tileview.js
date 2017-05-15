/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.TileView = (function () {

    /**
     * This class is used by a TileLayer to spawn the tiles according to the Tiled Map.
     * 
     * @class TileView
     * @constructor
     * @extends Display,
     * @param {TileModel} model
     * @param {String} key
     */
    function TileView(model, key) {
        ADCore.Display.call( this, model, key );

        /**
        * @property {Boolean} visible - Phaser Set Visible From Layer
        * @ignore
        */
        this.visible = model.layer.visible;
    }
    TileView.prototype = Object.create(ADCore.Display.prototype);
    TileView.prototype.constructor = TileView;
    var p = TileView.prototype;

    /**
     * @method Render
     * @memberof TileView
     * @public
     */
    p.__display_render = p.Render;
    p.Render = function () {
        if (!this.visible) return;
        this.__display_render();
    };

    /**
     * Dispose the display. Use this method to clean the display in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof TileView
     * @public
     */
    p.__display_dispose = p.Dispose;
    p.Dispose = function () {
        this.__display_dispose();
    };

    return TileView;
}());