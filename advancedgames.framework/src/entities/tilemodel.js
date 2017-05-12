/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.TileModel = (function () {

    /**
     * This class is used by a TileLayer to spawn the tiles according to the Tiled Map.
     * 
     * @class TileModel
     * @constructor
     * @extends Entity
     * @param {Integer} gid - Global Tile ID of the Tile. The gid is defined in a Tiled map. 
     * @param {Vector2} position - The position of the tile model.
     * @param {Vector2} tileposition - The tile position of the tile model.
     * @param {Vector2} dimensions - The dimensions of the tile model.
     * @param {Object} properties - The custom properties for a tile model.
     */
    function TileModel(gid, position, tileposition, dimensions, layer, properties) {
        ADCore.Entity.call(this, position);

        /**
         * @property {Integer} gid - The Global Tile ID.
         * @readonly 
         * @public
         */
        this._gid = gid;
        this.layer = layer;
        
        /**
         * @property {Vector2} dimensions - The dimensions of the tile model.
         * @public
         */
        this.dimensions = dimensions;

        /**
         * @property {Object} properties - The custom properties for a tile model.
         * @public
         * @default Empty
         */
        this.properties = properties = properties || {};

        /**
         * @property {Boolean} lower -  True if this tilemodel is a lower tile model. See ViewContainer for more information.
         * @public
         * @default false
         */
        this.lower = properties.lower || false;

        /**
         * @property {Vector2} position - The position of the entity.
         * @public
         */
        this.position = position.Clone();

        /**
         * @property {Vector2} tileposition - The tile position of the entity.
         * @public
         */
        this.tileposition = tileposition.Clone();

        /**
         * @property {Object} occupier - The occupier of a tile model.
         * @public
         * @default null
         */
        this.occupier = null;

        /**
         *  G value is used in the A* pathfinding Algorithm. Don't touch!
         *
         * @property {Integer} g
         * @public
         * @default 0
         * @ignore
         */
        this.g = 0;

        /**
         *  H value is used in the A* pathfinding Algorithm. Don't touch!
         *
         * @property {Integer} h
         * @public
         * @default 0
         * @ignore
         */
        this.h = 0;

        /**
         *  F value is used in the A* pathfinding Algorithm. Don't touch!
         *
         * @property {Integer} f
         * @public
         * @default 0
         * @ignore
         */
        this.f = 0;

        /**
         *  The closed boolean is used in the A* pathfinding Algorithm. Don't touch!
         *
         * @property {Boolean} closed
         * @public
         * @default false
         * @ignore
         */
        this.closed = false;

        /**
         *  The open boolean is used in the A* pathfinding Algorithm. Don't touch!
         *
         * @property {Boolean} open
         * @public
         * @default false
         * @ignore
         */
        this.open = false;

        /**
         *  The parent is used in the A* pathfinding Algorithm. Don't touch!
         *
         * @property {Object} parent
         * @public
         * @default null
         * @ignore
         */
        this.parent = null;

        /**
         * @property {Array} neighbours - The neighbours are the neighbour tile models of this model.
         * @public
         * @default Empty
         */
        this.neighbours = [];
    }
    TileModel.prototype = Object.create(ADCore.Entity.prototype);
    TileModel.prototype.constructor = TileModel;
    var p = TileModel.prototype;

    /**
     * Phaser InBounds calculates it via the sprites width / height. 
     * This method calculates the bounds by their tile position.
     * 
     * @method TileBounds
     * @memberof TileModel
     * @public
     * @param {Vector} vector - Vectort positions in tile positions.
     * @returns {Boolean} The result
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
     * Is the tile in the screen?
     * Phaser InBounds calculates it via the sprites width / height. 
     * This method calculates the bound by their normal position and the screen.
     * 
     * @method ScreenBounds
     * @memberof TileModel
     * @public
     * @param {Vector} vector - Vectort positions in tile positions.
     * @returns {Boolean} The result
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
     * Used in A* Pathfinding Algorithm. 
     * Resets the R, G, F, Closed, Open and Parent values.
     * Don't use this if you don't know what you are doing.
     * 
     * @method Reset
     * @memberof TileModel
     * @ignore
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
     * Dispose the TileModel. Use this method to clean the TileModel in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof TileModel
     * @public
     */
    p.__entity_dispose = p.Dispose;
    p.Dispose = function () {
        this.__entity_dispose();
    };

    /**
     * Getters & Setters internal function.
     * 
     * @method GettersAndSetters
     * @memberof TileModel
     * @private 
     * @ignore
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