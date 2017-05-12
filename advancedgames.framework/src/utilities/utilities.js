/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

/**
 * @namespace
 */
let Utilities = {}; // For documentation purposes.
ADCore.Utilities = Utilities;

/** 
 * @property {Number} PI
 * @memberof Utilities
 * @instance
 * @readonly 
 */
ADCore.Utilities.PI = 3.14159265359;

/**
 * Adds the ECMAScript 2015 support to IE11 aswell.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger}
 * 
 * @method Number.isInteger
 * @memberof Utilities
 * @static
 * @param {int} val - value to be checked.
 * @returns {boolean} result
 * 
 * @example 
 * Number.isInteger(10); 
 * // => true
 */
Number.isInteger = Number.isInteger || function ( val ) {
    return typeof val === "number" &&
           isFinite( val ) &&
           Math.floor( val ) === val;
};
ADCore.Utilities.Number = ADCore.Utilities.Number || {};
ADCore.Utilities.Number.isInteger = Number.isInteger;

/**
 * This method returns a random number between the specified values.
 * The returned value is no lower than (and may possibly equal) min, and is less than (but not equal to) max.
 * 
 * @method Math.randomRange
 * @memberof Utilities
 * @static
 * @param {Number} min - Minimum value in range.
 * @param {Number} max - Maximum value in range.
 * @returns {Number} result
 * 
 * @example 
 * Math.randomRange(0, 5); 
 * // => 3
 */
Math.randomRange = Math.randomRange || function ( min, max ) {
    return Math.floor( Math.random() * ( max - min ) ) + min;
};
ADCore.Utilities.Math = ADCore.Utilities.Math || {};
ADCore.Utilities.Math.randomRange = Math.randomRange;

/**
 * This method turns degrees into radians.
 * 
 * @method Math.toRadians
 * @memberof Utilities
 * @static
 * @param {Number} degrees
 * @returns {Number} radians
 * 
 * @example 
 * Math.toRadians(90); 
 * // => 1.5708
 */
Math.toRadians = Math.toRadians || function ( degrees ) {
    return degrees * Math.PI / 180;
};
ADCore.Utilities.Math = ADCore.Utilities.Math || {};
ADCore.Utilities.Math.toRadians = Math.toRadians;


/**
 * This method turns radians into degrees.
 * 
 * @method Math.toDegrees
 * @memberof Utilities
 * @static
 * @param {Number} radians
 * @returns {Number} degrees
 * 
 * @example 
 * Math.toDegrees(1.5708); 
 * // => 90
 */
Math.toDegrees = Math.toDegrees || function ( radians ) {
    return radians * 180 / Math.PI;
};
ADCore.Utilities.Math = ADCore.Utilities.Math || {};
ADCore.Utilities.Math.toDegrees = Math.toDegrees;

/**
 * This method shuffles all values in the array.
 * 
 * @method Array.shuffle
 * @memberof Utilities
 * @public
 * 
 * @example 
 * var array = [0, 1, 2, 3, 4, 5]; 
 * array.shuffle();
 * // => [2, 1, 5, 3, 4, 0]
 */
Array.prototype.shuffle = Array.prototype.shuffle ||  function () {
    var len = this.length;
    for ( var i = len; i; i-- ) {
        var j = Math.floor( Math.random() * i );
        var x = this[i - 1];
        this[i - 1] = this[j];
        this[j] = x;
    }
};
ADCore.Utilities.Array = ADCore.Utilities.Array || {};
ADCore.Utilities.Array.shuffle = Array.prototype.shuffle;

/**
 * Push a value at an index..
 * 
 * @method Array.pushAt
 * @memberof Utilities
 * @public
 * @param {Number} index - Index to be pushed at.
 * @param {T} val - Value to be pushed into the array.
 * 
 * @example 
 * var array = [0, 1, 2, 4, 5]; 
 * array.pushAt(3, 3);
 * // => [0, 1, 2, 3, 4, 5]
 */
Array.prototype.pushAt = Array.prototype.pushAt || function (index, val) {
    if ( index >= this.length ) throw new Error( "Index is greater than it's length." );
    this.splice( index, 0, val );
};
ADCore.Utilities.Array = ADCore.Utilities.Array || {};
ADCore.Utilities.Array.pushAt = Array.prototype.pushAt;

/**
 * Check if the array contains an item.
 * 
 * @method Array.contains
 * @memberof Utilities
 * @public
 * @param {T} item - item to be checked if it contains in the array.
 * @returns {Boolean} result
 * 
 * @example 
 * var array = [0, 1, 2, 4, 5]; 
 * array.contains(2);
 * // => true
 */
Array.prototype.contains = Array.prototype.contains || function(item) {
    var index = this.indexOf(item);
    return (index > -1) ? true : false;
};
ADCore.Utilities.Array = ADCore.Utilities.Array || {};
ADCore.Utilities.Array.contains = Array.prototype.contains;

/**
 * Turns Milliseconds into a time format: HH:MM:SS:MS.
 * The translation follows the order of the settings variable.  
 * 
 * @method ADCore.Utilities.MsToTime
 * @memberof Utilities
 * @public
 * @param {Integer} duration
 * @param {Array} settings - An array with strings: "hours", "minutes", "seconds", "milliseconds";
 * @returns {String} The translation
 * 
 * @example 
 * ADCore.Utilities.MsToTime(100000, ["hours", "minutes", "seconds"]);
 * // => 00:01:00 = 1 minute.
 * 
 * ADCore.Utilities.MsToTime(100000, ["minutes", "hours", "seconds"]);
 * // => 01:00:00
 */
ADCore.Utilities.MsToTime = function ( duration, settings ) {    
        if (!settings) settings = [ "hours", "minutes", "seconds", "milliseconds" ];

        var time = { 
            milliseconds: parseInt((duration%1)/100),
            seconds: parseInt((duration/1)%60),
            minutes: parseInt((duration/(1*60))%60),
            hours: parseInt((duration/(1*60*60))%24)
        };

        time.hours = (time.hours < 10) ? "0" + time.hours : time.hours;
        time.minutes = (time.minutes < 10) ? "0" + time.minutes : time.minutes;
        time.seconds = (time.seconds < 10) ? "0" + time.seconds : time.seconds;

        var timestring = "";
        var settings_len = settings.length;

        for (var i = 0; i < settings_len; i++ ) {
            timestring += time[settings[i]];
            
            if (i + 1 < settings_len) timestring += ":";
        }

        return timestring;
};

/**
 * Check if the Object has a value.
 * 
 * @method ADCore.Utilities.HasObjectValue
 * @memberof Utilities
 * @param {T} object - object to search in.
 * @param {T} value - value to look for.
 * @returns {boolean} result
 * 
 * @example 
 * var object = { "value": 0 };
 * ADCore.Utilities.HasObjectValue(object, 0);
 * // => true
 */
ADCore.Utilities.HasObjectValue = function (object, value) {
    return Object.keys(object).some(function(v) {
        return object[v] === value;
    });
};