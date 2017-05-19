/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.PauseSystem = ( function () {

     /**
     * @class PauseSystem
     * @constructor
     */
    function PauseSystem( ) {
        /**
         * @property {Boolean} _Paused;
         * @private
         * @default False
         */
        this._paused = false;

        /**
         * @property {Boolean} _Registry;
         * @private
         */
        this._registry = [];

        ADCore.EnableMutators( this );
    }
    var p = PauseSystem.prototype;

     /**
     * @method _Update
     * @memberof PauseSystem
     * @private
     */
    p._update = function () {
        if ( this._registry.length > 0 ) {
            this._paused = true;
            Input.paused = true;
        } else {
            this._paused = false;
            Input.paused = false;
        }
    };

     /**
     * @method PauseBy
     * @memberof PauseSystem
     * @public
     * @param {Object} caller
     */
    p.PauseBy = function ( caller ) {
        var index = this._registry.indexOf( caller );

        if ( index !== -1 ) throw new Error( "Caller has already called pause." );
        if ( !caller ) throw new Error( "Caller isn't an object" );

        this._registry.push( caller );
        this._update();
    };

     /**
     * @method UnpauseBy
     * @memberof PauseSystem
     * @public
     * @param {Object} caller
     */
    p.UnpauseBy = function ( caller ) {
        var index = this._registry.indexOf( caller );

        if ( index == -1 ) throw new Error( "Caller has never called pause." );
        if ( !caller ) throw new Error( "Caller isn't an object" );

        this._registry.splice( index, 1 );
        this._update();
    };

    /*
     * @method Dispose
     * @memberof PauseSystem
     * @public
     */
    p.Dispose = function () {
        var len = this._registry.length;
        for ( var i = len - 1; i >= 0; i-- ) {
            this._registry.splice( i, 1 );
        }
        delete this._registry;
    };

    /**
     * Getters & Setters internal function.
     * 
     * @method GettersAndSetters
     * @memberof PauseSystem
     * @private 
     * @ignore
     */
    p.gettersAndSetters = function () {
        this.Get( "paused", function () {
            return this._paused;
        } );
    };

    return PauseSystem;
}() );