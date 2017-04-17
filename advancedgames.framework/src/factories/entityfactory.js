var ADCore = ADCore || {};
ADCore.EntityFactory = {};

/**'
 * 'AddTile '
 * @param {vector2} 'position'
 * @param {vector2} 'tileposition'
 * @param {string} 'key'
 * @param {int} 'gid'
 * @param {vector2} 'dimensions'
 * @param { {} } 'properties'
 */
ADCore.EntityFactory.AddTile = function( position, tileposition, key, gid, dimensions, properties ){
    var model = new ADCore.TileModel( gid, position, tileposition, dimensions, properties );

    if ( gid !== null ) {
        if ( model.lower ) {
            Listener.Dispatch( ADCore.Event.ON_LOWER_MODEL_ADD, this, { "model": model, "viewtype": ADCore.TileView, "key": key } );
        } else {
            Listener.Dispatch( ADCore.Event.ON_MODEL_ADD, this, { "model": model, "viewtype": ADCore.TileView, "key": key } );
        }
    }

    return model;
};

/**'
 * 'AddImageLayer '
 * @param {vector2} 'position'
 * @param {string} 'key'
 */
ADCore.EntityFactory.AddImageLayer = function( model, key ){
    Listener.Dispatch( ADCore.Event.ON_LOWER_MODEL_ADD, this, { "model": model, "viewtype": ADCore.Display, "key": key } );
};