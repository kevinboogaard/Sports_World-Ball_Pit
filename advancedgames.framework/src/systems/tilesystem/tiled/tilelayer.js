/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};
ADCore.Tiled = ADCore.Tiled || {};

ADCore.Tiled.TileLayer = ( function () {

    /**
     * A TileLayer is a holder for the tiles of a specific TileLayer of a Tilemap.
    *
     * @class TileLayer
     * @constructor
     * @memberof Tiled
     * @private
     * @param {Tilemap} parent - Parent of the TileLayer.
     * @param {Object} data - TileLayer data.
     */
    function TileLayer(parent, data) {
        /**
        * @property {number} width - The width of the map (in tiles).
        * @public
        */
        this.width = data.width || 0;

        /**
        * @property {number} height - The height of the map (in tiles).
        * @public
        */
        this.height = data.height || 0;

        /**
        * @property {string} name - The name of the TileLayer.
        * @public
        */
        this.name = data.name;

        /**
        * @property {LayerTypes} type - The LayerType of this layer.
        * @public
        * @readonly
        */
        this.type = data.type;

        /**
         * @property {Boolean} visible - True if the layer is visible.
        * @public
         */
        this.visible = data.visible;

        /**
         * @property {integer} x - The x position of the TileLayer.
        * @public
         */
        this.x = data.offsetx;

        /**
         * @property {integer} y - The y position of the TileLayer.
        * @public
         */
        this.y = data.offsety;

        /**
         * @property {Tilemap} parent - The parent tilemap of this TileLayer.
        * @public
         */
        this.parent = parent;

        /**
        * @property {object} properties - TileLayer-specific properties that are typically defined in the Tiled editor.
        * @public
        */
        this.properties = data.properties || {};

        /**
         * @property {integer} opacity - The opacity of the TileLayer.
        * @public
         */
        this.opacity = data.opacity;

        /**
         * @property {Array} tiledata - Array of TileModels that the TileLayer is holding.
        * @public
         */
        this.tiledata = data.data;

        /**
        * @property {Boolean} disposed - True if the TileLayer  is disposed.
        * @public
        */
        this.disposed = false;

        // Initialize the TileLayer when the constructor has been called.
        this._initialize();
    }
    var p = TileLayer.prototype;

    /**
     * @method Initialize
     * @private 
     * @ignore 
     */
    p._initialize = function () {
        var tile_position = new Vector2();

        var column = [];
        var rows = [];

        var tiledata_len = this.tiledata.length;
        for ( var tiledata_i = 0; tiledata_i < tiledata_len; tiledata_i++ ) {
            var gid = this.tiledata[tiledata_i];
            var tile = null;

            var position = this.TilePositionToPosition(tile_position);
            var dimensions = new Vector2(this.parent.tilewidth, this.parent.tileheight);

            if (gid !== 0) {
                var tileset = this.parent.GetTilesetByGid( gid );
                tile = ADCore.EntityFactory.AddTile( position, tile_position, tileset.key, gid, dimensions, tileset.properties  );
            } else {
                tile = ADCore.EntityFactory.AddTile( position, tile_position, null, gid, dimensions, null );
            }
            
            column.push( tile );
 
            tile_position.x++;
            if ( tile_position.x === this.width ) {
                rows.push( column );
                tile_position.x = 0;
                tile_position.y++;
                column = [];
            }
        }
        this.tiledata = rows;
    };

    /**
     * Get a tile by its position on the grid.
     *
     * @method GetTileByTilePosition
     * @memberof TileLayer
     * @public
     * @param {Vector2} tileposition - Position of the tile on the grid. 
     * (0,0) represents the tile top-left. 
     * (1,0) represents the tile on the right of the tile on (0,0)
     * (0,1) represents the tile under the tile on (0,0)
     * @returns {TileModel} The tile that corresponds to its position. Null if it hasn't been found.
     */
    p.GetTileByTilePosition = function ( tileposition ) {
        var rows = this.tiledata;
        var rows_len = rows.length;
        for ( var i = 0; i < rows_len; i++ ) {
            var columns = rows[i];
            var columns_len = columns.length;

            for ( var j = 0; j < columns_len; j++ ) {
                var tile = columns[j];
                if ( !tile ) continue;

                var inBounds = tile.TileBounds( tileposition );
                if ( inBounds ) return tile;
            }
        }
        // Return null if the tile hasn't been found.
        return null;
    };

    /**
     * Get a tile by its position on the screen.
     *
     * @method GetTileByScreenPosition
     * @memberof TileLayer
     * @public
     * @param {Vector2} position - Position of the tile on the screen. 
     * @returns {TileModel} The tile that corresponds to its position. Null if it hasn't been found.
     */
    p.GetTileByScreenPosition = function ( position ) {
        var rows = this.tiledata;
        var rows_len = rows.length;
        for ( var i = 0; i < rows_len; i++ ) {
            var columns = rows[i];
            var columns_len = columns.length;

            for ( var j = 0; j < columns_len; j++ ) {
                var tile = columns[j];
                if ( !tile ) continue;

                var inBounds = tile.ScreenBounds( position );
                if ( inBounds ) return tile;
            }
        }
        // Return null if the tile hasn't been found.
        return null;
    };

    /**
     * Get a tile by its property.
     *
     * @method GetTilesByProperty
     * @memberof TileLayer
     * @public
     * @param {string} propertyname - Name of the property to look for. 
     * @param {string} value - Value of the property to look for.
     * @returns {TileModel} The tile that corresponds to its property. Null if it hasn't been found.
     */
    p.GetTilesByProperty = function ( propertyname, value ) {
        var result = [];

        var rows = this.tiledata;
        var rows_len = rows.length;
        for ( var i = 0; i < rows_len; i++ ) {
            var columns = rows[i];
            var columns_len = columns.length;

            for ( var j = 0; j < columns_len; j++ ) {
                var tile = columns[j];
                if ( !tile) continue;

                if ( tile.properties[propertyname] && tile.properties[propertyname] === value ) {
                    result.push( tile );
                }
            }
        }
        // Return null if the tile hasn't been found.
        return result;
    };

    /**
     * Translate the tileposition to position.
     *
     * @method TilePositionToPosition
     * @memberof TileLayer
     * @public
     * @param {Vector2} vector - The tileposition to be translated.
     * @returns {Vector2} The translated position.
     */
    p.TilePositionToPosition = function ( vector ) {
        var translatedPosition = new Vector2( vector.x * this.parent.tilewidth, vector.y * this.parent.tileheight );
        translatedPosition.Add(new Vector2(this.x, this.y));
        return translatedPosition;
    };
  
    /**
     * Get the neighbour from a tile by a direction.
     *
     * @method GetNeighbourFromTileByDirection
     * @memberof TileLayer
     * @public
     * @param {TileModel} tile - The tile to look in.
     * @param {Vector2} direction - The direction to look for.
     * @returns {TileModel} The neighbour that has been found. Null if it hasn't been found.
     */
    p.GetNeighbourFromTileByDirection = function ( tile, direction ) {
        var neighbours = tile.neighbours;
        var len = neighbours.length;
        for ( var i = 0; i < len; i++) {
            var neighbour = neighbours[i];
            
            if (neighbour.tileposition.x === (tile.tileposition.x + direction.x) && neighbour.tileposition.y === (tile.tileposition.y + direction.y) ) {
                return neighbour;
            }
        }
        // Return null if the neighbour hasn't been found.
        return null;
    };

    /**
     * Get a tile by its occupier.
     *
     * @method GetTileByOccupier
     * @memberof TileLayer
     * @public
     * @param {T} occupier - Occupier to look for.
     * @returns {TileModel} The tile that has been found. Null if it hasn't been found.
     */
    p.GetTileByOccupier = function (occupier) {
        var rows = this.tiledata;
        var rows_len = rows.length;
        for ( var i = 0; i < rows_len; i++ ) {
            var columns = rows[i];
            var columns_len = columns.length;

            for ( var j = 0; j < columns_len; j++ ) {
                var tile = columns[j];
                if ( !tile) continue;

                if (tile.occupier === occupier) return tile;
            }
        }
        // Return null if the tileset hasn't been found.
        return null;
    };

    /**
     * Finalizes the tilelayer. This function loops through all its tiles and looks for their neighbours. 
     *
     * @method Finalize
     * @public
     */
    p.Finalize = function () {
        var rows = this.tiledata;
        var rows_len = rows.length;
        for ( var i = 0; i < rows_len; i++ ) {
            var columns = rows[i];
            var columns_len = columns.length;

            for ( var j = 0; j < columns_len; j++ ) {
                var tile = columns[j];
                if ( !tile ) continue;

                if ( this.properties && this.properties.occupies ) {
                    var occupied_tile = this.parent.mainLayer.GetTileByPosition( tile.position );
                    occupied_tile.occupier = tile;
                }
                
                var neighbours = this._findTileNeighbours(tile);

                tile.neighbours = neighbours;
            }
        }
    };

    /**
     * Translate the given tile position to screen position.
     *
     * @method TilePositionToScreenPosition
     * @memberof TileLayer
     * @public
     * @param {Vector2} tileposition - The tileposition to be translated..
     * @returns {Vector2} The screen position result.
     */
    p.TilePositionToScreenPosition = function (tileposition) {
        var first = this.tiledata[0][0].position;
        var translated = tileposition.Clone().Multiply(new Vector2(this.parent.tilewidth, this.parent.tileheight));
        return translated.Add(first);
    };

    /**
     * Translate the given tile position to screen position.
     *
     * @method FindTileNeighbours
     * @memberof TileLayer
     * @private
     * @param {TileModel} tile - The tile to look for the neighbours.
     * @returns {Array} The neighbours of a tile.
     */
     p._findTileNeighbours = function (tile) {
        var neighbours = [];

        for ( var x = -1; x <= 1; x++ ) {
            var position = new Vector2( tile.tileposition.x + x, tile.tileposition.y );
            var neighbour = this.GetTileByTilePosition( position );

             if ( neighbour && neighbour !== tile ) {
                 neighbours.push( neighbour );
             }
        }

        for ( var y = -1; y <= 1; y++ ) {
            var position = new Vector2( tile.tileposition.x, tile.tileposition.y + y );
            var neighbour = this.GetTileByTilePosition( position );

            if ( neighbour && neighbour !== tile ) {
                neighbours.push( neighbour );
            }
        }

        return neighbours;
    };

    /**
     * Dispose the tilelayer. Use this method to clean the tilelayer in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof TileLayer
     * @public
     * @fires #ON_MODEL_REMOVE
     */
    p.Dispose = function () {
        var rows = this.tiledata;
        var rows_len = rows.length;
        for ( var i = 0; i < rows_len; i++ ) {
            var columns = rows[i];
            var columns_len = columns.length;

            for ( var j = 0; j < columns_len; j++ ) {
                var tile = columns[j];
                if ( !tile ) continue;

                Listener.Dispatch( ADCore.Event.ON_MODEL_REMOVE, this, { 'model': tile } );
                tile.dispose();

                columns.splice( j, 1 );
            }

            rows.splice( i, 1 );
        }
        delete this.tiledata;

        delete this.width;
        delete this.height;

        delete this.name;
        delete this.type;

        delete this.visible;

        delete this.x;
        delete this.y;

        delete this.parent;

        delete this.properties;

        delete this.opacity;

        this.disposed = true;
    };

    return TileLayer;
})();