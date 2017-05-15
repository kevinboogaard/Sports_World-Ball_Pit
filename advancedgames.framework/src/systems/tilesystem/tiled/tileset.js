/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

/**
 * @namespace
 * @name Tiled
 * @ignore
 */
ADCore.Tiled = ADCore.Tiled || {};

ADCore.Tiled.Tileset = ( function () {

    /**
     * A Tile set is a combination of an image containing the tiles and collision data per tile.
     * Tilesets are normally created automatically when Tiled data is loaded.
     * 
     * @class Tileset
     * @constructor
     * @private
     * @param {Object} data - Tileset data.
     */
    function Tileset(data) {
        /**
        * The Tiled firstgid value.
        * This is the starting index of the first tile index this Tileset contains.
        * @property {integer} firstgid
        * @public
        */
        this.firstgid = data.firstgid;

        /**
        * The key of the Tileset.
        * @property {string} key
        * @public
        */
        this.key = data.name;

        /**
        * The width of each tile (in pixels).
        * @property {integer} tilewidth
        * @public
        * @readonly
        */
        this.tilewidth = data.tilewidth | 0;
        
        /**
        * The height of each tile (in pixels).
        * @property {integer} tileheight
        * @public
        * @readonly
        */
        this.tileheight = data.tileheight | 0;

        /**
        * The width of the image (in pixels).
        * @property {integer} imagewidth
        * @public
        * @readonly
        */
        this.imagewidth = data.imagewidth || 0;

        /**
        * The height of the image (in pixels).
        * @property {integer} imageheight
        * @public
        * @readonly
        */
        this.imageheight = data.imageheight || 0;

        /**
        * Tileset-specific properties that are typically defined in the Tiled editor.
        * @property {object} properties
        * @public
        */
        this.properties = data.properties || {};

        /**
        * The margin around the tiles in the sheet (in pixels).
        * @property {integer} margin
        * @public
        * @readonly
        */
        this.margin = data.margin || 0;

        /**
        * The spacing between each tile in the sheet (in pixels).
        * @property {integer} spacing
        * @public
        * @readonly
        */
        this.spacing = data.spacing;

        /**
        * Tileset-specific tileproperties that are typically defined in the Tiled editor.
        * @property {object} tileproperties
        * @public
        */
        this.tileproperties = data.tileproperties;

        /**
        * Terrains of the tileset.
        * Not supported yet!
        * @property {array} terrains
        * @public
        */
        this.terrains = data.terrains || [];

        /**
        * Tiles of the tileset.
        * Not supported yet!
        * @property {object} tiles
        * @public
        */
        this.tiles = data.tiles || {}; 

        /**
         * True if the map is disposed.
        * @property {Boolean} disposed
        * @public
        */
        this.disposed = false;
    }
    var p = Tileset.prototype;

    /**
     * Dispose the tileset. Use this method to clean the tileset in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof Tileset
     * @public
     */
    p.Dispose = function () {
        delete this.firstgid;

        delete this.key;

        delete this.tilewidth;
        delete this.tileheight;
        delete this.imagewidth;
        delete this.imageheight;

        delete this.properties;

        delete this.margin;
        delete this.spacing;

        delete this.tileproperties;

        this.disposed = true;
    };

    return Tileset;
}() );