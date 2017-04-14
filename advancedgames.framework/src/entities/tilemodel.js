var ADCore = ADCore || {};

ADCore.TileModel = (function () {

    /**
     * TileModel class.
     * @used only by tilemap.js
     * @param {Int} gid (Global Tile ID) 
     * @param {Vector3} position
     * @param {Vector3} tileposition
     */
    function TileModel(gid, position, tileposition, dimensions, properties) {
        this._gid = gid;
        ADCore.Entity.call(this, position);
        
        this.dimensions = dimensions;
        this.properties = properties = properties || {};
        this.lower = properties.lower || false;

        this.position = position.Clone();
        this.tileposition = tileposition.Clone();

        Debug.DrawRect(new Vector2(this.position.x, this.position.y), new Vector2(this.dimensions.x, this.dimensions.y), "#00FF00", true);

        // If the gid is actually something, use itself as occupier so the ball can't get on it.
        this.occupier = ( gid === 0 ) ? null : this;

        // G, H, F values are used in the A* pathfinding Algorithm. Don't touch!
        this.g = 0;
        this.h = 0;
        this.f = 0;

        // Closed and Open booleans are used in the A* pathfinding Algorithm. Don't touch!
        this.closed = false;
        this.open = false;

        // Parent and Neighbours are used in the A* pathfinding Algorithm. Don't touch!
        this.parent = null;
        this.neighbours = [];
    }
    TileModel.prototype = Object.create(ADCore.Entity.prototype);
    TileModel.prototype.constructor = TileModel;
    var p = TileModel.prototype;

    /**
     * TileBounds
     * @param {Vector} 'vector'
     * @returns boolean
     *
     * Phaser InBounds calculates it via the sprites width / height. 
     */
    p.TileBounds = function (vector) {
        if (vector.x > this.tileposition.x - 0.5 && vector.x < this.tileposition.x + 0.5) {
            if (vector.y > this.tileposition.y - 0.5 && vector.y < this.tileposition.y + 0.5) {
                return true;
            }
        }
        return false;
    };

    /**
     * ScreenBounds
     * @param {Vector} 'vector'
     * @returns boolean
     *
     * Phaser InBounds calculates it via the sprites width / height. 
     */
    p.ScreenBounds = function (vector) {
        if (vector.x > this.position.x - this.dimensions.x && vector.x < this.position.x + this.dimensions.x) {
            if (vector.y > this.position.y - this.dimensions.y && vector.y < this.position.y + this.dimensions.y) {
                return true;
            }
        }
        return false;
    };


    /**
     * Reset
     * Used in A* Pathfinding Algorithm. 
     * Resets the R, G, F, Closed, Open and Parent values.
     * Don't use this if you don't know what you are doing.
     */
    p.Reset = function () {
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.closed = false;
        this.open = false;  
        this.parent = null;
    };

    /**
     * 'Dispose'
     */
    p.__entity_dispose = p.dispose;
    p.dispose = function () {
        this.__entity_dispose();
    };

    /**
     * 'GettersAndSetters'
     */
    p.__entity_gettersAndSetters = p.gettersAndSetters;
    p.gettersAndSetters = function () {
        this.Get( "gid", function () {
            return this._gid;
        } );

        this.__entity_gettersAndSetters();
    };

    return TileModel;
}());