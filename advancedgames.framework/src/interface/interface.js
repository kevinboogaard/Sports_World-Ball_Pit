var ADCore = ADCore || {};

ADCore.Interface = (function () {

    /**'
     * 'Interface'
     * @param {vector2} 'vector'
     * @param {key} 'key'
     */
    function Interface(position, key) {
        ADCore.Sprite.call(this, position, key);
    }
    Interface.prototype = Object.create(ADCore.Sprite.prototype);
    Interface.prototype.constructor = Interface;
    var p = Interface.prototype;

    /**
     * 'Dispose'
     */
    p.__sprite_dispose = p.Dispose;
    p.Dispose = function(){
        this.__sprite_dispose();
    };


    return Interface;
}());