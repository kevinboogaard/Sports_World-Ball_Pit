/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
this.Vector2 = (function() {

    /**
     * A Vector2 object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis. 
     * The following code creates a vector at (0,0): 
     * var myVector2 = new Vector2();
     * 
     * @class Vector2
     * @constructor
     * @param {number} [x=0] - The horizontal position of this Vector.
     * @param {number} [y=0] - The vertical position of this Vector.
     */
    function Vector2(x, y){

        x = x || 0;
        y = y || 0;

        /**
         * @property {number} x - The x value of the vector.
         * @public
         */
        this.x = x;

        /**
         * @property {number} y - The y value of the vector.
         * @public
         */
        this.y = y;
    } 
    var p = Vector2.prototype;


    /**
     * Adds the given vector to this Vector.
     *
     * @method Add
     * @memberof Vector2
     * @public
     * @param {Vector2} vector - The vector to add to the vector.
     * @returns {Vector2} This Vector object. Useful for chaining method calls.
     */
    p.Add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;

        return this;
    };

    /**
     * Substracts the given vector to this Vector.
     *
     * @method Substract
     * @memberof Vector2
     * @public
     * @param {Vector2} vector - The vector to substract from the vector.
     * @returns {Vector2} This Vector object. Useful for chaining method calls.
     */
    p.Substract = function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        
        return this;
    };

    /**
     * Multiply the given vector to this Vector.
     *
     * @method Multiply
     * @memberof Vector2
     * @public
     * @param {Vector2} vector - The vector to multiply the vector by.
     * @returns {Vector2} This Vector object. Useful for chaining method calls.
     */
    p.Multiply = function (vector){
        this.x *= vector.x;
        this.y *= vector.y;

        return this;
    };

    /**
     * Divide the given vector to this Vector.
     *
     * @method Divide
     * @memberof Vector2
     * @public
     * @param {Vector2} vector - The vector to divide the vector by.
     * @returns {Vector2} This Vector object. Useful for chaining method calls.
     */
    p.Divide = function (vector){
        this.x /= vector.x;
        this.y /= vector.y;

        return this;
    };

    /**
     * Creates a copy of the given Vector.
     *
     * @method Clone
     * @memberof Vector2
     * @public
     * @returns {Vector2} The new Vector object.
     */
    p.Clone = function(){
        return new Vector2(this.x,this.y);
    };

    /**
     * Inverts the x and y values of this Vector.
     *
     * @method Invert
     * @memberof Vector2
     * @public
     * @returns {Vector2} This Vector object.
     */
    p.Invert = function(){
        this.x *= -1;
        this.y *= -1;

        return this;
    };

    /**
     * Exponentiates the x and y values of this vector by n.
     *
     * @method Exponentiate
     * @memberof Vector2
     * @public
     * @param {number} n - The scalar to exponentiate with.
     * @returns {Vector2} This Vector object. Useful for chaining method calls.
     */
    p.Exponentiate = function(n){
        this.x *= n;
        this.y *= n;

        return this;
    };

    /**
     * Roots the x and y values of this vector by n.
     *
     * @method SquareRoot
     * @memberof Vector2
     * @public
     * @param {number} n - The scalar to root with.
     * @returns {Vector2} This Vector object. Useful for chaining method calls.
     */
    p.SquareRoot = function(n){
        this.x /= n;
        this.y /= n;

        return this;
    };

    /**
     * The dot product of this and another Vector object.
     *
     * @method Dot
     * @memberof Vector2
     * @public
     * @param {Vector2} vector - The vector object to get the dot product combined with this Vector.
     * @returns {number} The result.
     */
    p.Dot = function(vector){
        return this.x * vector.x + this.y * vector.y;
    };

    /**
     * Calculates the length squared of the Vector object.
     *
     * @method Length
     * @memberof Vector2
     * @public
     * @returns {number} The result.
     */
    p.Length = function(){
        return (this.x * this.x) + (this.y * this.y);
    };

    /**
     * Math.floor() both the x and y properties of this Vector.
     *
     * @method Floor
     * @memberof Vector2
     * @public
     * @returns {Vector2} This Vector object.
     */
    p.Floor = function(){
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        
        return this;
    };

    /**
     * Math.round() both the x and y properties of this Vector.
     *
     * @method Round
     * @memberof Vector2
     * @public
     * @returns {Vector2} This Vector object.
     */
    p.Round = function(){
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    
        return this;
    };

    /**
     * Math.abs() both the x and y properties of this Vector.
     *
     * @method Abs
     * @memberof Vector2
     * @public
     * @returns {Vector2} This Vector object.
     */
    p.Abs = function(){
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        
        return this;
    };

    /**
    * Calculates the magnitude: the size of a mathematical object, a property by which the object can be compared as larger or smaller than other objects of the same kind. 
     *
     * @method Magnitude
     * @memberof Vector2
     * @public
     * @returns {number} The result.
     */
    p.Magnitude = function(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    /**
     * Returns the distance of this Vector object to the given vector.
     *
     * @method Distance
     * @memberof Vector2
     * @public
     * @param {number} vector - The Vector to calculate the distance from this Vector with.
     * @returns {number} The result.
     */
    p.Distance = function(vector){
        return(new Vector2(this.x - vector.x, this.y - vector.y)).Magnitude();
    };

    /**
     * Alters the Vector object so that its length is 1, but it retains the same direction.
     *
     * @method Normalize
     * @memberof Vector2
     * @public
     * @returns {Vector} This Vector object.
     */
    p.Normalize = function(){
        var result = this.Clone();
        var magnitude = this.Magnitude();

        if(magnitude !== 0) result.SquareRoot(magnitude);
        
        return result.Round();
    };

    return Vector2;
})();