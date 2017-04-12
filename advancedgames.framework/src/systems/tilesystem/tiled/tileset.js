var ADCore = ADCore || {};
ADCore.Tiled = ADCore.Tiled || {};

ADCore.Tiled.Tileset = ( function () {

    /**
     *  Tileset
     *  @private
     */
    function Tileset(data) {
        this.firstgid = data.firstgid;

        this.key = data.name;

        this.tilewidth = data.tilewidth;
        this.tileheight = data.tileheight;
        this.imagewidth = data.imagewidth;
        this.imageheight = data.imageheight;

        this.properties = data.properties;

        this.margin = data.margin;
        this.spacing = data.spacing;

        this.tileproperties = data.tileproperties;

        //this.terrains = data.terrains || []; */ // Not supported yet.
        //this.tiles = data.tiles || {}; */ // Not supported yet.

        this.disposed = false;
    }
    var p = Tileset.prototype;

    /**
     * 'Dispose'
     */
    p.dispose = function () {
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