/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.Display = (function () {

    /**
     * This is the base-view for the MVC pattern.
     * 
     * @class Display
     * @constructor
     * @extends Sprite
     * @param {Entity} model
     * @param {String} key
     */
    function Display(model, key) {
        ADCore.Sprite.call(this, new Vector2(model.x, model.y), key);

        /**
         * @property {Entity} model - The model of the view.
         * @public
         */
        this.model = model;
    }
    Display.prototype = Object.create(ADCore.Sprite.prototype);
    Display.prototype.constructor = Display;
    var p = Display.prototype;

    /**
     * @method Render
     * @memberof Display
     * @public
     */
    p.Render = function () {
        this.x = this.position.x = this.model.x;
        this.y = this.position.y = this.model.y;
    };

    /**
     * Dispose the display. Use this method to clean the display in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof Display
     * @public
     */
    p.__sprite_dispose = p.Dispose;
    p.Dispose = function(){
        delete this.model;
        this.__sprite_dispose();
    };

    return Display;
}());