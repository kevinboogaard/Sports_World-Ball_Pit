var ADCore = ADCore || {};

ADCore.Entity = (function () {

    /**
     * 'Entity'
     */
    function Entity(position) {
        this.position = position;

        this.disposed = false;

        ADCore.EnableMutators( this );
        this._gettersAndSetters();
    }
    var p = Entity.prototype;

    /**
     * 'Dispose'
     *  with the dispose funtion you can clear all the data of an object and then destroy it.
     */
    p.Dispose = function(){
        delete this.position;

        this.disposed = true;        
    };

    /**
     * 'Getters And Setters'
     */
    p._gettersAndSetters = function () {
        this.Define("x", {
            "get": function () {
                return this.position.x;
            },
            "set": function (value) {
                this.position.x = value;
            }
        });

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