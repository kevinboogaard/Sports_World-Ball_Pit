var ADCore = ADCore || {};

ADCore.Display = (function () {

    /**
     * 'Display'
     * 
     * @param {entity} 'model'
     */
    function Display(model) {
        this.model = model;
        this.anchor = new Vector2();
        this.offset = new Vector2();
        this.disposed = false;
    }
    var p = Display.prototype;

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