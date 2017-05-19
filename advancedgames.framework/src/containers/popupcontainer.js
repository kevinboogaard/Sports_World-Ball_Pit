/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.PopupContainer = ( function () {

    /**
     * @class PopupContainer
     * @extends Phaser.Group
     * @constructor
     * @param {PauseSystem} pausesystem
     */
    function PopupContainer( pausesystem ) {
        Phaser.Group.call(this, ADCore.phaser, null, "PopupContainer");

        /**
         * @property {PauseSystem} _Pausesystem
         * @private
         */
        this._pauseSystem = pausesystem;

        /**
         * @property {Phaser.Graphics} _Overlay
         * @private
         */
        this._overlay = null;
        
        /**
         * @property {Popup} CurrentPopup
         * @private
         */
        this.currentPopup = null;

        /**
         * @property {Array} OpenPopups
         * @private
         */
        this.openPopups = [];

        this._initialize();
    }
    PopupContainer.prototype = Object.create(Phaser.Group.prototype);
    PopupContainer.prototype.constructor = PopupContainer;
    var p = PopupContainer.prototype;
    
     /**
     * @method _Initialize
     * @memberof PopupContainer
     * @private
     */
    p._initialize = function () {
        this._overlay = new Phaser.Graphics(ADCore.phaser);
        this._overlay.beginFill( 0x000000, 0.5 );
        this._overlay.drawRect( 0, 0, Config.Core.Dimensions.width, Config.Core.Dimensions.height );
        this._overlay.endFill();
        this._overlay.alpha = 0.01;
        this._overlay.visible = false;
        this.addChild( this._overlay );
    };

     /**
     * @method Update
     * @memberof PopupContainer
     * @public
     * @param {Integer} deltaTime
     */
    p.Update = function ( deltaTime  ) {
        if ( this.currentPopup ) this.currentPopup.update( deltaTime );
    };

     /**
     * @method DisplayPopup
     * @memberof PopupContainer
     * @public
     * @param {Popup} popup
     */
    p.DisplayPopup = function ( popup ) {
        if ( this.currentPopup ) this.currentPopup.hasFocus = false;

        this.currentPopup = popup;
        this.currentPopup.hasFocus = true;
        this.currentPopup.TransitionIn();
        this.openPopups.push( this.currentPopup );

        this._pauseSystem.PauseBy( popup );

        if ( this._overlay.visible == false ) this.ShowOverlay();

        this.addChild( this.currentPopup );

        return this.currentPopup;
    };

     /**
     * @method ConcealPopup
     * @memberof PopupContainer
     * @public
     * @param {Function} [callback]
     */
    p.ConcealPopup = function (callback) {
        if ( !this.currentPopup ) throw "Can't close a non-existant popup";

        var index = this.openPopups.indexOf( this.currentPopup );
        this.openPopups.splice( index, 1 );

        this.currentPopup.TransitionOut(function (caller) {
            this._pauseSystem.UnpauseBy( caller );

            if ( this.openPopups.length > 0 ) {
                this.currentPopup = this.openPopups[this.openPopups.length - 1];
                this.currentPopup.hasFocus = true;
                this.addChildAt( this._overlay, this.openPopups.length - 1 );
            } else {
                this.currentPopup = null;
            }

            this._destroyPopup(caller);

            if (callback) callback();
        }.bind(this, this.currentPopup));

        if (this.openPopups.length === 0) {
            this.HideOverlay();
        }
    };

     /**
     * @method ConcealAllPopups
     * @memberof PopupContainer
     * @public
     * @param {Function} [callback]
     */
    p.ConcealAllPopups = function (callback) {
        if ( !this.currentPopup ) throw "Can't close a non-existant popup";

        var len = this.openPopups.length;
        for( var i = len - 1; i >= 0; i-- ) {
            var popup = this.openPopups[i];

            popup.TransitionOut( function (caller) {
                this._pauseSystem.UnpauseBy( caller );
                this._destroyPopup(caller);
            }.bind(this, popup));

            this.openPopups.slice( i, 1 );
        }

        if (callback) {
            setTimeout( function () {
                callback();
            }.bind(this), 400);
        }
    
        this.HideOverlay();
    };

     /**
     * @method ShowOverlay
     * @memberof PopupContainer
     * @public
     */
    p.ShowOverlay = function () {
        this._overlay.visible = true;
        TweenLite.to(this._overlay, 0.25, { alpha: 0.99 });
    };

     /**
     * @method HideOverlay
     * @memberof PopupContainer
     * @public
     */
    p.HideOverlay = function () {
        TweenLite.to(this._overlay, 0.25, { alpha: 0.01, onComplete: function () {
            this._overlay.visible = false;
        }.bind(this)});
    };

     /**
     * @method _DestroyPopup
     * @memberof PopupContainer
     * @private
     */
    p._destroyPopup = function ( popup ) {
        popup.Dispose();
        this.removeChild( popup );
    };

     /**
     * @method Dispose
     * @memberof PopupContainer
     * @public
     */
    p.Dispose = function () {
        var len = this.openPopups.length;
        for ( var i = len; i >= 0; i--) {
            var popup = this.openPopups[i];
            popup.dispose();
        }
        delete this.openPopups;
        delete this.currentPopup;

        delete this._pauseSystem;

        this.removeChild( this._overlay );
        delete this._overlay;
    };

    return PopupContainer;
}() );