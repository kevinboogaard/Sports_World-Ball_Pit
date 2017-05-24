/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ballpit = ballpit || {};

ballpit.finishpopup = (function(){

     /**
     * @class finishpopup
     * @extends Popup
     * @constructor
     * @param {Function} callback
     */

    function FinishPopup(){
        ADCore.Popup.call(this, callback);

         this._initialize();
    }
    FinishPopup.prototype = Object.create(ADCore.Popup.prototype);
    FinishPopup.prototype.constructor = FinishPopup;
    var p = FinishPopup.prototype;

    p._initialize = function () {
        this.background = new ADCore.Interface(new Vector2(),);


    };
})