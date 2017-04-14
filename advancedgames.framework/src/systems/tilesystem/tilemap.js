var ADCore = ADCore || {};
ADCore.Tiled = ADCore.Tiled || {};

ADCore.Tiled.Orientation = ADCore.Tiled.Orientation || {};
ADCore.Tiled.Orientation.ORTHOGONAL = "orthogonal";
//ADCore.Tiled.Orientation.ISOMETRIC = "isometric"; // Not supported yet.
//ADCore.Tiled.Orientation.STAGGERED = "staggered"; // Not supported yet.

this.Tilemap = ( function () {

    /**
     * 'Tilemap'
     */
    function Tilemap( data ) {
        if ( typeof data === "undefined" ) throw new Error( "Loaded map doesn't exist" );

        this.width = data.width;
        this.height = data.height;

        this.tilewidth = data.tilewidth;
        this.tileheight = data.tileheight;

        this.worldWidth = this.width * this.tilewidth;
        this.worldHeight = this.height * this.tileheight;

        this.orientation = ADCore.Tiled.Orientation.ORTHOGONAL;

        this.mainLayer = null;
        this.layers = data.layers;
        this.tilesets = data.tilesets;

        this.backgroundColor = data.backgroundColor;
        this.renderorder = data.renderorder;

        this.properties = data.properties;

        this.nextobjectid = data.nextobjectid;
            
        this.disposed = false;

        this._initialize();
    }
    var p = Tilemap.prototype;

    /**'
     * 'Initialize'
     */
    p._initialize = function () {
        if (typeof this.tilesets !== "undefined") {
            var tilesets = [];
            var tilesets_len = this.tilesets.length;
            for ( var tilesets_i = 0; tilesets_i < tilesets_len; tilesets_i++ ) {
                var current_tileset = new ADCore.Tiled.Tileset( this.tilesets[tilesets_i] );
                tilesets.push( current_tileset );
            }
            this.tilesets = tilesets;
        }

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
            this.layers = layers;
        }

        this._finalize();
    };

    /**
     * 'GetLayerByName'
     * @param {string} 'name'
     */
    p.GetLayerByName = function ( name ) {
        var len = this.layers.length;
        for ( var i = 0; i < len; i++ ) {
            var current = this.layers[i];
            if ( current.name === name ) return current;
        }
        return null;
    };

    /**
     * 'GetTilesetByName'
     * @param {string} 'name'
     */
    p.GetTilesetByName = function ( name ) {
        var len = this.tilesets.length;
        for ( var i = 0; i < len; i++ ) {
            var current = this.tilesets[i];
            if ( current.name === name ) return current;
        }
        return null;
    };

    /**
     * 'GetTilesetByGid'
     * @param {int} 'gid'
     */
    p.GetTilesetByGid = function ( gid ) {
        var len = this.tilesets.length;
        for ( var i = len - 1; i >= 0; i-- ) {
            var tileset = this.tilesets[i];

            if ( gid >= tileset.firstgid ) return tileset;
        }

        return false;
    };

    /**
     * 'Finalize'
     */
    p._finalize = function () {
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
     * 'Dispose'
     */
    p.dispose = function () {
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
                l_current.dispose();
                this.layers.splice( i, 1 );
            }
        }
        delete this.layers;
        
        if (typeof this.tilesets !== "undefined") {
            var tilesets_len = this.tilesets.length;
            for ( var j = tilesets_len - 1; j >= 0; j-- ) {
                var t_current = this.tilesets[i];
                t_current.dispose();
                this.tilesets.splice( j, 1 );
            }
        }
        delete this.tilesets;
    
        this.disposed = true;
    };

    return Tilemap;
})();