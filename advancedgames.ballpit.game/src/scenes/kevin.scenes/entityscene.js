var scene = scene || {};

scene.Entityscene = (function () {

    /**
     * 'Entityscene'
     */
    function Entityscene() {

        this.entityModel = new ADCore.Entity();
        this.entityView = new ADCore.Display(this.entityModel);
    }
    var p = Entityscene.prototype;

    p.dispose = function () {
    
    };

    return Entityscene;
}());