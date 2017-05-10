/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.Watch = (function () {

    /**'
     * @class Watch
     * @constructor 
     * @extends Interface
     * @param {Vector2} position
     * @param {String} key
     * @param {Timer} timer
     */
    function Watch(position, key, timer) {
        ADCore.Interface.call( this, position, key );

        this.timer = timer;
        this.timer.Start();

        this.text = null;

        this._initialize();
    }
    Watch.prototype = Object.create(ADCore.Interface.prototype);
    Watch.prototype.constructor = Watch;
    var p = Watch.prototype;

    /**
     * @method _initialize
     * @memberof Watch
     * @private
     * @ignore
     */
    p._initialize = function () {
        var offset = 2;

        this.text = new ADCore.Text().value("00:00").size(17).font("dsdigi").color("#FFFFFF").finish();
        this.text.x = this.width / 2;
        this.text.y = (this.height / 2) + offset;
        this.text.anchor.setTo(0.5, 0.5);
        this.addChild(this.text);
    };

    /**
     * @method Render
     * @memberof Watch
     * @public
     */
    p.Render = function () {
        this.text.text = ADCore.msToTime(this.timer.count, [ "minutes", "seconds" ]);
    };
    
    return Watch;
})();