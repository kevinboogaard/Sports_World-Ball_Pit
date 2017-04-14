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
        this.anchor.set(spriteData.anchor.x, spriteData.anchor.y);
        this.offset = new Vector2(spriteData.offset.x, spriteData.offset.y);
        this.width = spriteData.dimensions.width;
        this.height = spriteData.dimensions.height;

        this.key = key;
        
        this.animationList = {};
        this.disposed = false;
    }
    Interface.prototype = Object.create(Phaser.Sprite.prototype);
    Interface.prototype.constructor = Interface;
    var p = Interface.prototype;

    p.RegisterTexture = function(savekey, spritekey){
        this.animationList[savekey] = {"sprite": spritekey};
        this.animations.add(spritekey);
    };

    p.PlayAnim = function(savekey,fps,loop){
        var sp_key = this.animationList[savekey].sprite;

        this.loadTexture(sp_key, 0, false);
        this.animations.play(sp_key, fps, loop);
    };

    /**
     * 'Dispose'
     *  with the dispose function you can clear all the data of an object and then destroy it.
     */
    p.Dispose = function(){
        delete this.offset;
        delete this.width;
        delete this.height;
        
        delete this.animationList;

        this.disposed = true;     
    };


    return Interface;
}());