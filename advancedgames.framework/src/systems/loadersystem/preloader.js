var ADCore = ADCore || {};

ADCore.Event = ADCore.Event || {};
ADCore.Event.ON_PRELOAD_START = "on_preload_start";
ADCore.Event.ON_PRELOAD_UPDATE = "on_preload_update";
ADCore.Event.ON_PRELOAD_COMLETE = "on_preload_complete";

ADCore.PreloadCategory = ADCore.preloadCategory || {};
ADCore.PreloadCategory.GENERIC = "generic";
ADCore.PreloadCategory.LEVEL = "level";

ADCore.PreloadType = ADCore.preloadType || {};
ADCore.PreloadType.RESOURCE_LIST = "resourcelist";
ADCore.PreloadType.ATLAS_LIST = "atlaslist";
ADCore.PreloadType.MAP = "map";

ADCore.Preloader = (function(){

    /**
     * 'Preloader'
     * @param {Phaser} 'phaser'
     */
    function Preloader(phaser) {
        this._phaser = phaser;
        this._load = null;

        this.initialized = false;

        this._file_load_data = {};
    } 
    var p = Preloader.prototype;

    /**
     * 'Initialize'
     */
    p.Initialize = function(){
        this._load = this._phaser.load;        
        this._load.onFileComplete.add( this._onFileComplete.bind( this ), this );
        this._load.onFileError.add( this._onFileError.bind( this ), this );

        this.initialized = true;
    };

    /**
     * 'Preload'
     * @param {object} 'files'
     * @param {PreloadCategory} 'category'
     */
    p.Preload = function(files, category){
        if (!this.initialized) throw new Error("Preloader hasn't been initialized yet.");

        // If category is level, make a new object. We don't need the old level data because we're on a new one!
        if(category === ADCore.PreloadCategory.LEVEL) Global.Loaded.level = {};
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
     * 'OnFileComplete'
     * @private
     * Called by phaser when a file has been preloaded. Do not call yourself!
     */
    p._onFileComplete = function ( progress, savekey, success ) {
        var data = this._file_load_data[savekey];

        switch ( data.type ) {
            case ADCore.PreloadType.RESOURCE_LIST:
                this._preload_resource_list(data, savekey);
                break;

            case ADCore.PreloadType.ATLAS_LIST:
                this._preload_atlas_list(data, savekey);
                break;

            case ADCore.PreloadType.MAP: 
                this.__preload_map( data, savekey );
                break;

            default:
                this._save_resource( data, savekey );
                break;
        }

        delete this._file_load_data[savekey];
    };

    /**
     * 'Preload Resource'
     * @private
     * @param {string} 'file type'
     * @param {string} 'file path'
     * @param {string} 'savekey'
     * @param {string} 'loaded type'
     * @param {string} 'group key'
     * @param {object} 'data'
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
     * 'Preload Resource List'
     * @private
     * @param {object} 'data'
     * @param {string} 'savekey'
     */
    p._preload_resource_list = function ( data, savekey ) {
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
     * 'Preload Atlas List'
     * @private
     * @param {object} 'data'
     * @param {string} 'savekey'
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
     * 'Preload Map'
     * @private
     * @param {object} 'data'
     * @param {string} 'savekey'
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
     * 'Save Resource'
     * @private
     * @param {object} 'data'
     * @param {string} 'savekey'
     */
    p._save_resource = function ( data, savekey ) {
        if (savekey === "ingamesound | advancedgames.ballpit.game/assets/sounds/ingamemusic.mp3") {
            var a = "a";
        }

        // Get resource from cache.
        var resource = this._phaser.cache.get( data.type, savekey );

        if ( data.type === "image" ) resource = this._parse_image( data.data );
        else if ( data.type === "atlas" ) resource = data.data.animations;

        // Save in the loaded object.
        if ( data.groupkey ) Global.Loaded[data.loadedtype][data.groupkey][data.filekey] = resource;
        else Global.Loaded[data.loadedtype][data.filekey] = resource;

        var cachemap = this._phaser.cache._cacheMap;
        var map = cachemap[phaserExtension.CacheTypeToNumber(data.type)];

         map[data.filekey] = map[savekey];
        
         if ( data.type === "audio" ) return;
         delete map[savekey];
    };

    /**
     * 'Parse Image'
     * @private
     * @returns {object}
     * @param {object} 'data'
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
     * 'On File Error'
     * @private
     * Called by phaser when a file has been preloaded. Do not call yourself!
     */
    p._onFileError = function ( key, file ) {
        throw new Error( "\n ERROR in `" + key + "`: '" + file.errorMessage + "'" );
    };

    return Preloader;
})();

Phaser.Loader.prototype.resourcelist = function ( key, url, overwrite ) { 
    return this.addToFileList( "json", key, url, undefined, overwrite, ".json" );
 };
 
 Phaser.Loader.prototype.atlaslist = function ( key, url, overwrite ) { 
    return this.addToFileList( "json", key, url, undefined, overwrite, ".json" );
 };

Phaser.Loader.prototype.map = function ( key, url, overwrite ) { 
    return this.addToFileList( "json", key, url, undefined, overwrite, ".json" ); 
};

Phaser.Loader.prototype.tileset = function ( key, url, overwrite ) { 
    return this.addToFileList( "image", key, url, undefined, overwrite, ".png" ); 
};