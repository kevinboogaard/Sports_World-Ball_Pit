/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.Sprite = (function () {

    /**
     * This is the basic sprite class used for both the views and the interfaces.
     * 
     * @class Sprite
     * @constructor
     * @extends Phaser.Sprite
     * @abstract
     * @param {Vector2} position
     * @param {String} key
     */
    function Sprite(position, key) {
        if (this.constructor.name === Sprite.name) throw new Error("This class is an abstract class.");
        Phaser.Sprite.call(this, ADCore.phaser, position.x, position.y, key);

        /**
         * @property {Array} animations - The animations of the sprite.
         * @private
         */
        this._animations = [];

        /**
         * @property {Boolean} disposed - True if the spsrite has been disposed.
         * @public
         */
        this.disposed = false;

        // Initialize the sprite by fetching its data.
        this._initializeSprite(key);
        // Initialize the animations by fetching its data and loading the sprites in the AnimationManager.
        this._initializeAnimations(key);
    }
    Sprite.prototype = Object.create(Phaser.Sprite.prototype);
    Sprite.prototype.constructor = Sprite;
    var p = Sprite.prototype;

    /**
     * @method InitializeSprite
     * @memberof Sprite
     * @private
     * @param {String} key
     */
    p._initializeSprite = function (key) {
        var data = Global.Loaded.generic.images[key];
        if (!data) {
            if (!Global.Loaded.level.sprites) return;
            data = (Global.Loaded.level.sprites[key]);
            if (!data) return;
        }
        this.anchor.set(data.anchor.x, data.anchor.y);
        this.offset = data.offset;
        this.width = data.dimensions.width;
        this.height = data.dimensions.height;
    };

    /**
     * @method InitializeAnimations
     * @memberof Sprite
     * @private
     * @param {String} key
     */
    p._initializeAnimations = function (key) {
        var data = Global.Loaded.generic.spritesheets[key];
        if (!data) return;

        for ( var anim_key in data ) {
            if ( data.hasOwnProperty( anim_key ) ) {
                var frames = data[anim_key];
                this.animations.add(anim_key, frames);

                this._animations.push(anim_key);
            }
        }
    };

    /**
     * Play an animation that has been registered at the initialize.
     * 
     * @method Play
     * @memberof Sprite
     * @param {String} name
     * @param {Integer} [frameRate=30]
     * @param {Boolean} [loop=false]
     * @returns {Phaser.Animation}
     */
    p.Play = function (name, frameRate, loop, killOnComplete) {
        if (this._animations.contains(name) === false) throw new Error("Animation doesn't exist");
        return this.animations.play(name, frameRate || 30, loop || false, killOnComplete || false);
    };

    /**
     * Dispose the sprite. Use this method to clean the sprite in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof Sprite
     * @public
     */
    p.Dispose = function () {
        delete this._animations;
        this.disposed = true;
    };

    return Sprite;
}());