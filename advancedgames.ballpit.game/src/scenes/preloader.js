var scene = scene || {};

scene.Preloader = (function () {

    /**'
     * 'Preloader'
     */
    function Preloader() {
        console.log("Entering Preloader");
    }
    var p = Preloader.prototype;

    /**'
     * 'Complete'
     * This is the function that is called when the preloader is complete.
     */
    p.Complete = function () {

    }

    /**'
     * 'Dispose'
     */
    p.dispose = function () {
        
    }

    return Preloader;
}());