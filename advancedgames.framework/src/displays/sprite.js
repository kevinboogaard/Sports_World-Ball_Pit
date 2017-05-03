var ADCore = ADCore || {};

ADCore.Sprite = (function () {

    /**
     * 'Sprite'
     */
    function Sprite(position, key) {
        Phaser.Sprite.call(this, ADCore.phaser, position.x, position.y, key);

        this._animations = [];
        this.disposed = false;

        this._initializeSprite(key);
        this._initializeAnimations(key);
    }
    Sprite.prototype = Object.create(Phaser.Sprite.prototype);
    Sprite.prototype.constructor = Sprite;
    var p = Sprite.prototype;

    /**
     * 'InitializeSprite'
     * @param {String} 'key'
     */
    p._initializeSprite = function (key) {
        var data = Global.Loaded.generic.images[key];
        if (!data) return;

        this.anchor.set(data.anchor.x, data.anchor.y);
        this.offset = data.offset;
        this.width = data.dimensions.width;
        this.height = data.dimensions.height;
    };

    /**
     * 'InitializeAnimations'
     * @param {String} 'key'
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
     * 'Play'
     * @returns {Phaser.Animation}
     * @param {String} 'name'
     */
    p.Play = function (name, frameRate, loop, killOnComplete) {
        if (this._animations.contains(name) === false) throw new Error("Animation doesn't exist");
        return this.animations.play(name, frameRate || 30, loop || false, killOnComplete || false);
    };

    /**
     * 'Dispose'
     *  With the dispose function you can clear all the data of an object before you destroy it.
     */
    p.Dispose = function () {
        delete this._animations;
        this.disposed = true;
    };

    return Sprite;
}());