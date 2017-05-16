/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

/**
 * @namespace Event
 */
let Event = ADCore.Event || {};
ADCore.Event = Event;

/**
 * @property {String} ON_PRELOAD_START
 * @memberof Event
 * @readonly
 */
ADCore.Event.ON_PRELOAD_START = "on_preload_start";

/**
 * @property {String} ON_PRELOAD_UPDATE
 * @memberof Event
 * @readonly
 */
ADCore.Event.ON_PRELOAD_UPDATE = "on_preload_update";

/**
 * @property {String} ON_PRELOAD_COMPLETE
 * @memberof Event
 * @readonly
 */
ADCore.Event.ON_PRELOAD_COMPLETE = "on_preload_complete";

/**
 * @namespace PreloadCategories
 */
let PreloadCategories = ADCore.PreloadCategories || {};
ADCore.PreloadCategories = PreloadCategories;

/**
 * @property {String} CORE
 * @memberof PreloadCategories
 * @readonly
 */
ADCore.PreloadCategories.CORE = "core";

/**
 * @property {String} GENERIC
 * @memberof PreloadCategories
 * @readonly
 */
ADCore.PreloadCategories.GENERIC = "generic";

/**
 * @property {String} LEVEL
 * @memberof PreloadCategories
 * @readonly
 */
ADCore.PreloadCategories.LEVEL = "level";

/**
 * @namespace PreloadTypes
 */
let PreloadTypes = ADCore.PreloadTypes || {};
ADCore.PreloadTypes = PreloadTypes;

/**
 * @property {String} RESOURCE_LIST
 * @memberof PreloadTypes
 * @readonly
 */
ADCore.PreloadTypes.RESOURCE_LIST = "resourcelist";

/**
 * @property {String} ATLAS_LIST
 * @memberof PreloadTypes
 * @readonly
 */
ADCore.PreloadTypes.ATLAS_LIST = "atlaslist";

/**
 * @property {String} MAP
 * @memberof PreloadTypes
 * @readonly
 */
ADCore.PreloadTypes.MAP = "map";

