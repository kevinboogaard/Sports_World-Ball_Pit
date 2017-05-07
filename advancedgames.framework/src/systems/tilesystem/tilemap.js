/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

/**
 * @namespace Tiled
 * @memberof ADCore
 * @static
 */
ADCore.Tiled = ADCore.Tiled || {};

/**
 * Enum for map orientations.
 * @readonly
 * @enum {String}
 * @typedef {(String)} Orientation
 */
ADCore.Tiled.Orientation = {
    /** @member {String} */
    /** Orthogonal orientation of the map */
    ORTHOGONAL = "orthogonal",
    
    /** @member {String} */
    /** Isometric orientation of the map */
    ISOMETRIC = "isometric",

    /** @member {String} */
    /** Staggered orientation of the map */
    STAGGERED = "staggered"
};

this.Tilemap = ( function () {

    /**
     * Creates a new Tilemap object. The map can either be populated with data from a Tiled JSON file or from a CSV file.
     * To do this preload the file into an object an pass it as the first parameter. 
     * This class will load the rest of the map.
     * 
     * @class Tilemap
     * @constructor
     * @param {Object} data - Tiled generated data.
     */
    function Tilemap( data ) {
        if ( typeof data === "undefined" ) throw new Error( "Loaded map doesn't exist" );

        /**
        * @property {number} width - The width of the map (in tiles).
        * @public
        */
        this.width = data.width;

        /**
        * @property {number} height - The height of the map (in tiles).
        * @public
        */
        this.height = data.height;

        /**
        * @property {number} tilewidth - The base width of the tiles in the map (in pixels).
        * @public
        */
        this.tilewidth = data.tilewidth;
        
        /**
        * @property {number} tileheight - The base height of the tiles in the map (in pixels).
        * @public
        */
        this.tileheight = data.tileheight;

        /**
        * @property {number} worldWidth - The base width of the world (in pixels).
        * @public
        */
        this.worldWidth = this.width * this.tilewidth;

        /**
        * @property {number} worldHeight - The base height of the world (in pixels).
        * @public
        */
        this.worldHeight = this.height * this.tileheight;

        /**
        * @property {Orientation} orientation - The orientation of the map data (as specified in Tiled), usually 'orthogonal'.
        * @default Orientation.ORTHOGONAL - Currently forced to set on 'orthogonal' since the other types are not supported yet! 
        * @public
        */
        this.orientation = ADCore.Tiled.Orientation.ORTHOGONAL;

        /**
         * @property {TileLayer} mainLayer - The main layer of the tilemap. Set in Tiled by custom property: main (boolean).
         * @public
         */
        this.mainLayer = null;
        
        /**
        * @property {array} layers - An array of Tilemap layer data.
        * @public
        */
        this.layers = data.layers;
        
        /**
        * @property {array} tilesets - An array of Tilesets.
        * @public
        */
        this.tilesets = data.tilesets;

        /**
        * @property {Number} backgroundColor - The background color of the map.
        * @public
        */
        this.backgroundColor = data.backgroundColor;

        /**
        * @property {string} renderorder - The render order of the map.
        * @public
        */
        this.renderorder = data.renderorder;

        /**
        * @property {object} properties - Tileset-specific properties that are typically defined in the Tiled editor.
        * @public
        */
        this.properties = data.properties;

        /**
        * @property {Number} nextobjectid - The next object id of the map.
        * @public
        */
        this.nextobjectid = data.nextobjectid;
            
        /**
        * @property {Boolean} disposed - Is the map disposed
        * @public
        */
        this.disposed = false;

        // Initialize the map when the constructor has been called.
        this._initialize();
    }
    var p = Tilemap.prototype;

    /**
     * @method Initialize
     * @private 
     * @ignore 
     */
    p._initialize = function () {   
        // If the tilesets are defined, create the tilesets.
        if (typeof this.tilesets !== "undefined") {
            var tilesets = [];
            var tilesets_len = this.tilesets.length;
            for ( var tilesets_i = 0; tilesets_i < tilesets_len; tilesets_i++ ) {
                var current_tileset = new ADCore.Tiled.Tileset( this.tilesets[tilesets_i] );
                tilesets.push( current_tileset );
            }
            // Replace the data with the actual tilesets.
            this.tilesets = tilesets;
        }

        // If the layers are defined, create the layers.
        if (typeof this.layers !== "undefined") {
            var layers = [];
            var layers_len = this.layers.length;
            for ( var layers_i = 0; layers_i < layers_len; layers_i++ ) {
                var layerdata = this.layers[layers_i];
                var layer = null;

                if ( layerdata.visible === false ) continue;

                if ( layerdata.type === ADCore.Tiled.LayerTypes.TILE ) {
                    layer = new ADCore.Tiled.TileLayer( this, layerdata );
                    if ( layer.properties && layer.properties.main ) this.mainLayer = layer;
                } else if ( layerdata.type === ADCore.Tiled.LayerTypes.OBJECT ) {
                    layer = new ADCore.Tiled.ObjectLayer( this, layerdata );
                } else if ( layerdata.type === ADCore.Tiled.LayerTypes.IMAGE ) {
                    layer = new ADCore.Tiled.ImageLayer( this, layerdata );
                }

                layers.push( layer );
            }
            // Replace the data with the actual layers.
            this.layers = layers;
        }

        // Finalize when everything has been made.
        this._finalize();
    };

    /**
     * Get a layer by name.
     *
     * @method GetLayerByName
     * @memberof Tilemap
     * @public
     * @param {String} name - Name of the layer.
     * @returns {TileLayer} The layer that corresponds to its name. Null if it hasn't been found.
     */
    p.GetLayerByName = function ( name ) {
        var len = this.layers.length;
        for ( var i = 0; i < len; i++ ) {
            var current = this.layers[i];
            if ( current.name === name ) return current;
        }
        // Return null if the layer hasn't been found.
        return null;
    };

    /**
     * Get a tileset by name.
     *
     * @method GetTilesetByName
     * @memberof Tilemap
     * @public
     * @param {String} name - Name of the tileset.
     * @returns {Tileset} The tileset that corresponds to its name. Null if it hasn't been found.
     */
    p.GetTilesetByName = function ( name ) {
        var len = this.tilesets.length;
        for ( var i = 0; i < len; i++ ) {
            var current = this.tilesets[i];
            if ( current.name === name ) return current;
        }
        // Return null if the tileset hasn't been found.
        return null;
    };

    /**
     * Get a tileset by a gid.
     *
     * @method GetTilesetByGid
     * @memberof Tilemap
     * @public
     * @param {int} gid - Gid of the tileset.
     * @returns {Tileset} The tileset that corresponds to its gid. Null if it hasn't been found.
     */
    p.GetTilesetByGid = function ( gid ) {
        var len = this.tilesets.length;
        for ( var i = len - 1; i >= 0; i-- ) {
            var tileset = this.tilesets[i];

            if ( gid >= tileset.firstgid ) return tileset;
        }
        // Return null if the tileset hasn't been found.
        return null;
    };

    /**
     * @method Finalize
     * @private 
     * @ignore 
     */
    p._finalize = function () {
        // If the layers are defined, finalize the rest of the layers aswell.
        if (typeof this.layers !== "undefined") {
            var layers_len = this.layers.length;
            for ( var i = 0; i < layers_len; i++ ) {
                var layer = this.layers[i];
                if (layer.Finalize) {
                    layer.Finalize();
                }
            }
        }
    };

    /**
     * Dispose the tilemap. Use this method to clean the tilemap in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof Tilemap
     * @public
     */
    p.Dispose = function () {
        delete this.width;
        delete this.height;
                            
        delete this.tilewidth;
        delete this.tileheight;

        delete this.orientation;

        delete this.backgroundColor;
        delete this.renderorder;

        delete this.properties;

        delete this.nextobjectid;

        if (typeof this.layers !== "undefined") {
            var layers_len = this.layers.length;
            for ( var i = layers_len - 1; i >= 0; i-- ) {
                var l_current = this.layers[i];
                l_current.Dispose();
                this.layers.splice( i, 1 );
            }
        }
        delete this.layers;
        
        if (typeof this.tilesets !== "undefined") {
            var tilesets_len = this.tilesets.length;
            for ( var j = tilesets_len - 1; j >= 0; j-- ) {
                var t_current = this.tilesets[i];
                t_current.Dispose();
                this.tilesets.splice( j, 1 );
            }
        }
        delete this.tilesets;
    
        this.disposed = true;
    };

    return Tilemap;
})();