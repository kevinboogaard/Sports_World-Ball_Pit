/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

/** @namespace */
let OverlayExcludeTypes; // For documentational Purposes.
ballpit.OverlayExcludeTypes = {};

/** 
 * @property {String} RECT 
 * @memberof OverlayExcludeTypes
 */
ballpit.OverlayExcludeTypes.RECT = "rect";

ballpit.Overlay = (function () {

    /**
     * @class Overlay
     * @constructor 
     * @extends Phaser.Graphics
     * @param {Integer} [color = 0x000000]
     * @param {Integer} [opacity = 1]
     */
    function Overlay(color, opacity) {
        Phaser.Graphics.call( this, ADCore.phaser );

        /** @property {Integer} */
        this._color = color || 0x000000;

        /** @property {Integer} */
        this._opacity = opacity || 1;

        /** @property {Array} */
        this._data = [];

        this.alpha  = 0.01;
    }
    Overlay.prototype = Object.create( Phaser.Graphics.prototype );
    Overlay.prototype.constructor = Overlay;
    var p = Overlay.prototype;

    /**
     * @method ExcludeRect
     * @memberof Overlay
     * @public 
     * @param {Object|Array} data
     * @param {Object} data.position
     * @param {Object} data.dimensions
     */
    p.ExcludeRect = function (data) {
        data.type = ballpit.OverlayExcludeTypes.RECT;
        this._data.push(data);
    };

    /**
     * @method Draw 
     * @memberof Overlay
     * @public
     */
    p.Draw = function () {
        this.beginFill(this._color, this._opacity);
        this.moveTo(0,0);
        this.lineTo(Config.Core.Dimensions.width, 0);

        var len = this._data.length;
        for (var i = 0; i < len; i++) {
            var data = this._data[i];

            if (data.type === ballpit.OverlayExcludeTypes.RECT) {
                this._drawRect(data);
            }
        }

        this.lineTo(Config.Core.Dimensions.width, Config.Core.Dimensions.height);
        this.lineTo(0, Config.Core.Dimensions.height);
        this.lineTo(0, 0);
        this.endFill();
    };

    /**
     * @method Clear
     * @memberof Overlay
     * @public
     */
    p.Clear = function () {
        this._data = [];
        this.clear();
    };

    /**
     * @method TransitionIn
     * @memberof Overlay
     * @public
     * @param {Function} [callback]
     */
    p.TransitionIn = function (callback) {
        this.Draw();

        if (callback) TweenLite.to(this, 1, { alpha: 0.99, onComplete: callback});
        else TweenLite.to(this, 1, { alpha: 0.99 });
    };
    
    /**
     * @method TransitionOut
     * @memberof Overlay
     * @public
     * @param {Function} [callback]
     */
    p.TransitionOut = function (callback) {
        if (callback) TweenLite.to(this, 1, { alpha: 0.01, onComplete: function () {
            this.Clear();
            callback();
        }.bind(this)});
        else TweenLite.to(this, 1, { alpha: 0.01, onComplete: this.Clear.bind(this) });
    };

    /**
     * @method _DrawRect
     * @memberof Overlay
     * @private
     */
    p._drawRect = function (data) {
        var x = data.position.x;
        var y = data.position.y;
        var width = data.dimensions.width;
        var height = data.dimensions.height;

        this.lineTo(Config.Core.Dimensions.width, y);
        this.lineTo(x, y);
        this.lineTo(x, y + height);
        this.lineTo(x + width, y + height);
        this.lineTo(x + width, y);
        this.lineTo(Config.Core.Dimensions.width, y);
    };
    
    /**
     * @method Dispose
     * @memberof Overlay
     * @public
     */
    p.Dispose = function () {
        delete this._color;
        delete this._opacity;
        delete this._data;
    };

    return Overlay;
})();