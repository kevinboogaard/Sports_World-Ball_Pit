/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.Interface = (function () {

    /**
     * @class Interface
     * @constructor
     * @extends Sprite
     * @param {Vector2} position
     * @param {String} key - The sprite key from the preloader.
     */
    function Interface(position, key) {
        ADCore.Sprite.call(this, position, key);
    }
    Interface.prototype = Object.create(ADCore.Sprite.prototype);
    Interface.prototype.constructor = Interface;
    var p = Interface.prototype;

    /**
     * Dispose the ViewContainer. Use this method to clean the ViewContainer and the views in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof Interface
     * @public
     */
    p.__sprite_dispose = p.Dispose;
    p.Dispose = function(){
        this.__sprite_dispose();
    };


    return Interface;
}());