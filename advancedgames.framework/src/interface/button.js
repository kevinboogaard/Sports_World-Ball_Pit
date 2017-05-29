/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

ADCore.Button = (function () {

    /**
     * @class Button
     * @constructor
     * @extends Interface
     * @param {Vector2} position
     * @param {String} key - The sprite key from the preloader.
     */
    function Button(position, key) {
        ADCore.Interface.call(this, position, key);
        
        /**
         * @property {Text} Text - If the button has a text- this is the variable where it would be stored.
         * Use the SetText() to set text on the button.
         * @public
         * @readonly 
         * @default null
         */
        this.text = null;

        /**
         * @property {Boolean} InputEnabled - Need to put input enabled for Phaser Input System. 
         * @ignore
         */
        this.inputEnabled = true;
        
        /**
         * @property {Boolean} Disabled - This will be true if the input is disabled. 
         * Look at the Enable() and Disable() functions to switch the variable.
         * @public
         * @readonly 
         */
        this.disabled = true;

        /**
         * @property {Boolean} InputOver - This will be true if a mouse hovers over the button.
         * @public
         * @readonly 
         */
        this.inputOver = false;
        
        /**
         * @property {Function} OnInputDown - Set this variable with a function to listen to the call.
         * @public
         * @default null
         */
        this.onInputDown = null;     

        /**
         * @property {Function} OnInputUp - Set this variable with a function to listen to the call.
         * @public
         * @default null
         */
        this.onInputUp = null;
        
        /**
         * @property {Function} OnInputOver - Set this variable with a function to listen to the call.
         * @public
         * @default null
         */
        this.onInputOver = null;

        /**
         * @property {Function} OnInputLeave - Set this variable with a function to listen to the call.
         * @public
         * @default null
         */
        this.onInputLeave = null;

        if (this._animations.contains("inactive")) this.Play("inactive");

        // Enable the button when it is constructed.
        this.Enable();
    }
    Button.prototype = Object.create(ADCore.Interface.prototype);
    Button.prototype.constructor = Button;
    var p = Button.prototype;

    /**
     * @method SetText
     * @memberof Button
     * @public
     * @param {Text} text - This method only adds the text child and sets the variable. 
     */
    p.SetText = function (text){
        this.text = text;
        this.addChild(this.text);
    };

    /**
     * @method Enable
     * @memberof Button
     * @public
     */
    p.Enable = function(){  
        if ( this.disabled === false ) return;
        this.disabled = false;

        this.removeChild( this.text );
        delete this.text;

        this.events.onInputOut.add( this._onInputLeave, this );
        this.events.onInputOver.add( this._onInputOver, this );
        this.events.onInputUp.add( this._onInputUp, this );
        this.events.onInputDown.add( this._onInputDown, this );
    };
    
    /**
     * @method Disable
     * @memberof Button
     * @public
     */
    p.Disable = function(){
        if ( this.disabled ) return;
        this.disabled = true;

        this.events.onInputOut.remove( this._onInputLeave, this );
        this.events.onInputOver.remove( this._onInputOver, this );
        this.events.onInputUp.remove( this._onInputUp, this );
        this.events.onInputDown.remove( this._onInputDown, this );
    };
    
    /**
     * Listens to Phaser build in input system.
     * 
     * @method _OnInputDown
     * @memberof Button
     * @private
     */
    p._onInputDown = function () {
        if ( this._animations.contains("active") ) this.Play("active");
        if ( typeof this.onInputDown === "function" ) this.onInputDown( this );
    };
    
    /**
     * Listens to Phaser build in input system.
     * 
     * @method _OnInputUp
     * @memberof Button
     * @private
     */
    p._onInputUp = function () {
        soundSystem.PlaySound("sound_buttonselect", 1, false);
        if ( this._animations.contains("inactive") ) this.Play("inactive");
        if ( typeof this.onInputUp === "function" ) this.onInputUp( this );
    };
    
    /**
     * Listens to Phaser build in input system.
     * 
     * @method _OnInputOver
     * @memberof Button
     * @private
     */
    p._onInputOver = function () {
        this.inputOver = true;
        if ( typeof this.onInputOver === "function" ) this.onInputOver( this );
    };
    
    /**
     * Listens to Phaser build in input system.
     * 
     * @method _OnInputLeave
     * @memberof Button
     * @private
     */
    p._onInputLeave = function () {
        this.inputOver = false;
        if ( typeof this.onInputLeave === "function" ) this.onInputLeave( this );
    };

    return Button;
})();