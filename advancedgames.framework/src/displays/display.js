var ADCore = ADCore || {};

ADCore.Display = (function () {

    /**
     * 'Display'
     * 
     * @param {entity} 'model'
     */
    function Display(model, key) {
        ADCore.Interface.call(this, new Vector2(model.x, model.y), key);
        
        this.model = model;
    }
    Display.prototype = Object.create(ADCore.Interface.prototype);
    Display.prototype.constructor = Display;
    var p = Display.prototype;

    p.render = function () {
        this.x = this.model.x;
        this.y = this.model.y;
    };

    /**
     * 'Dispose'
     *  with the dispose function you can clear all the data of an object and then destroy it.
     */
    p.__interface_dispose = p.Dispose;
    p.Dispose = function(){
        delete this.model;
        this.__interface_dispose();
    };

    return Display;


}());