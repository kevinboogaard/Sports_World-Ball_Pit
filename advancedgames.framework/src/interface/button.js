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

        this.inputEnabled = false;
        this.disabled = false;
        this.inputOVer = false;
        
        this.oninputdown = null;      
        this.onmouseup = null;
        this.onmouseover = null;
        this.onmouseleave = null;

        this.Enable();
    }
    Button.prototype = Object.create(ADCore.Interface.prototype);
    Button.prototype.constructor = Button;
    var p = Button.prototype;

    /**'
    * 'setText'
    * @param {text} 'text'
    */
    p.SetText = function (text){
        this.text = text;
    };
    /**
    * 'enable'
    */
    p.Enable = function(){  
        if ( this.disabled === false ) return;
        this.disabled = false;

        this.removeChild( this.text );
        delete this.text;

        this.events.onInputOut.add( this.onMouseLeave, this );
        this.events.onInputOver.add( this.onMouseOver, this );
        this.events.onInputUp.add( this.onMouseUp, this );
        this.events.onInputDown.add( this.onMouseDown, this );
    };
    
    /**
    * 'disable'
    */
    p.Disable = function(){
        if ( this.disabled ) return;
        this.disabled = true;

        this.events.onInputOut.remove( this.onMouseLeave, this );
        this.events.onInputOver.remove( this.onMouseOver, this );
        this.events.onInputUp.remove( this.onMouseUp, this );
        this.events.onInputDown.remove( this.onMouseDown, this );
    };
    
    /**
    * 'onMouseDown'
    */
    p._onMouseDown = function () {
        if ( typeof this.onmousedown === "function" ) this.onmousedown( this );
    };
    
    /**
    * 'onMouseUp'
    */
    p._onMouseUp = function () {
        if ( typeof this.onmouseup === "function" ) this.onmouseup( this );
    };
    
    /**
    * 'onMouseOver'
    */
    p._onMouseOver = function () {
        this.mouseOver = true;
        if ( typeof this.onmouseover === "function" ) this.onmouseover( this );
    };
    
    /**
    * 'onMouseLeave'
    */
    p._onMouseLeave = function () {
        this.mouseOver = false;
        if ( typeof this.onmouseleave === "function" ) this.onmouseleave( this );
    };

    return Button;
})();