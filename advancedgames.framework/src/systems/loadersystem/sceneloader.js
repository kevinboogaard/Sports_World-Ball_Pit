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
     * 'load'
     * @param {scene} 'scene'
     */
    p.load = function(scene){
        this.current = new scene();
    };

    /**
     * 'switch'
     * @param {scene} 'scene'
     */
    p.switch = function(scene) {
        this.disposeCurrent();
        this.load(scene);
    };

    /**
     * 'disposeCurrent'
     */
    p.disposeCurrent = function(){
        this.current.dispose();
        this.current = null;
    };

    return Sceneloader;
}());