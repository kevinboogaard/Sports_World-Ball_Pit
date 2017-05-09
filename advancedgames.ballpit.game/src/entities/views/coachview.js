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
    function CoachView(position, key, model) {
        ADCore.Interface.call( this, position, key );

        this.model = model;
    }
    CoachView.prototype = Object.create(ADCore.Interface.prototype);
    CoachView.prototype.constructor = CoachView;
    var p = CoachView.prototype;

    return CoachView;
})();