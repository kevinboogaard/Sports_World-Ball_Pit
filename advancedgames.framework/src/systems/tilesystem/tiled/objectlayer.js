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
 * Objectlayer type
 */
ADCore.Tiled.LayerTypes.OBJECT = "objectgroup";

ADCore.Tiled.ObjectLayer = ( function () {

    /**
     * A ObjectLayer is a holder for the objects of a specific ObjectLayer of a Tilemap.
    *
     * @class ObjectLayer
     * @constructor
     * @memberof Tiled
     * @private
     * @param {Tilemap} parent - Parent of the ObjectLayer.
     * @param {Object} data - ObjectLayer data.
     */
    function ObjectLayer( parent, data ) {
        /**
        * @property {number} width - The width of the map (in tiles).
        */
        this.width = data.width || 0;

        /**
        * @property {number} height - The height of the map (in tiles).
        */
        this.height = data.height || 0;

        /**
        * @property {string} name - The name of the ObjectLayer.
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
         * @property {integer} x - The x position of the ObjectLayer.
         */
        this.x = data.offsetx || 0;

        /**
         * @property {integer} y - The y position of the ObjectLayer.
         */
        this.y = data.offsety || 0;

        /**
         * @property {Tilemap} parent - The parent tilemap of this ObjectLayer.
         */
        this.parent = parent;

        /**
        * @property {object} properties - ObjectLayer-specific properties that are typically defined in the Tiled editor.
        */
        this.properties = data.properties || {};

        /**
         * @property {integer} opacity - The opacity of the ObjectLayer.
         */
        this.opacity = data.opacity;

        /**
         * @property {string} draworder - The draworder of the ObjectLayer
         */
        this.draworder = data.draworder;

        /**
         * @property {Array} objectdata - Array of objects that the ObjectLayer  is holding.
         */
        this.objectdata = data.objects;

        /**
        * @property {Boolean} disposed - True if the ObjectLayer  is disposed.
        */
        this.disposed = false;

        // Initialize the ObjectLayer when the constructor has been called.
        this._initialize();
    }
    var p = ObjectLayer.prototype;

    /**
     * @method Initialize
     * @private 
     * @ignore 
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
     * Get an object by name.
     *
     * @method GetObjectByName
     * @memberof ObjectLayer
     * @public
     * @param {String} name - Name of the object.
     * @returns {ObjectLayer} The object that corresponds to its name. Null if it hasn't been found.
     */
    p.GetObjectByName = function ( name ) {
        var len = this.objectdata.length;
        for ( var i = 0; i < len; i++ ) {
            var object = this.objectdata[i];

            if ( object.name === name ) return object;
        }
        // Return null if the layer hasn't been found.
        return null;
    };

    /**
     * Get an array of objects corresponding by the name.
     *
     * @method GetGroupByName
     * @memberof ObjectLayer
     * @public
     * @param {String} name - Name of the group.
     * @returns {Array} Array of all the objects that has been found with the name.
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
     * Dispose the ObjectLayer. Use this method to clean the ObjectLayer in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof ObjectLayer
     * @public
     */
    p.Dispose = function () {
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
})();