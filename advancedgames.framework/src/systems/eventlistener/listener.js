/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var ADCore = ADCore || {};

/**
 * @namespace {String} Event
 * @memberof ADCore
 * @typedef {(String)} Event
 */
ADCore.Event = ADCore.Event || {};

this.Listener = (function () {

    /**
     * Similar to the addEventListener / DispatchEvent from Actionscript3.
     * Event listeners, which are also called event handlers, are functions that are executed in response to specific events. 
     * Adding an event listener is a two-step process. First, you create a function or class method to execute in response to the event. This is sometimes called the event handler function.
     * Second, you use the Listener.Listen() method to register your listener function with the target of the event or any display list object that lies along the appropriate event flow. 
     * 
     * @class Listener
     * @constructor
     * @static
     */
    function Listener() {

        /**
        * @property {Object} listeners - The list containing all the listener data.
        * @private
        */
        this._listeners = {};
    } 
    var p = Listener.prototype;

    /**
     * Use the Listener.Listen() method to register your handler with the target of the event that lies along the appropriate event flow.
     * 
     * @method Listen
     * @memberof Listener
     * @static
     * @param {Event} event
     * @param {Object} listener
     * @param {Function} handler
     * @param {Object} [dispatcher] - If dispatcher is null, your listener will listen to everyone.
     */
    p.Listen = function (event, listener, handler, dispatcher) {
        this._listen(event, listener, handler, dispatcher);
    };

    /**
     * Use the Listener.ListenOnce() method to listen once to an event that lies along the appropriate event flow.
     * If the listener is called it will be automaticly removed from the list.  
     * 
     * @method ListenOnce
     * @memberof Listener
     * @static
     * @param {Event} event
     * @param {Object} listener
     * @param {Function} handler
     * @param {Object} [dispatcher] - If dispatcher is null, your listener will listen to everyone.
     */
    p.ListenOnce = function (event, listener, handler, dispatcher) {
        var data = this._listen(event, listener, handler, dispatcher);
        data.once = true;
    };

    /**
     * Private function to handle both of the Listen / ListenOnce methods. 
     * 
     * @method Listen
     * @memberof Listener
     * @private
     * @param {Event} event
     * @param {Object} listener
     * @param {Function} handler
     * @param {Object} [dispatcher] - If dispatcher is null, your listener will listen to everyone.
     */
    p._listen = function (event, listener, handler, dispatcher) {
        // Check if the listener is defined and if the listener doesn't have the event.
        if ( typeof listener === 'undefined' ) throw "Listener is undefined";
        if ( this._hasListenerAddedEvent( listener, event ) ) throw listener + " has already added event: " + event;

        // Save data in an object. We can use this data later on to find the listener that matches the event.
        var listener_data = { "listener": listener, "event": event, "handler": handler, "dispatcher": dispatcher || null };

        // Check if there is a list for the matching event- if not: make one.
        if ( typeof this._listeners[event] === "undefined" ) this._listeners[event] = [];
        this._listeners[event].push(listener_data);

        return listener_data;
    };

    /**
     * You can use the Listener.Mute() method to remove an event listener that you no longer need. 
     * It is a good idea to remove any listeners that will no longer be used to prevent memory leaks from happening.
     * 
     * @method Mute
     * @memberof Listener
     * @static
     * @param {Event} event
     * @param {Object} listener
     */
    p.Mute = function (event, listener) {
        var index = this._getListenerIndex(event, listener);
        if (index === -1) throw "Can't remove. Index is -1";

        this._listeners[event].splice(index, 1);    
    };

    /**
     * You can use the Listener.MuteAll() method to remove all event listeners from the object. 
     * Warning: Don't use this if you don't know what you're doing. It's better to mute them individually than to mute it all.
     * This function is mostly used on the end of a dispose function!
     * 
     * @method MuteAll
     * @memberof Listener
     * @static
     * @param {Object} listener
     */
    p.MuteAll = function ( listener ) {
        // For each key inside _listeners.
        for ( var listenerArray in this._listeners ) {
            // Check if the key actually exists inside _listeners.
            if ( this._listeners.hasOwnProperty( listenerArray ) ) {

                var len = listenerArray.length;
                for ( var i = 0; i < len; i++ ) {
                    var current = listenerArray[i];

                    if ( current.listener === listener ) {
                        listenerArray.splice( i, 1 );
                    }
                }
            }
        }
    };

    /**
     * The Listener.Dispatch() method can be used to dispatch a custom event object into the event flow.
     * 
     * @method Dispatch
     * @memberof Listener
     * @static
     * @param {Event} event
     * @param {Object} caller
     * @param {Object}  [args] - The arguments to give to the listeners.
     * @param {boolean} [call_when_debug=false] - If you have debug mode on, you will console the dispatch.
     */
    p.Dispatch = function (event, caller, args, call_when_debug) {
        var listeners = this._getListenersByEvent(event);
        if ( call_when_debug ) Debug.LogWarning("Listener.js: 148 not written yet"); // Placeholder for the debug call.
        if ( typeof event === "undefined" ) throw "Event is undefined!";

        var len = listeners.length;
        for (var i = len - 1; i >= 0; i--) {
            var current = listeners[i];

            var listen_to_all = (current.dispatcher === null);
            if ( listen_to_all || caller === current.dispatcher ) {
                if ( current.once ) {
                    this.Mute( current.event, current.listener );
                }

                current.handler(caller, args);
            }
        }
    };

    /**
     * @method HasListenerAddedEvent
     * @memberof Listener
     * @private
     * @param {Object} listener
     * @param {Event} event
     * @returns {Boolean}
     */
    p._hasListenerAddedEvent = function (listener, event) {
        var listeners = this._getListenersByEvent(event);

        var len = listeners.length;
        for (var i = 0; i < len; i++) {
            var current = listeners[i];

            if (current.listener === listener) return true;
        }

        return false;
    };

    /**
     * @method GetListenersByEvent
     * @memberof Listener
     * @private
     * @param {Event} event
     * @returns {Object}
     */
    p._getListenersByEvent = function (event) {
        return this._listeners[event] || [];
    };

    /**
     * @method GetListenerIndex
     * @memberof Listener
     * @private
     * @param {Object} listener
     * @param {Event} event
     * @returns {Integer}
     */
    p._getListenerIndex = function (event, listener) {
        var len = this._listeners[event].length;
        for (var i = 0; i < len; i++) {
            var current = this._listeners[event][i];

            if (current.listener === listener) return i;
        }

        return -1;
    };

    /**
     * @method GetListenerIndexes
     * @memberof Listener
     * @private
     * @param {Object} listener
     * @param {Event} event
     * @returns {Array} Array of indexes (integers)
     */
    p._getListenerIndexes = function (listener) {
        var result = [];
        
        // For each key inside _listeners
        for ( var listenerArray in this._listeners ) {
            // Check if the key actually exists inside _listeners.
            if ( this._listeners.hasOwnProperty( listenerArray ) ) {

                var len = listenerArray.length;
                for ( var i = 0; i < len; i++ ) {
                    var current = listenerArray[i];

                    if ( current.listener === listener ) {
                        result.push( i );
                    }
                }
            }
        }

        return result;
    };

    return new Listener();
}());