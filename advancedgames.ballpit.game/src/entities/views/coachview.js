/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.CoachView = (function () {

    /**'
     * @class CoachView
     * @constructor 
     * @extends Display
     * @param {CoachModel} model
     * @param {String} key
     */
    function CoachView(model, key) {
        ADCore.Display.call( this, model, key );
    }
    CoachView.prototype = Object.create(ADCore.Display.prototype);
    CoachView.prototype.constructor = CoachView;
    var p = CoachView.prototype;

    return CoachView;
})();