ADCore.Preloader = (function(){

    /**
     * Special preloader to preload maps, atlas lists and resource lists.
    *
     * @class Preloader
     * @constructor
     * @param {Phaser.Game} phaser - This is usually ADCore.phaser. 
     */
    function Preloader(phaser) {
        /**
        * @property {Phaser.Game} _Phaser - Constructed Phaser Game.
        * @private
        */
        this._phaser = phaser;

        /**
         * Load is made when calling the 'Initialize' method of the class. 
         * @property {Phaser.Load} _Load - Constructed Phaser Load.
         * @private
         * @default Null 
         */
        this._load = null;

        /**
        * @property {Boolean} initialized - True if Preloader.Initialize() is called.
        * @public
        */
        this.initialized = false;

        /**
        * @property {Object} _FileLoadData - THe data if the files loaded.
        * @private
        */
        this._file_load_data = {};
    } 
    var p = Preloader.prototype;

    /**
     * This method needs to be called when Phaser.Game has been constructed.
     * This way The Phaser.Load has been made, so ADCore.Preloader can use the Phaser.Preloader.
     * 
     * @method Initialize
     * @memberof Preloader
     * @public 
     */
    p.Initialize = function(){
        this._load = this._phaser.load;        
        this._load.onFileComplete.add( this._onFileComplete.bind( this ), this );
        this._load.onFileError.add( this._onFileError.bind( this ), this );
        this._load.onLoadStart.add(function() { Listener.Dispatch(ADCore.Event.ON_PRELOAD_START, this ); }.bind(this), this);
        this._load.onLoadComplete.add(function() { Listener.Dispatch(ADCore.Event.ON_PRELOAD_COMPLETE, this ); }.bind(this), this);

        this.initialized = true;
    };

    /**
     * Use this function to preload files into a specific category.
     * 
     * @method Preload
     * @memberof Preloader
     * @public 
     * @param {Object} files - Files that need to be preloaded.
     * @param {PreloadCategories} category - Category of the files. 
     */
    p.Preload = function(files, category){
        if (!this.initialized) throw new Error("Preloader hasn't been initialized yet.");

        // If category is level, make a new object. We don't need the old level data because we're on a new one!
        if(category === ADCore.PreloadCategories.LEVEL) Global.Loaded.level = {};
        // Reset the Phaser Load since we're preloading new things.
        this._load.reset(); 

        var len = files.length;
        for (var i = 0; i < len; i++) {
            var file = files[i];

            var savekey = file.key + " | " + file.path;
            this._preload_resource(file.type, file.path, file.key, savekey, category, null);
        }

        this._load.start();
    };

    /**
     * Called by phaser when a file has been preloaded. Do not call yourself!
     * 
     * @method _OnFileComplete
     * @memberof Preloader
     * @private 
     * @param {Number} progress - The progress of the file.
     * @param {String} savekey - The savekey of the file. 
     * @param {Boolean} success - True if the file has been succesfully loaded. 
     * @ignore
     */
    p._onFileComplete = function ( progress, savekey, success ) {
        var data = this._file_load_data[savekey];

        Listener.Dispatch(ADCore.Event.ON_PRELOAD_UPDATE, this, { "progress": progress, "savekey": savekey, "success": success });

        switch ( data.type ) {
            case ADCore.PreloadTypes.RESOURCE_LIST:
                this._preload_resource_list(data, savekey);
                break;

            case ADCore.PreloadTypes.ATLAS_LIST:
                this._preload_atlas_list(data, savekey);
                break;

            case ADCore.PreloadTypes.MAP: 
                this.__preload_map( data, savekey );
                break;

            default:
                this._save_resource( data, savekey );
                break;
        }

        delete this._file_load_data[savekey];
    };

    /**
     * This method preloads a specific resource.
     * 
     * @method _PreloadResource
     * @memberof Preloader
     * @private
     * @param {String} file_type
     * @param {String} file_path
     * @param {String} file_key
     * @param {String} save_key
     * @param {String} loaded_type
     * @param {String} group_key
     * @param {Object} data
     * 
     * @example 
     * preloader._preload_resource( 'image', 'character', 'character | path/to/image', 'GENERIC', 'images', {} );
     */
    p._preload_resource = function ( file_type, file_path, file_key, save_key, loaded_type, group_key, data ) {
        // Use the phaser json preloader to preload each json from global level resource list and save the file to the current_load_list.
        this._file_load_data[save_key] = {
            "type": file_type,
            "filekey": file_key,
            "savekey": save_key,
            "loadedtype": loaded_type,
            "groupkey": group_key,
            "data": data
        };

        this._load[file_type]( save_key, file_path );
    };

    /**
     * Preload a resource list.
     * 
     * @method _PreloadResourceList
     * @memberof Preloader
     * @private
     * @param {object} data - The data of the resource list.
     * @param {string} savekey - The save key of the resource list.
     */
    p._preload_resource_list = function ( data, savekey ) {
        // Phaser parses the file and stores it in the cache. So, I get the file out of there using its key.
        var json = this._phaser.cache.getJSON( savekey );

        // Create new object or use the existing one inside the namespace.
        Global.Loaded[data.loadedtype][data.filekey] = (Global.Loaded[data.loadedtype][data.filekey]) ? Global.Loaded[data.loadedtype][data.filekey] : {};

        // Get the basepath, type and resources from the json file.
        var resource_basepath = json["base_path"];
        var resource_type = json["type"];
        var resources = json["resources"];

        // For each key inside resources
        for ( var resource_key in resources ) {
            // Check if the key actually exists inside resources.
            if ( resources.hasOwnProperty( resource_key ) ) {

                // Get all data from resource to preload the files.
                var resource_data = resources[resource_key];

                if (resource_data.path.constructor === Array) {
                    var len = resource_data.path.length;
                    for (var i = 0; i < len; i++) {
                        var resource_path = resource_basepath + resource_data.path[i];
                        var resource_savekey = resource_key + " | " + resource_path;

                        this._preload_resource( resource_type, resource_path, resource_key, resource_savekey, data.loadedtype, data.filekey, resource_data );
                    }
                } else {
                    var resource_path = resource_basepath + resource_data.path;
                    var resource_savekey = resource_key + " | " + resource_path;

                    this._preload_resource( resource_type, resource_path, resource_key, resource_savekey, data.loadedtype, data.filekey, resource_data );
                }
            }
        }
    };

    /**
     * Preload an atlas list.
     * 
     * @method _PreloadAtlasList
     * @memberof Preloader
     * @private
     * @param {object} data - The data of the atlas list.
     * @param {string} savekey - The save key of the atlas list.
     */
    p._preload_atlas_list = function ( data, savekey ) {
        // Phaser parses the file and stores it in the cache. So, I get the file out of there using its key.
        var json = this._phaser.cache.getJSON( savekey );

        // If the loader key already exists, throw an error.
        if ( typeof Global.Loaded[data.loadedtype][data.filekey] !== "undefined" ) throw "Duplicate key found in Loaded files";

        // Create new object inside Global namespace.
        Global.Loaded[data.loadedtype][data.filekey] = {};

        // Get the basepath, type and resources from the json file.
        var resource_basepath = json["base_path"];
        var resource_type = json["type"];
        var resources = json["resources"];

        // For each key inside resources
        for ( var resource_key in resources ) {
            // Check if the key actually exists inside resources.
            if ( resources.hasOwnProperty( resource_key ) ) {

                // Get all data from resource to preload the files.
                var resource_data = resources[resource_key];
                var resource_atlas_path = resource_basepath + resource_data.atlas_path;
                var resource_json_path = resource_basepath + resource_data.json_path;
                var resource_savekey = resource_key + " | " + resource_atlas_path;

                this._file_load_data[resource_savekey] = {
                    "type": resource_type,
                    "filekey": resource_key,
                    "savekey": resource_savekey,
                    "loadedtype": data.loadedtype,
                    "groupkey": data.filekey,
                    "data": resource_data
                };

                this._load.atlas( resource_savekey, resource_atlas_path, resource_json_path, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
            }
        }
    };
    
    /**
     * Preload a Tiled map.
     * 
     * @method _PreloadMap
     * @memberof Preloader
     * @private
     * @param {object} data - The data of the map.
     * @param {string} savekey - The save key of the map.
     */
    p.__preload_map = function ( data, savekey ) {
        // Phaser parses the file and stores it in the cache. So, I get the file out of there using its key.
        var map = this._phaser.cache.getJSON( savekey );
        var group_key = "images";

        // If the loader key already exists, throw an error.
        if ( typeof Global.Loaded[data.loadedtype][data.filekey] !== "undefined" ) throw "Duplicate key found in Loaded files";

        // Create new objects inside Global namespace to save the tileset images.
        Global.Loaded[data.loadedtype]["images"] = Global.Loaded[data.loadedtype][group_key] || {};

        // Loop through all tilesets.
        var len = map.tilesets.length;
        for ( var i = 0; i < len; i++ ) {
            var tileset = map.tilesets[i];

            var tileset_type = "image";
            var tileset_key = tileset.name;
            var tileset_path = tileset.image;
            var tileset_savekey = tileset_key + " | " + tileset_path;

            this._preload_resource( tileset_type, tileset_path, tileset_key, tileset_savekey, data.loadedtype, group_key, tileset);
        }

        // Save the map.
        Global.Loaded[data.loadedtype][data.filekey] = map;
    };

    /**
     * Preload a resource.
     * 
     * @method _SaveResource
     * @memberof Preloader
     * @private
     * @param {object} data - The data of the resource.
     * @param {string} savekey - The save key of the resource.
     */
    p._save_resource = function ( data, savekey ) {
        // Get resource from cache.
        var resource = this._phaser.cache.get( data.type, savekey );

        if ( data.type === "image" ) resource = this._parse_image( data.data );
        else if ( data.type === "atlas" ) resource = data.data.animations;

        // Save in the loaded object.
        if ( data.groupkey ) Global.Loaded[data.loadedtype][data.groupkey][data.filekey] = resource;
        else Global.Loaded[data.loadedtype][data.filekey] = resource;

        var cachemap = this._phaser.cache._cacheMap;
        var map = cachemap[ADCore.PhaserExtension.CacheTypeToNumber(data.type)];

         map[data.filekey] = map[savekey];
        
         if ( data.type === "audio" ) return;
         delete map[savekey];
    };

    /**
     * This function parses image data so each image has the same data saved.
     * 
     * @method _ParseImage
     * @memberof Preloader
     * @private 
     * @param {Object} data - data of the image
     * @returns {Object} Parsed image data.
     */
    p._parse_image = function ( data ) {
        if ( data.image ) {
            var anchor = new Vector2();
            var offset = new Vector2();

            if ( data.tileoffset ) {
                offset = new Vector2( data.tileoffset.x, data.tileoffset.y );
            }

            if ( data.properties ) {
                if ( data.properties.anchorX ) anchor.x = data.properties.anchorX;
                if ( data.properties.anchorY ) anchor.y = data.properties.anchorY;

                if ( data.properties.offsetX ) offset.x += data.properties.offsetX;
                if ( data.properties.offsetY ) offset.y += data.properties.offsetY;
            }

            return {
                "path": data.image,
                "dimensions": { "width": data.imagewidth, "height": data.imageheight },
                "anchor": { "x": anchor.x, "y": anchor.y },
                "offset": { "x": offset.x, "y": offset.y }
            };
        } else {
            return data;
        }
    };

    /**
     * Called by phaser when a file has failed to preload. Do not call yourself!
     * 
     * @method _OnFileError
     * @memberof Preloader
     * @private 
     * @param {String} key - The savekey of the file. 
     * @param {Object} file - File that has failed to load.
     * @ignore
     */
    p._onFileError = function ( key, file ) {
        throw new Error( "\n ERROR in `" + key + "`: '" + file.errorMessage + "'" );
    };

    return Preloader;
})();

// Extension of phaser loader to preload a custom object called "Resourcelist"
Phaser.Loader.prototype.resourcelist = function ( key, url, overwrite ) { 
    return this.addToFileList( "json", key, url, undefined, overwrite, ".json" );
 };
 
// Extension of phaser loader to preload a custom object called "Atlaslist"
 Phaser.Loader.prototype.atlaslist = function ( key, url, overwrite ) { 
    return this.addToFileList( "json", key, url, undefined, overwrite, ".json" );
 };

// Extension of phaser loader to preload a custom object called "Map"
Phaser.Loader.prototype.map = function ( key, url, overwrite ) { 
    return this.addToFileList( "json", key, url, undefined, overwrite, ".json" ); 
};

// Extension of phaser loader to preload a custom object called "Tileset"
Phaser.Loader.prototype.tileset = function ( key, url, overwrite ) { 
    return this.addToFileList( "image", key, url, undefined, overwrite, ".png" ); 
};