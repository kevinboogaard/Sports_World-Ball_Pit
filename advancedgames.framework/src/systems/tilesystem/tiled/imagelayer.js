/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */

/**
 * @namespace Tiled
 * @memberof ADCore
 * @static
 */
var ADCore = ADCore || {};
ADCore.Tiled = ADCore.Tiled || {};

/**
 * Enum for Layer Types
 * @readonly
 * @memberof Tiled
 * @enum {String}
 * @typedef {(String)} LayerTypes
 */
ADCore.Tiled.LayerTypes = ADCore.Tiled.LayerTypes || {};

/**
 * @member {String}
 * @memberof LayerTypes
 * ImageLayer type
 */
ADCore.Tiled.LayerTypes.IMAGE = "imagelayer";

ADCore.Tiled.ImageLayer = ( function () {

    /**
     * An ImageLayer is the data holder of an image of a Tilemap.
    *
     * @class ImageLayer
     * @constructor
     * @memberof Tiled
     * @private
     * @param {Tilemap} parent - Parent of the ImageLayer.
     * @param {Object} data - ImageLayer data.
     */
    function ImageLayer( parent, data ) {
        /**
        * @property {number} width - The width of the map (in tiles).
        */
        this.width = data.width || 0;

        /**
        * @property {number} height - The height of the map (in tiles).
        */
        this.height = data.height || 0;

        /**
        * @property {string} name - The name of the ImageLayer.
        */
        this.name = data.name;

        /**
        * @property {LayerTypes} type - The LayerType of this layer.
        * @readonly
        */
        this.type = data.type;

        /**
         * @property {Boolean} visible - True if the layer is visible.
         */
        this.visible = data.visible;

        /**
         * @property {integer} x - The x position of the ImageLayer.
         */
        this.x = data.offsetx || 0;

        /**
         * @property {integer} y - The y position of the ImageLayer.
         */
        this.y = data.offsety || 0;

        /**
         * @property {Tilemap} parent - The parent tilemap of this ImageLayer.
         */
        this.parent = parent;

        /**
        * @property {object} properties - ImageLayer-specific properties that are typically defined in the Tiled editor.
        */
        this.properties = data.properties || {};

        /**
         * @property {integer} opacity - The opacity of the ImageLayer.
         */
        this.opacity = data.opacity;

        /**
        * @property {Boolean} disposed - True if the ImageLayer  is disposed.
        */
        this.disposed = false;

        // Now ask the EntityFactory to add the image layer to the screen.
        ADCore.EntityFactory.AddImageLayer(this, this.name);
    }
    var p = ImageLayer.prototype;

    /**
     * Dispose the ImageLayer. Use this method to clean the ImageLayer in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof ImageLayer
     * @public
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

        Debug.LogWarning("ImageLayer.js:133 ADCore.EntityFactory.AddImageLayer(this, this.name); not removed yet!");
    };

    return ImageLayer;
}() );