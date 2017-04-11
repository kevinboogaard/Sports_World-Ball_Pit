var ADCore = ADCore || {};

ADCore.Debug = ( function () {

    /**'
     * 'Debug'
     */
    function Debug() {
        this.ENABLED = false;
    }
    var p = Debug.prototype;

    /**'
     * 'Log'
     */
    p.Log = function (/**/) {
        if ( this.ENABLED === false ) return;
        console.log.apply( console, arguments );
    };

    /**'
     * 'LogError'
     */
    p.LogError = function (/**/) {
        if ( this.ENABLED === false ) return;
        console.error.apply( console, arguments );
    };

    /**'
     * 'LogWarning'
     */
    p.LogWarning = function (/**/) {
        if ( this.ENABLED === false ) return;
        console.warn.apply( console, arguments );
    };

    /**'
     * 'LogInfo'
     */
    p.LogInfo = function (/**/) {
        if ( this.ENABLED === false ) return;
        console.info.apply( console, arguments );
    };

    /**'
     * 'ClearLog'
     */
    p.ClearLog = function () {
        if ( this.ENABLED === false ) return;
        console.clear();
    };

    /**'
     * 'DrawLine'
     */
    p.DrawLine = function ( start, end, color, wired ) {
        if ( this.ENABLED === false ) return;

        var data = { "start": start, "end": end };
        ADCore.phaser.debug.geom( data, color, !wired, 4 );
    };

    /**'
     * 'DrawRect'
     */
    p.DrawRect = function ( center, size, color, wired ) {
        if ( this.ENABLED === false ) return;

        var data = { "x": center.x, "y": center.y, "width": size.x, "height": size.y };
        ADCore.phaser.debug.geom( data, color, !wired, 1 );
    };

    /**'
     * 'DrawCircle'
     */
    p.DrawCircle = function ( center, radius, color, wired ) {
        if ( this.ENABLED === false ) return;

        var data = { "x": center.x, "y": center.y, "radius": radius };
        ADCore.phaser.debug.geom( data, color, !wired, 2 );
    };

    /**'
     * 'DrawText'
     */
    p.DrawText = function ( text, position, color, font ) {
        if ( this.ENABLED === false ) return;
        
        ADCore.phaser.debug.text( text, position.x, position.y, color, font );
    };

    return Debug;
}() );