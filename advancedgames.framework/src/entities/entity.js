var ADCore = ADCore || {};

ADCore.Entity = (function () {

    /**
     * 'Entity'
     */
    function Entity() {
        this.position = new Vector2();

        this.disposed = false;
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

    return Entity;
}());