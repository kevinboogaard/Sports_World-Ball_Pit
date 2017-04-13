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
