var ADCore = ADCore || {};
ADCore.Utilities = {};

ADCore.Utilities.PI = 3.14159265359;

/**
 * Number.isInteger
 * @static
 * @returns {boolean}
 * @param {int} 'value'
 * Internet Explorer doesn't support the 'isInteger' function. 
 * If the function doesn't exist ( internet explorer :| ), create a new one with the exact same effect!
 */
Number.isInteger = Number.isInteger || function ( value ) {
    return typeof value === "number" &&
           isFinite( value ) &&
           Math.floor( value ) === value;
};

/**
 * 'Math.randomRange'
 * @static
 * @returns {int}
 * @param {int} 'min'
 * @param {int} 'max'
 * This method returns a random number between the specified values.
 * The returned value is no lower than (and may possibly equal) min, and is less than (but not equal to) max.
 */
Math.randomRange = function ( min, max ) {
    return Math.floor( Math.random() * ( max - min ) ) + min;
};

/**
 * 'Math.toRadians'
 * @static
 * @returns {int}
 * @param {int} 'degrees'
 */
Math.toRadians = function ( degrees ) {
    return degrees * Math.PI / 180;
};

/**
 * 'Math.toDegrees'
 * @static
 * @returns {int}
 * @param {int} 'radians'
 */
Math.toDegrees = function ( radians ) {
    return radians * 180 / Math.PI;
};

/**
 * 'Shuffle'
 * This method allows the programmer to shuffle the array.
 */
Array.prototype.shuffle = function () {
    var len = this.length;
    for ( var i = len; i; i-- ) {
        var j = Math.floor( Math.random() * i );
        var x = this[i - 1];
        this[i - 1] = this[j];
        this[j] = x;
    }
};

/**
 * 'PushAt'
 * @param {int} 'index'
 * @param {T} 'value'
 * This method allows the programmer to push a value at an index.
 */
Array.prototype.pushAt = function (index, value) {
    if ( index >= this.length ) throw new Error( "Index is greater than it's length." );
    this.splice( index, 0, value );
};

/**
 * 'Contains'
 * @param {T} 'item'
 * This method allows the programmer to check if an array contains an item.
 */
Array.prototype.contains = function(item) {
    var index = this.indexOf(item);
    return (index > -1) ? true : false;
};

/**
 * 'msToTime'
 * @static
 * @returns {int}
 * @param {int} 'duration'
 * @param {Array} settings - "hours, minutes, seconds, milliseconds";
 */
ADCore.msToTime = function ( duration, settings ) {    
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

ADCore.Utilities.HasObjectValue = function (object, value) {
    return Object.keys(object).some(function(v) {
        return object[v] === value;
    });
};