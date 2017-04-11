var ADCore = ADCore || {};

ADCore.InputEvent = ADCore.InputEvent || {};
ADCore.InputEvent.ON_DOWN = "on_down";
ADCore.InputEvent.ON_UP = "on_up";  
ADCore.InputEvent.ON_HOLD = "on_hold";
ADCore.InputEvent.ON_TAP = "on_tap";

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

    /**
     * onInputDown
     * This function dispatches ON_DOWN with the Listener class
     * When Phaser detects any input.
     */
    p.onInputDown = function ( event ) {
        if ( Input.paused ) return;
        Listener.Dispatch( ADCore.InputEvent.ON_DOWN, this, { }, false);
    };

    /**
     * onInputUp
     * This function dispatches ON_UP with the Listener class
     * When Phaser detects any input.
     */
    p.onInputUp = function ( event ) {
        if ( Input.paused ) return;
        Listener.Dispatch( ADCore.InputEvent.ON_UP, this, { }, false);
    };

    /**
     * onInputTap
     * This function dispatches ON_TAP with the Listener class
     * When Phaser detects any input.
     */
    p.onInputTap = function ( event ) {
        if ( Input.paused ) return;
        Listener.Dispatch( ADCore.InputEvent.ON_TAP, this, { }, false);
    };

    /**
     * onInputHold
     * This function dispatches ON_HOLD with the Listener class
     * When Phaser detects any input.
     */
    p.onInputHold = function ( event ) {
        if ( Input.paused ) return;
        Listener.Dispatch( ADCore.InputEvent.ON_HOLD, this, { }, false);
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