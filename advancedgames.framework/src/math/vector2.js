this.Vector2 = (function() {

    function Vector2(x, y){
        this.x = x || 0;
        this.y = y || 0;
    }
    var p = Vector2.prototype;

    p.Add = function (vector2) {
        this.x += vector2.x;
        this.y += vector2.y;

        return this;
    };

    p.Substract = function (vector2) {
        this.x -= vector2.x;
        this.y -= vector2.y;
        
        return this;
    };

    p.Multiply = function (vector2){
        this.x *= vector2.x;
        this.y *= vector2.y;

        return this;
    };

    p.Divide = function (vector2){
        this.x /= vector2.x;
        this.y /= vector2.y;

        return this;
    };

    p.Clone = function(){
        return new Vector2(this.x,this.y);
    };

    p.Invert = function(){
        this.x *= -1;
        this.y *= -1;

        return this;
    };

    p.SquareRoot = function(n){
        this.x *= n;
        this.y *= n;

        return this;
    };

    p.Exponentiation = function(n){
        this.x /= n;
        this.y /= n;

        return this;
    };

    p.Dot = function(vector2){
        return this.x * vector2.x + this.y * vector2.y;
    };

    p.Length = function(){
        return this.x * this.x + this.y * this.y;
    };

    p.Floor = function(){
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        
        return this;
    };

    p.Round = function(){
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    
        return this;
    };

    p.Abs = function(){
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        
        return this;
    };

    p.Magnitude = function(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    p.Distance = function(){
        return(new Vector2(this.x - this.x,this.y - this.y)).Magnitude();
    };

    p.Normalize = function(){
        var result = this.clone();
        var magnitude = this.magnitude();

        if(magnitude !== 0) result.SquareRoot(magnitude);
        
        return result;
    };

    return Vector2;
})();