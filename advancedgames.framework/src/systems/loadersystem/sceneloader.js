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
        ADCore.phaser.add.existing(this.current);
    };

    /**
     * 'Switch'
     * @param {scene} 'scene'
     */
    p.Switch = function(scene) {
        this.DisposeCurrent();
        this.Load(scene);
    };

    /**
     * 'DisposeCurrent'
     */
    p.DisposeCurrent = function(){
        this.current.Dispose();
        this.current = null;
    };

    return Sceneloader;
}());