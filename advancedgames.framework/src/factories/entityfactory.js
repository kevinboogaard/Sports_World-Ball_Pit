/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

/**
 * @namespace EntityFactory
 * @memberof ADCore
 * @static
 */
ADCore.EntityFactory = {};

/**
 * @method AddTile 
 * @memberof EntityFactory
 * @static
 * @param {Vector2} position - The screen position of a tile.
 * @param {Vector2} tileposition - The tile position of a tile.
 * @param {String} key - The key of the sprite that needs to be used.
 * @param {Integer} gid - The GID of the tileset that the tile needs to know.
 * @param {Vector2} dimensions - The dimensions of the tile.
 * @param {Object} properties - The extra properties of the tile.
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

/**
 * @method AddImageLayer 
 * @memberof EntityFactory
 * @static
 * @param {Vector2} position - The screen position of the Image Layer.
 * @param {String} key - The key of the sprite that needs to be used.
 */
ADCore.EntityFactory.AddImageLayer = function( model, key ){
    Listener.Dispatch( ADCore.Event.ON_LOWER_MODEL_ADD, this, { "model": model, "viewtype": ADCore.Display, "key": key } );
};