var ADCore = ADCore || {};

ADCore.Button = (function () {

    /**'
     * 'Button'
     * @param {vector2} 'position'
     * @param {key} 'key'
     */
    function Button(position, key) {
        ADCore.Interface.call(this, position, key);
        
        this.text = null;

        this.inputEnabled = true;
        this.disabled = true;
        this.inputOver = false;
        
        this.onInputDown = null;      
        this.onInputUp = null;
        this.onInputOver = null;
        this.onInputLeave = null;

        this.Enable();
    }
    Button.prototype = Object.create(ADCore.Interface.prototype);
    Button.prototype.constructor = Button;
    var p = Button.prototype;

    /**
    * 'setText'
    * @param {text} 'text'
    */
    p.SetText = function (text){
        this.text = text;
        this.addChild(this.text);
    };

    /**
    * 'enable'
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
    * 'disable'
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
    * 'onInputDown'
    * @private
    */
    p._onInputDown = function () {
        if ( typeof this.onInputDown === "function" ) this.onInputDown( this );
    };
    
    /**
    * 'onInputUp'
    * @private
    */
    p._onInputUp = function () {
        if ( typeof this.onInputUp === "function" ) this.onInputUp( this );
    };
    
    /**
    * 'onInputOver'
    * @private
    */
    p._onInputOver = function () {
        this.inputOver = true;
        if ( typeof this.onInputOver === "function" ) this.onInputOver( this );
    };
    
    /**
    * 'onInputLeave'
    * @private
    */
    p._onInputLeave = function () {
        this.inputOver = false;
        if ( typeof this.onInputLeave === "function" ) this.onInputLeave( this );
    };

    return Button;
})();