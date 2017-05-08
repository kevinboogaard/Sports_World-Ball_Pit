var ballpit = ballpit || {};

ballpit.Event = ballpit.Event || {};
ballpit.Event.ON_TASK_DONE = "on_task_done";
ballpit.Event.ON_TASK_SPAWN = "on_tast_spawn";
ballpit.Event.ON_ROUND_BEGIN = "on_round_begin";
ballpit.Event.ON_ROUND_DONE = "on_round_done";

ballpit.CoachModel = (function () {

    /**'
     * 'CoachModel'
     */
    function CoachModel(json) {
        this.list = json;

        this.openList = [];
        this.closeList = [];

        this.current = null;

        this._initialize();
        this.PrepareRound();
    }
    var p = CoachModel.prototype;

    p._initialize = function () {
        
    };

    p.CallTask = function(){

    };

    p.CloseTask = function(){

    };

    p.PrepareRound = function(){
        /*for (var i = 0; i < this.list.length; i++) {
            console.log(this.list.length);
        }*/
        console.log(this.list);
    };

    return CoachModel;
})();