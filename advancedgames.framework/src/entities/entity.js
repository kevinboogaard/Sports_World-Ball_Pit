/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.Entity = (function () {

    /**
     * This is the base-model for the MVC pattern.
     * 
     * @class Entity
     * @constructor
     * @param {Vector2} position - The position of the entity.
     */
    function Entity(position) {

        /**
         * @property {Vector2} position - The position of the entity.
         * @public
         */
        this.position = position;

        /**
         * @property {Boolean} disposed - True if the entity has been disposed.
         * @public
         */
        this.disposed = false;

        // Enable the mutators for this class to have Getters & Setters.
        ADCore.EnableMutators( this );
    }
    var p = Entity.prototype;

    /**
     * Dispose the entity. Use this method to clean the entity in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof Entity
     * @public
     */
    p.Dispose = function(){
        delete this.position;

        this.disposed = true;        
    };

    /**
     * Getters & Setters internal function.
     * 
     * @method GettersAndSetters
     * @memberof Entity
     * @private 
     * @ignore
     */
    p.gettersAndSetters = function () {

        /**
         * @property {Integer} x
         * @public
         */
        this.Define("x", {
            "get": function () {
                return this.position.x;
            },
            "set": function (value) {
                this.position.x = value;
            }
        });

        /**
         * @property {Integer} y
         * @public
         */
        this.Define("y", {
            "get": function () {
                return this.position.y;
            },
            "set": function (value) {
                this.position.y = value;
            }
        });
    };

    return Entity;
}());