var ADCore = ADCore || {};

ADCore.Display = (function () {

    /**
     * 'Display'
     * 
     * @param {entity} 'model'
     */
    function Display(model, key) {
        Phaser.Sprite.call(this, ADCore.phaser, model.x, model.y, key);

        this.model = model;
        
        var spriteData = Global.Loaded.generic.images[key];
        if ( typeof spriteData === "undefined" ) spriteData = Global.Loaded.level.images[key];

        this.anchor.set(spriteData.anchor.x, spriteData.anchor.y);
        this.offset = spriteData.offset;
        
        this.disposed = false;
    }
    Display.prototype = Object.create(Phaser.Sprite.prototype);
    Display.prototype.constructor = Display;
    var p = Display.prototype;

    p.render = function () {
        this.x = this.model.x;
        this.y = this.model.y;
    };

    /**
     * 'Dispose'
     *  with the dispose funtion you can clear all the data of an object and then destroy it.
     */
    p.Dispose = function(){
        delete this.model;
        delete this.anchor;
        delete this.offset;

        this.disposed = true;        
    };

    return Display;


}());