var ADCore = ADCore || {};

ADCore.Interface = (function () {

    /**'
     * 'Interface'
     * @param {vector2} 'vector'
     * @param {key} 'key'
     */
    function Interface(position, key) {
        Phaser.Sprite.call(this, ADCore.phaser, position.x,position.y,key);


        var spriteData = Global.Loaded.generic.images[key];
        this.anchor.set(spriteData.anchor.x,spriteData.anchor.y);
        this.offset = spriteData.offset;
        this.width = spriteData.dimensions.width;
        this.height = spriteData.dimensions.height;
        
        this.dispodes = false;

    }
    Interface.prototype = Object.create(Phaser.Sprite.prototype);
    Interface.prototype.constructor = Interface;
    var p = Interface.prototype;

    /**
     * 'Dispose'
     */
    p.Dispose = function(){
        delete this.anchor;
        delete this.offset;
        delete this.width;
        delete this.height;

        this.disposed = true;        
    };


    return Interface;
}());