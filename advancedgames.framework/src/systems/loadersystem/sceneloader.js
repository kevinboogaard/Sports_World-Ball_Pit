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
     * @param {scene} 'constructor'
     */
    p.Load = function(constructor) {
        if (typeof constructor === "undefined") throw new Error("Scene doesn't exist: " + constructor);
        if (typeof constructor === "string") constructor = scene[constructor];

        this.current = new constructor();
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