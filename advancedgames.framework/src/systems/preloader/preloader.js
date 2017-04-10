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
     * { if private } @private
     */
    p._initialize = function(){
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
        if(category === ADCore.PreloadCategory.LEVEL) Global.Loaded.LEVEL = {};
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
                var resource_path = resource_basepath + resource_data.path;
                var resource_savekey = resource_key + " | " + resource_path;

                this._preload_resource( resource_type, resource_path, resource_key, resource_savekey, data.loadedtype, data.filekey, resource_data );
            }
        }
    };
    
    /**
     * 'Save Resource'
     * @private
     * @param {object} 'data'
     * @param {string} 'savekey'
     */
    p._save_resource = function ( data, savekey ) {
        // Get resource from cache.
        var resource = this._phaser.cache.get( data.type, savekey );

        if ( data.type === "image" ) resource = this._parse_image( data.data );

        // Save in the loaded object.
        if ( data.groupkey ) Global.Loaded[data.loadedtype][data.groupkey][data.filekey] = resource;
        else Global.Loaded[data.loadedtype][data.filekey] = resource;
        
        if ( data.type === "image" ) {
            var cachemap = this._phaser.cache._cacheMap;
            var imagemap = cachemap[Phaser.Cache.IMAGE];

            // Set savekey to json_key.
            imagemap[data.filekey] = imagemap[savekey];
            delete imagemap[savekey];
        }
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