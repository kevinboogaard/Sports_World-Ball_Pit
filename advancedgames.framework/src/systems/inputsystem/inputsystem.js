var ADCore = ADCore || {};

ADCore.InputEvent = ADCore.InputEvent || {};
ADCore.InputEvent.ON_DOWN = "on_down";
ADCore.InputEvent.ON_UP = "on_up";  
ADCore.InputEvent.ON_HOLD = "on_hold";
ADCore.InputEvent.ON_TAP = "on_tap";
ADCore.InputEvent.ON_SWIPE = "on_swipe";

ADCore.KeyboardEvent = ADCore.KeyboardEvent || {};
ADCore.KeyboardEvent.KEY_DOWN = "key_down";
ADCore.KeyboardEvent.KEY_UP = "key_up";

var Input = {};
Input.paused = false;

ADCore.InputSystem = (function () {

    /**
     * 'InputSystem'
     */
    function InputSystem(input) {
        this.inputPosition = new Vector2();
        this._inputDown = false;

        this._startPosition = null;

        // Remember key presses.
        this.keyPressed = -1;
        this.lastKeyPressed = -1;

        // Add the mouse move / mouse down / mouse up functies to the input call list.
        input.onDown.add( this.onInputDown, this );
        input.onUp.add( this.onInputUp, this );
        input.onTap.add( this.onInputTap, this );
        input.onHold.add( this.onInputHold, this );
        input.keyboard.onDownCallback = this.onKeyboardKeyDown.bind( this );
        input.keyboard.onUpCallback = this.onKeyboardKeyUp.bind( this );
    }
    var p = InputSystem.prototype;

    p.Update = function () {
        this.inputPosition = new Vector2(ADCore.phaser.input.x, ADCore.phaser.input.y);
    };

    /**
     * onInputDown
     * This function dispatches ON_DOWN with the Listener class
     * When Phaser detects any input.
     */
    p.onInputDown = function ( event ) {
        if ( Input.paused ) return;
        var position = new Vector2(ADCore.phaser.input.x, ADCore.phaser.input.y);
        
        this._startPosition = position;
        this._inputDown = true;

        Listener.Dispatch( ADCore.InputEvent.ON_DOWN, this, { "event": event, "position": position }, false);
    };

    /**
     * onInputUp
     * This function dispatches ON_UP with the Listener class
     * When Phaser detects any input.
     */
    p.onInputUp = function ( event ) {
        if ( Input.paused || this._inputDown === false ) return;
        var position = new Vector2(ADCore.phaser.input.x, ADCore.phaser.input.y);

        this._inputDown = false;
        Listener.Dispatch( ADCore.InputEvent.ON_UP, this, { "event": event, "position": position }, false);

        if (this._startPosition !== position)  Listener.Dispatch( ADCore.InputEvent.ON_SWIPE, this, { "event": event, "start": this._startPosition, "end": position }, false);
        this._startPosition = null;
    };

    /**
     * onInputTap
     * This function dispatches ON_TAP with the Listener class
     * When Phaser detects any input.
     */
    p.onInputTap = function ( event ) {
        if ( Input.paused ) return;
        Listener.Dispatch( ADCore.InputEvent.ON_TAP, this, { "event": event, "position": new Vector2(ADCore.phaser.input.x, ADCore.phaser.input.y) }, false);
    };

    /**
     * onInputHold
     * This function dispatches ON_HOLD with the Listener class
     * When Phaser detects any input.
     */
    p.onInputHold = function ( event ) {
        if ( Input.paused ) return;
        Listener.Dispatch( ADCore.InputEvent.ON_HOLD, this, { "event": event, "position": new Vector2(ADCore.phaser.input.x, ADCore.phaser.input.y) }, false);
    };

    /**
     * onKeyboardKeyDown
     * This function dispatches KEY_DOWN with the Listener class
     * When Phaser detects keyboard input.
     */
    p.onKeyboardKeyDown = function ( event ) {
        if ( Input.paused ) return;
        var keyCode = event.keyCode;
        this.keyPressed = this.lastKeyPressed = keyCode;
        Listener.Dispatch( ADCore.KeyboardEvent.KEY_DOWN, this, { "keyCode": keyCode } );
    };

    /**
     * onKeyboardKeyUp
     * This function dispatches KEY_UP with the Listener class
     * When Phaser detects keyboard input.
     */
    p.onKeyboardKeyUp = function ( event ) {
        if ( Input.paused ) return;
        var keyCode = event.keyCode;
        this.keyPressed = -1;
        Listener.Dispatch( ADCore.KeyboardEvent.KEY_UP, this, { "keyCode": keyCode } );
    };

    return InputSystem;
}());