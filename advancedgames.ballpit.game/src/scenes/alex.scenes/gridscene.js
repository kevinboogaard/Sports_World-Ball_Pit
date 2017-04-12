var scene = scene || {};

scene.Gridscene = (function () {

    /**
     * 'Gridscene'
     */
    function Gridscene() {
        Phaser.Group.call(this, ADCore.phaser, null, "Gridscene");
        console.log("Entering Gridscene");
        
        this.tilemap = new Tilemap(Global.Loaded.level.level1_map);

        var layer = this.tilemap.mainLayer;
        var columns = layer.tiledata;
        for (var x = 0; x < columns.length ; x++) {
            var row = columns[x];
            for (var y = 0; y < row.length; y++) {
                Debug.DrawCircle(new Vector2(x * 90, y * 90), 20, "rgba(255, 0, 0, 1)", false);
            }
        }
    }
    Gridscene.prototype = Object.create(Phaser.Group.prototype);
    Gridscene.prototype.constructor = Gridscene; 
    var p = Gridscene.prototype;

    p.dispose = function () {
    
    };

    return Gridscene;
}());
