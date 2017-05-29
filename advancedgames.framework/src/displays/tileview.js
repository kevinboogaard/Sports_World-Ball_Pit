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

        /**
         * @property {Object|Integer} effect
         * @public
         */
        this.effect = null;

        Listener.Listen(ADCore.Event.ON_EFFECT_SET, this, this._onEffectSet.bind(this), this.model);
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
    }
    
    /**
     * @method _OnEffectSet
     * @memberof TileView
     * @private
     * @ignore
     */
    p._onEffectSet = function () {
        if (isNaN(this.model.effect)) {
            if (this.effect === this.model.effect) return;
            else if (this.effect && this.effect !== this.model.effect) {
                this.removeChild(this.effect);
                this.effect.Dispose();
                this.effect = null;
            }

            if (this.effect === null) {
                this.effect = this.model.effect;

                this.addChild(this.effect);
                this.effect.x = -8; // offsetX;
                this.effect.y = -9; // offsetY;
            } 
        } else if (this.model.effect !== null) {
            this.tint = this.model.effect;
        } else if (this.effect) {
            this.removeChild(this.effect);
            this.effect.Dispose();
            this.effect = null;
        }
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