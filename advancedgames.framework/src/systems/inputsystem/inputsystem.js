/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

/**
 * @namespace {String} InputEvent
 * @memberof ADCore
 * @typedef {(String)} InputEvent
 */
ADCore.InputEvent = ADCore.InputEvent || {};

/**
 * @event ON_DOWN
 * @memberof ADCore.InputEvent
 * @param {Object} event - see {@link http://phaser.io/docs/2.4.4/Phaser.Input.html}
 * @param {Vector2} position
 */
ADCore.InputEvent.ON_DOWN = "on_down";

/**
 * @event ON_UP
 * @memberof ADCore.InputEvent
 * @param {Object} event - see {@link http://phaser.io/docs/2.4.4/Phaser.Input.html}
 * @param {Vector2} position
 */
ADCore.InputEvent.ON_UP = "on_up";  

/**
 * @event ON_HOLD
 * @memberof ADCore.InputEvent
 * @param {Object} event - see {@link http://phaser.io/docs/2.4.4/Phaser.Input.html}
 * @param {Vector2} position
 */
ADCore.InputEvent.ON_HOLD = "on_hold";

/**
 * @event ON_TAP
 * @memberof ADCore.InputEvent
 * @param {Object} event - see {@link http://phaser.io/docs/2.4.4/Phaser.Input.html}
 * @param {Vector2} position
 */
ADCore.InputEvent.ON_TAP = "on_tap";

/**
 * @namespace {String} KeyboardEvent
 * @memberof ADCore
 * @typedef {(String)} KeyboardEvent
 */
ADCore.KeyboardEvent = ADCore.KeyboardEvent || {};

/**
 * @event ON_KEY_DOWN
 * @memberof ADCore.KeyboardEvent
 * @param {Keyboard} keyCode
 */
ADCore.KeyboardEvent.ON_KEY_DOWN = "on_key_down";

/**
 * @event ON_KEY_UP
 * @memberof ADCore.KeyboardEvent
 * @param {Keyboard} keyCode
 */
ADCore.KeyboardEvent.ON_KEY_UP = "on_key_up";

/**
 * @namespace {String} Input
 * @typedef {(String)} Input
 */
var Input = {};

/**
 * @property {Boolean} paused - True to pause the input calls.
 * @memberof Input
 * @static
 */
Input.paused = false;

ADCore.InputSystem = (function () {

    /**
     * Extension of the Phaser Input System.
     * This class translates input calls to event calls to create a more monitored and clean code.
     *
     * @class InputSystem
     * @constructor
     * @param {Phaser.Input} input - The phaser input system we can extend.
     */
    function InputSystem(input) {

        /**
        * @property {Vector2} inputPosition - The public inputPosition property.
        * @public
        */
        this.inputPosition = new Vector2();

        /**
        * @property {Boolean} views - True if any input is down.
        * @private
        */
        this._inputDown = false;

        /**
        * @property {Integer} keyPressed - The current key pressed.
        * @public
        */
        this.keyPressed = -1;

        /**
        * @property {Integer} lastKeyPressed - The last key that has been pressed. 
        * @public
        */
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
     * @method Update
     * @memberof InputSystem
     * @public 
     */
    p.Update = function () {
        this.inputPosition = new Vector2(ADCore.phaser.input.x, ADCore.phaser.input.y);
    };

    /**
     * This function dispatches ON_DOWN with the Listener class
     * When Phaser detects any input.
     * 
     * @method onInputDown
     * @memberof InputSystem
     * @private
     */
    p.onInputDown = function ( event ) {
        if ( Input.paused ) return;
        this._inputDown = true;

        Listener.Dispatch( ADCore.InputEvent.ON_DOWN, this, { "event": event, "position": this.inputPosition}, false);
    };

    /**
     * This function dispatches ON_UP with the Listener class
     * When Phaser detects any input.
     * 
     * @method onInputUp
     * @memberof InputSystem
     * @private
     */
    p.onInputUp = function ( event ) {
        if ( Input.paused || this._inputDown === false ) return;
        this._inputDown = false;
        Listener.Dispatch( ADCore.InputEvent.ON_UP, this, { "event": event, "position": this.inputPosition}, false);
    };

    /**
     * This function dispatches ON_TAP with the Listener class
     * When Phaser detects any input.
     * 
     * @method onInputUp
     * @memberof InputSystem
     * @private
     */
    p.onInputTap = function ( event ) {
        if ( Input.paused ) return;
        Listener.Dispatch( ADCore.InputEvent.ON_TAP, this, { "event": event, "position": this.inputPosition}, false);
    };

    /**
     * This function dispatches ON_HOLD with the Listener class
     * When Phaser detects any input.
     * 
     * @method onInputHold
     * @memberof InputSystem
     * @private
     */
    p.onInputHold = function ( event ) {
        if ( Input.paused ) return;
        Listener.Dispatch( ADCore.InputEvent.ON_HOLD, this, { "event": event, "position": this.inputPosition}, false);
    };

    /**
     * This function dispatches KEY_DOWN with the Listener class
     * When Phaser detects keyboard input.
     * 
     * @method onKeyboardKeyDown
     * @memberof InputSystem
     * @private
     */
    p.onKeyboardKeyDown = function ( event ) {
        if ( Input.paused ) return;
        var keyCode = event.keyCode;
        this.keyPressed = this.lastKeyPressed = keyCode;
        Listener.Dispatch( ADCore.KeyboardEvent.ON_KEY_DOWN, this, { "keyCode": keyCode } );
    };

    /**
     * This function dispatches KEY_UP with the Listener class
     * When Phaser detects keyboard input.
     * 
     * @method onKeyboardKeyUp
     * @memberof InputSystem
     * @private
     */
    p.onKeyboardKeyUp = function ( event ) {
        if ( Input.paused ) return;
        var keyCode = event.keyCode;
        this.keyPressed = -1;
        Listener.Dispatch( ADCore.KeyboardEvent.ON_KEY_UP, this, { "keyCode": keyCode } );
    };

    return InputSystem;
})();