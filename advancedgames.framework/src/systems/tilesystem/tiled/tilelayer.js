var ADCore = ADCore || {};
ADCore.Tiled = ADCore.Tiled || {};

ADCore.Tiled.LayerTypes = ADCore.Tiled.LayerTypes || {};
ADCore.Tiled.LayerTypes.TILE = "tilelayer";

ADCore.Tiled.TileLayer = ( function () {

    /**
     *  TileLayer
     *  @private
     */
    function TileLayer(parent, data) {
        this.width = data.width;
        this.height = data.height;

        this.name = data.name;
        this.type = data.type;

        this.visible = data.visible;

        this.x = data.offsetx;
        this.y = data.offsety;

        this.parent = parent;

        this.properties = data.properties;

        this.opacity = data.opacity;

        this.tiledata = data.data;

        this.disposed = false;

        this._initialize();
    }
    var p = TileLayer.prototype;

    /**
     *  Initialize
     *  @private
     */
    p._initialize = function () {
        var tile_position = new Vector2();

        var row = [];
        var columns = [];

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
            
            row.push( tile );
 
            tile_position.x++;
            if ( tile_position.x === this.width ) {
                columns.push( row );
                tile_position.x = 0;
                tile_position.y++;
                row = [];
            }
        }
        this.tiledata = columns;
    };

    /**
     *  GetTileByTilePosition
     * @param {Vector2} tileposition;
     */
    p.GetTileByTilePosition = function ( tileposition ) {
        var columns = this.tiledata;
        var columns_len = columns.length;
        for ( var i = 0; i < columns_len; i++ ) {
            var rows = columns[i];
            var rows_len = rows.length;

            for ( var j = 0; j < rows_len; j++ ) {
                var tile = rows[j];
                if ( !tile ) continue;

                var inBounds = tile.TileBounds( tileposition );
                if ( inBounds ) return tile;
            }
        }

        return null;
    };

    /**
     *  GetTileByScreenPosition
     * @param {Vector2} position;
     */
    p.GetTileByScreenPosition = function ( position ) {
        var columns = this.tiledata;
        var columns_len = columns.length;
        for ( var i = 0; i < columns_len; i++ ) {
            var rows = columns[i];
            var rows_len = rows.length;

            for ( var j = 0; j < rows_len; j++ ) {
                var tile = rows[j];
                if ( !tile ) continue;

                var inBounds = tile.ScreenBounds( position );
                if ( inBounds ) return tile;
            }
        }

        return null;
    };

    /**
     *  GetTilesByProperty
     * @param {string} 'propertyname'
     * @param {string} 'value'
     */
    p.GetTilesByProperty = function ( propertyname, value ) {
        var result = [];

        var columns = this.tiledata;
        var columns_len = columns.length;
        for ( var i = 0; i < columns_len; i++ ) {
            var rows = columns[i];
            var rows_len = rows.length;

            for ( var j = 0; j < rows_len; j++ ) {
                var tile = rows[j];
                if ( !tile) continue;

                if ( tile.properties[propertyname] && tile.properties[propertyname] === value ) {
                    result.push( tile );
                }
            }
        }

        return result;
    };

    /**
     * 'TilePoisitionToPosition'
     * @param {Vector2} vector
     */
    p.TilePositionToPosition = function ( vector ) {
        var translatedPosition = new Vector2( vector.x * this.parent.tilewidth, vector.y * this.parent.tileheight );
        translatedPosition.Add(new Vector2(this.x, this.y));
        return translatedPosition;
    };

    /**
     * 'Finalize'
     */
    p.Finalize = function () {
        var columns = this.tiledata;
        var columns_len = columns.length;
        for ( var i = 0; i < columns_len; i++ ) {
            var rows = columns[i];
            var rows_len = rows.length;

            for ( var j = 0; j < rows_len; j++ ) {
                var tile = rows[j];
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
     * 'FindTileNeighbours'
     * @private
     */
     p._findTileNeighbours = function (tile) {
        var neighbours = [];

        for ( var x = -1; x <= 1; x++ ) {
            var position = new Vector2( tile.tileposition.x + x, tile.tileposition.y );
            var neighbour = this.GetTileByTilePosition( position );

             if ( neighbour ) {
                 neighbours.push( neighbour );
             }
        }

        for ( var y = -1; y <= 1; y++ ) {
            var position = new Vector2( tile.tileposition.x, tile.tileposition.y + y );
            var neighbour = this.GetTileByTilePosition( position );

            if ( neighbour ) {
                neighbours.push( neighbour );
            }
        }

        return neighbours;
    };

    /**
     * 'Dispose'
     */
    p.dispose = function () {
        var columns = this.tiledata;
        var columns_len = columns.length;
        for ( var i = columns_len - 1; i >= 0; i-- ) {
            var rows = columns[i];
            var rows_len = rows.length;

            for ( var j = rows_len - 1; j >= 0; j-- ) {
                var tile = rows[j];
                if ( !tile ) continue;

                Listener.Dispatch( ADCore.Event.ON_MODEL_REMOVE, this, { 'model': tile } );
                tile.dispose();

                rows.splice( j, 1 );
            }

            columns.splice( i, 1 );
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