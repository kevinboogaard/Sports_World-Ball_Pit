/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.Popup = ( function () {

    /**
     * @class Popup
     * @extends Phaser.Group
     * @constructor
     * @abstract
     * @param {Function} callback
     */
    function Popup(callback) {
        if ( this.constructor === Popup ) throw "This class is an abstract class.";
        Phaser.Group.call( this, ADCore.phaser );

        /**
         * @property {Function} callback
         * @private
         */
        this._callback = callback;

        /**
         * @property {Boolean} HasFocus
         * @public
         * @default False
         */
        this.hasFocus = false;

        /**
         * @property {Boolean} Disposed
         * @public
         * @default False
         */
        this.disposed = false;
    }
    Popup.prototype = Object.create( Phaser.Group.prototype );
    Popup.prototype.constructor = Popup;
    var p = Popup.prototype;

     /**
     * @method Update
     * @memberof Popup
     * @public
     * @param {Integer} deltaTime
     */
    p.Update = function (deltaTime) {
        
    };

     /**
     * @method TransitionIn
     * @memberof Popup
     * @public
     */
    p.TransitionIn = function () {
        var len = this.children.length;
        for (var i = 0; i < len; i++) {
            var current = this.children[i];
            TweenLite.to(current.scale, 0.3, { x: 1, y: 1 });
        };
    };

     /**
     * @method TransitionOut
     * @memberof Popup
     * @public
     */
    p.TransitionOut = function (callback) {
        var len = this.children.length;
        for (var i = 0; i < len; i++) {
            var current = this.children[i];
            TweenLite.to(current.scale, 0.3, { x: 0.01, y: 0.01 });
        };

        setTimeout(callback, 350);
    };

     /**
     * @method Dispose
     * @memberof Popup
     * @public
     */
    p.Dispose = function () {
        delete this.hasFocus;
        this.disposed = true;
    };

    return Popup;
}() );