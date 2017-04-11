var scene = scene || {};

scene.Gridscene = (function () {

    /**
     * 'Gridscene'
     */
    function Gridscene() {
        console.log("HELLO WORLD!");
        Listener.Listen(ADCore.InputEvent.ON_DOWN, this, this.onInputDown.bind(this));
    }
    var p = Gridscene.prototype;

    p.onInputDown = function(test) {
        console.log("CLICK!!");
    }

    p.dispose = function () {
    
    };

    return Gridscene;
}());