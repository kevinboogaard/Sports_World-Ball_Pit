var ADCore = ADCore || {};
ADCore.Tiled = ADCore.Tiled || {};

ADCore.Tiled.LayerTypes = ADCore.Tiled.LayerTypes || {};
ADCore.Tiled.LayerTypes.TILE = "tilelayer";
ADCore.Tiled.LayerTypes.OBJECT = "objectgroup";

ADCore.Tiled.ObjectLayer = ( function () {

    /**
     *  ObjectLayer
     *  @private
     */
    function ObjectLayer( parent, data ) {
        this.width = data.width;
        this.height = data.height;

        this.name = data.name;
        this.type = data.type;

        this.visible = data.visible;

        this.x = data.x;
        this.y = data.y;

        this.parent = parent;

        this.properties = data.properties || {};

        this.opacity = data.opacity;

        this.draworder = data.draworder;

        this.objectdata = data.objects;

        this.disposed = false;

        this._initialize();
    }
    var p = ObjectLayer.prototype;

    /**
     *  Initialize
     * @private
     */
    p._initialize = function () {
        var objects = [];
        var objects_len = this.objectdata.length;
        for ( var i = 0; i < objects_len; i++ ) {
            var data = this.objectdata[i];
            var object = new ADCore.Tiled.Object( this.objectdata[i], this.parent );

            if ( typeof data.gid !== "undefined") {
                var tileset = this.parent.GetTilesetByGid( data.gid );

                ADCore.EntityFactory.AddObjectView(object, tileset);
            }

            objects.push( object );
        }
        this.objectdata = objects;
    };

    /**
     *  GetObjectByName
     * @param {string} 'name'
     */
    p.GetObjectByName = function ( name ) {
        var len = this.objectdata.length;
        for ( var i = 0; i < len; i++ ) {
            var object = this.objectdata[i];

            if ( object.name === name ) return object;
        }
    };

    /**
     *  GetGroupByName
     * @param {string} 'name'
     */
    p.GetGroupByName = function ( name ) {
        var result = [];

        var len = this.objectdata.length;
        for ( var i = 0; i < len; i++ ) {
            var object = this.objectdata[i];

            if ( object.name === name ) result.push( object );
        }

        return result;
    };

    /**
     * dispose
     */
    p.dispose = function () {
        delete this.draworder;

        var len = this.objectdata.length;
        for ( var i = len - 1; i >= 0; i-- ) {
            var object = this.objectdata[i];
            object.dispose();

            this.objectdata.splice( i, 1 );
        }
        delete this.objectdata;

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

    return ObjectLayer;
}() );