var ADCore = ADCore || {};

ADCore.Sceneloader = (function () {

     /**
     * 'Sceneloader'
     */
    function Sceneloader() {
        this.current = null;
    }
    var p = Sceneloader.prototype;
    
    /**
     * 'Load'
     * @param {scene} 'scene'
     */
    p.Load = function(scene){
        if (typeof scene === "undefined") throw new Error("Scene doesn't exist: " + scene);
        this.current = new scene();
    };

    /**
     * 'Switch'
     * @param {scene} 'scene'
     */
    p.Switch = function(scene) {
        this.disposeCurrent();
        this.load(scene);
    };

    /**
     * 'DisposeCurrent'
     */
    p.DisposeCurrent = function(){
        this.current.dispose();
        this.current = null;
    };

    return Sceneloader;
}());