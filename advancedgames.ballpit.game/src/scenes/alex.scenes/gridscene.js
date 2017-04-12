var scene = scene || {};

scene.Gridscene = (function () {

    /**
     * 'Gridscene'
     */
    function Gridscene() {
        console.log("Entering Gridscene");

        Listener.Listen(ADCore.InputEvent.ON_DOWN, this, this.onInputDown.bind(this));
    }
    var p = Gridscene.prototype;

    p.onInputDown = function(caller, params) {
        console.log(params);
    }

    p.dispose = function () {
    
    };

    return Gridscene;
}());
