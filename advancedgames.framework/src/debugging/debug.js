/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.Debug = ( function () {

    /**
     * This Debug class has debug functionality for the game.
     * To enable this class turn in the configuration the ENABLED variable on true.
     * 
     * @class Debug
     * @constructor
     */
    function Debug() {

        /**
         * @property {Boolean} ENABLED
         * @public
         * @default false
         */
        this.ENABLED = false;
    }
    var p = Debug.prototype;

    /**
     * @method Log
     * @memberof Debug
     * @public
     * @param {T...}
     */
    p.Log = function (/**/) {
        if ( this.ENABLED === false ) return;
        console.log.apply( console, arguments );
    };

    /**
     * @method LogError
     * @memberof Debug
     * @public
     * @param {T...}
     */
    p.LogError = function (/**/) {
        if ( this.ENABLED === false ) return;
        console.error.apply( console, arguments );
    };

    /**
     * @method LogWarning
     * @memberof Debug
     * @public
     * @param {T...}
     */
    p.LogWarning = function (/**/) {
        if ( this.ENABLED === false ) return;
        console.warn.apply( console, arguments );
    };

    /**
     * @method LogInfo
     * @memberof Debug
     * @public
     * @param {T...}
     */
    p.LogInfo = function (/**/) {
        if ( this.ENABLED === false ) return;
        console.info.apply( console, arguments );
    };

    /**
     * @method ClearLog
     * @memberof Debug
     * @public
     */
    p.ClearLog = function () {
        if ( this.ENABLED === false ) return;
        console.clear();
    };

    /**
     * @method DrawLine
     * @memberof Debug
     * @public
     * @param {Vector2} start
     * @param {Vector2} end
     * @param {Integer} color
     * @param {Boolean} wired - Draw the line in wired mode.
     */
    p.DrawLine = function ( start, end, color, wired ) {
        if ( this.ENABLED === false ) return;

        var data = { "start": start, "end": end };
        ADCore.phaser.debug.geom( data, color, !wired, 4 );
    };

    /**
     * @method DrawRect
     * @memberof Debug
     * @public
     * @param {Vector2} center
     * @param {Vector2} size
     * @param {Integer} color
     * @param {Boolean} wired - Draw the line in wired mode.
     */
    p.DrawRect = function ( center, size, color, wired ) {
        if ( this.ENABLED === false ) return;

        var data = { "x": center.x, "y": center.y, "width": size.x, "height": size.y };
        ADCore.phaser.debug.geom( data, color, !wired, 1 );
    };

    /**
     * @method DrawCircle
     * @memberof Debug
     * @public
     * @param {Vector2} center
     * @param {Integer} radius
     * @param {Integer} color
     * @param {Boolean} wired - Draw the line in wired mode.
     */
    p.DrawCircle = function ( center, radius, color, wired ) {
        if ( this.ENABLED === false ) return;

        var data = { "x": center.x, "y": center.y, "radius": radius };
        ADCore.phaser.debug.geom( data, color, !wired, 2 );
    };

    /**
     * Be warned with the DrawText() method. This function is very heavy for the canvas and may cause lag in your game!
     * 
     * @method DrawText
     * @memberof Debug
     * @public
     * @param {String} text
     * @param {Vector2} position
     * @param {Integer} color
     * @param {String} font
     */
    p.DrawText = function ( text, position, color, font ) {
        if ( this.ENABLED === false ) return;
        
        ADCore.phaser.debug.text( text, position.x, position.y, color, font );
    };

    return Debug;
})();