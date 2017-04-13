var ADCore = ADCore || {};
ADCore.EntityFactory = {};

/**'
 * 'AddTile '
 * @param {balltype} 'type'
 * @param {vector2} 'position'
 */
ADCore.EntityFactory.AddTile = function( position, tileposition, key, gid, dimensions, properties ){
    var model = new ADCore.TileModel( gid, position, tileposition, dimensions, properties );

    if ( model.gid === null ) {
        if ( model.lower ) {
            Listener.Dispatch( ADCore.Event.ON_LOWER_MODEL_ADD, this, { "model": model, "viewtype": ADCore.Display, "key": key } );
        } else {
            Listener.Dispatch( ADCore.Event.ON_MODEL_ADD, this, { "model": model, "viewtype": ADCore.Display, "key": key } );
        }
    }

    return model;
};