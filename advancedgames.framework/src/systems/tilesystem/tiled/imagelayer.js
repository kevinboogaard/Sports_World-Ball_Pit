var ADCore = ADCore || {};
ADCore.Tiled = ADCore.Tiled || {};

ADCore.Tiled.LayerTypes = ADCore.Tiled.LayerTypes || {};
ADCore.Tiled.LayerTypes.IMAGE = "imagelayer";

ADCore.Tiled.ImageLayer = ( function () {

    /**
     *  ImageLayer
     *  @private
     */
    function ImageLayer( parent, data ) {
        this.width = data.width;
        this.height = data.height;

        this.name = data.name;
        this.type = data.type;

        this.visible = data.visible;

        this.x = data.offsetx || 0;
        this.y = data.offsety || 0;

        this.parent = parent;

        this.properties = data.properties || {};

        this.opacity = data.opacity;

        this.disposed = false;

        ADCore.EntityFactory.AddImageLayer(this, this.name);
    }
    var p = ImageLayer.prototype;

    /**
     * dispose
     */
    p.Dispose = function () {
        delete this.width;
        delete this.height;

        delete this.name;
        delete  this.type;

        delete this.visible;

        delete this.x;
        delete this.y;

        delete  this.parent;

        delete this.properties;

        delete this.opacity;
        
        this.disposed = true;
    };

    return ImageLayer;
}() );