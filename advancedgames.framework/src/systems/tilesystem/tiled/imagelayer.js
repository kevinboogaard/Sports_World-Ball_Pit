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

        this.x = data.offsetx;
        this.y = data.offsety;

        this.parent = parent;

        this.properties = data.properties || {};

        this.opacity = data.opacity;

        this.disposed = false;

        this._initialize();
    }
    var p = ImageLayer.prototype;

   /**
    * 'Initialize'
    * @private
    */
    p._initialize = function () {
        Debug.LogWarning("ImageLayer.Initialize not made yet!");
    };

    /**
     * dispose
     */
    p.dispose = function () {
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