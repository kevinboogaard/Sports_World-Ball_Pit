/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

/**
 * @namespace
 */
let PhaserExtension = {}; // For documentation purposes.
ADCore.PhaserExtension = {};

/**
 * @method Phaser.Cache.get
 * @memberof PhaserExtension
 * @override 
 * @public
 * @param {string} type - Type of the result you are trying to get.
 * @param {string} key - Key of the result you are trying to get.
 * @returns {T} result
 */
Phaser.Cache.prototype.get = function ( type, key ) {
    switch ( type ) {
        case "json":
            return this.getJSON( key );

        case "xml":
            return this.getXML( key );

        case "video":
            return this.getVideo( key );

        case "url":
            return this.getURL( key );

        case "tilemap":
            return this.getTilemapData( key );

        case "tilemapdata":
            return this.getTilemapData( key );

        case "textureframe":
            return this.getTextureFrame( key );

        case "text":
            return this.getText( key );

        case "sounddata":
            return this.getSoundData( key );

        case "shader":
            return this.getShader( key );

        case "rendertexture":
            return this.getRenderTexture( key );

        case "pixitexture":
            return this.getPixiTexture( key );

        case "pixibasetexture":
            return this.getPixiBaseTexture( key );

        case "physicsdata":
            return this.getPhysicsData( key );

        case "keys":
            return this.getKeys( key );

        case "item":
            return this.getItem( key );

        case "image":
            return this.getImage( key );

        case "atlas":
            return this.getImage( key );

        case "framedata":
            return this.getFrameData( key );

        case "framecount":
            return this.getFrameCount( key );

        case "framebyname":
            return this.getFrameByName( key );

        case "framebyindex":
            return this.getFrameByIndex( key );

        case "frame":
            return this.getFrame( key );

        case "canvas":
            return this.getCanvas( key );

        case "bitmapfont":
            return this.getBitmapFont( key );

        case "bitmapdata":
            return this.getBitmapData( key );

        case "binary":
            return this.getBinary( key );

        case "basetexture":
            return this.getBaseTexture( key );

        case "audio": 
            return this.getSound( key );

        default:
            throw new Error( "Type not known: Cache.Get()" );
    }
};

/**
 * Returns the corresponding number to the cache type.
 * 
 * @method PhaserExtension.CacheTypeToNumber
 * @memberof PhaserExtension
 * @override
 * @static
 * @param {string} type - Type of the result you are trying to get.
 * @returns {Number} result
 */
ADCore.PhaserExtension.CacheTypeToNumber = function ( type ) {
    switch (type) {
        case "canvas":
            return 1;
            
        case "image": 
            return 2;

        case "atlas":
            return 2;

        case "texture": 
            return 3;

        case "sound":
        case "audio": 
            return 4;

        case "text": 
            return 5;

        case "physics": 
            return 6;

        case "tilemap": 
            return 7;

        case "binary": 
            return 8;

        case "bitmapdata": 
            return 9;

        case "bitmapfont": 
            return 10;

        case "json": 
            return 11;

        case "xml": 
            return 12;

        case "video": 
            return 13;

        case "shader": 
            return 14;

        case "rendertexture": 
            return 15;
        
        default:
            throw new Error("Type not known to Phaser");
    }
};