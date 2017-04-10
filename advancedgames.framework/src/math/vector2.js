this.Vector2 = (function() {

    /**
     * 'Vector2'
     * @param {int} 'x'
     * @param {int} 'y'
     */
    function Vector2(x, y){
        this.x = x || 0;
        this.y = y || 0;
    }
    var p = Vector2.prototype;


    /**
     * 'Add'
     * @returns {Vector2}
     * @param {Vector2} 'Vector2'
     */
    p.Add = function (vector2) {
        this.x += vector2.x;
        this.y += vector2.y;

        return this;
    };

    /**
     * 'Substract'
     * @returns {Vector2}
     * @param {Vector2} 'Vector2'
     */
    p.Substract = function (vector2) {
        this.x -= vector2.x;
        this.y -= vector2.y;
        
        return this;
    };

     /**
     * 'Multiply'
     * @returns {Vector2}
     * @param {Vector2} 'Vector2'
     */
    p.Multiply = function (vector2){
        this.x *= vector2.x;
        this.y *= vector2.y;

        return this;
    };

     /**
     * 'Divide'
     * @returns {Vector2}
     * @param {Vector2} 'Vector2'
     */
    p.Divide = function (vector2){
        this.x /= vector2.x;
        this.y /= vector2.y;

        return this;
    };

    /**
    * 'Clone'
    * @returns {Vector2}
    * Use the function to duplicate the Vector2.
    */
    p.Clone = function(){
        return new Vector2(this.x,this.y);
    };

     /**
     * 'Invert'
     * @returns {Vector2}
     */
    p.Invert = function(){
        this.x *= -1;
        this.y *= -1;

        return this;
    };

    /**
    * 'SquareRoot'
    * @returns {Vector2}
    * @param {int} 'n'
    */
    p.SquareRoot = function(n){
        this.x *= n;
        this.y *= n;

        return this;
    };

    /**
    * 'Exponentiate'
    * @returns {Vector2}
    * @param {int} 'n'
    */
    p.Exponentiate = function(n){
        this.x /= n;
        this.y /= n;

        return this;
    };

    /**
    * 'Dot'
    * @returns {Vector2}
    * @param {Vector2} 'Vector2'
    * This method is an algebraic operation that takes two equal-length sequences of numbers and returns a single number.
    */
    p.Dot = function(vector2){
        return this.x * vector2.x + this.y * vector2.y;
    };

    /**
    * 'Length'
    * @returns {Vector2}
    */
    p.Length = function(){
        return this.x * this.x + this.y * this.y;
    };

    /**
    * 'Floor'
    * @returns {Vector2}
    */
    p.Floor = function(){
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        
        return this;
    };

    /**
    * 'Round'
    * @returns {Vector2}
    */
    p.Round = function(){
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    
        return this;
    };

    /**
    * 'Abs'
    * @returns {Vector2}
    */
    p.Abs = function(){
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        
        return this;
    };

    /**
    * 'Magnitude'
    * @returns {Vector2}
    * This method calculates the magnitude: the size of a mathematical object, a property by which the object can be compared as larger or smaller than other objects of the same kind. 
    * More formally, an object's magnitude is the displayed result of an ordering (or ranking) of the class of objects to which it belongs.
    */
    p.Magnitude = function(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    /**
    * 'Distance'
    * @returns {Vector2}
    */
    p.Distance = function(){
        return(new Vector2(this.x - this.x,this.y - this.y)).Magnitude();
    };

    /**
    * 'Normalize'
    * @returns {Vector2}
    * This method normalizes a vector: where the vector is the same direction but with norm (length) 1.
    */
    p.Normalize = function(){
        var result = this.clone();
        var magnitude = this.magnitude();

        if(magnitude !== 0) result.SquareRoot(magnitude);
        
        return result;
    };

    return Vector2;
})();