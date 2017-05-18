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
        Phaser.Sprite.call(this, ADCore.phaser, position.x, position.y, key);

        /**
         * @property {Array} _Animations - The animations of the sprite.
         * @private
         */
        this._animations = [];

        /**
         * @property {Function} OnAnimationComplete - Do somthing after the animantion is done
         * @public
         */
        this.onAnimationComplete = null;

        /**
         * @property {Boolean} Disposed - True if the spsrite has been disposed.
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
     * @method _InitializeSprite
     * @memberof Sprite
     * @private
     * @param {String} key
     */
    p._initializeSprite = function (key) {
        var data = this._getLoadedData("images", key);
        if (!data) return;

        this.anchor.set(data.anchor.x, data.anchor.y);
        this.offset = data.offset;
        this.width = data.dimensions.width;
        this.height = data.dimensions.height;
    };

    /**
     * @method _InitializeAnimations
     * @memberof Sprite
     * @private
     * @param {String} key
     */
    p._initializeAnimations = function (key) {
        var data = this._getLoadedData("spritesheets", key);
        if (!data) return;

        for ( var anim_key in data ) {
            if ( data.hasOwnProperty( anim_key ) ) {
                var frames = data[anim_key];
                this.animations.add(anim_key, frames);

                this._animations.push(anim_key);
            }
        }

       this.events.onAnimationComplete.add(this._onAnimationComplete.bind(this));
    };

    p._onAnimationComplete = function(){
        if(this.onAnimationComplete){
            this.onAnimationComplete();
        }
    };

    /**
     * @method _GetLoadedData
     * @memberof Sprite
     * @private
     * @param {String} list
     * @param {String} key
     * @returns {(Object | null)}
     */
    p._getLoadedData = function(list, key) {
        var data = null;

        if (Global.Loaded.core[list]) {
            if (Global.Loaded.core[list][key]) data = Global.Loaded.core[list][key];
        }

        if (Global.Loaded.generic[list]) {
            if (Global.Loaded.generic[list][key]) data = Global.Loaded.generic[list][key];
        }

        if (Global.Loaded.level[list]) {
            if (Global.Loaded.level[list][key]) data = Global.Loaded.level[list][key];
        }
        
        return data;
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