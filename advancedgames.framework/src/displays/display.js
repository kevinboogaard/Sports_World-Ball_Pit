var ADCore = ADCore || {};

ADCore.Display = (function () {

    /**
     * 'Display'
     * @param {entity} 'model'
     * @param {string} 'key'
     */
    function Display(model, key) {
        ADCore.Sprite.call(this, new Vector2(model.x, model.y), key);
        this.model = model;
    }
    Display.prototype = Object.create(ADCore.Sprite.prototype);
    Display.prototype.constructor = Display;
    var p = Display.prototype;

    /**
     * 'Render'
     */
    p.Render = function () {
        this.x = this.position.x = this.model.x;
        this.y = this.position.y = this.model.y;
    };

    /**
     * 'Dispose'
     */
    p.__sprite_dispose = p.Dispose;
    p.Dispose = function(){
        delete this.model;
        this.__sprite_dispose();
    };

    return Display;
}());