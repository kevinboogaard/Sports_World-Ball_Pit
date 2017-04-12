var ADCore = ADCore || {};
ADCore.Tiled = ADCore.Tiled || {};

ADCore.Tiled.LayerTypes = ADCore.Tiled.LayerTypes || {};
ADCore.Tiled.LayerTypes.TILE = "tilelayer";
ADCore.Tiled.LayerTypes.OBJECT = "objectgroup";

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

        this.x = data.x;
        this.y = data.y;

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
        var spawn_position = new Vector2();

        var row = [];
        var columns = [];

        var tiledata_len = this.tiledata.length;
        for ( var tiledata_i = 0; tiledata_i < tiledata_len; tiledata_i++ ) {
            var gid = this.tiledata[tiledata_i];

            if ( gid !== 0 ) {
                throw new Error("Need an EntityFactory for special tiles!");

                //var tileset = this.parent.GetTilesetByGid( gid );
                //var tile = ADCore.EntityFactory.AddTile( spawn_position, tileset.key, gid, tileset.properties );

                //row.push( tile );
            } else {
                row.push( null );
            }
 
            spawn_position.x++;
            if ( spawn_position.x === this.width ) {
                columns.push( row );
                spawn_position.x = 0;
                spawn_position.y++;
                row = [];
            }
        }
        this.tiledata = columns;
    };

    /**
     *  GetTileByPosition
     * @param {Vector2} position;
     */
    p.GetTileByPosition = function ( position ) {
        var columns = this.tiledata;
        var columns_len = columns.length;
        for ( var i = 0; i < columns_len; i++ ) {
            var rows = columns[i];
            var rows_len = rows.length;

            for ( var j = 0; j < rows_len; j++ ) {
                var tile = rows[j];
                if ( !tile ) continue;

                var inBounds = tile.InBounds( position );
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
     *  Finalize
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
                
                var neighbours = this.__findTileNeighbours(tile)

                tile.neighbours = neighbours;
            }
        }
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