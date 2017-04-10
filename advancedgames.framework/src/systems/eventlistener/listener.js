var AGCore = AGCore || {};
AGCore.Event = AGCore.Event || {};

this.Listener = (function () {

    /**
     * 'Listener'
     * @static
     * Similar to the addEventListener / DispatchEvent from Actionscript3.
     * Event listeners, which are also called event handlers, are functions that are executed in response to specific events. 
     * Adding an event listener is a two-step process. First, you create a function or class method to execute in response to the event. This is sometimes called the event handler function.
     * Second, you use the Listener.Listen() method to register your listener function with the target of the event or any display list object that lies along the appropriate event flow. 
     */
    function Listener() {
        this._listeners = {};
    } 
    var p = Listener.prototype;

    /**
     * 'Listen'
     * @static
     * @param {event_string} 'Event'
     * @param {object} 'Listener'
     * @param {function} 'Handler'
     * @param {object} {optional} 'Dispatcher' | If dispatcher is null, your listener will listen to everyone.
     * Use the Listener.Listen() method to register your handler with the target of the event that lies along the appropriate event flow.
     */
    p.Listen = function (event, listener, handler, dispatcher) {
        this._listen(event, listener, handler, dispatcher);
    };

    /**
     * 'ListenOnce'
     * @static
     * @param {event_string} 'Event'
     * @param {object} 'Listener'
     * @param {function} 'Handler'
     * @param {object} {optional} 'Dispatcher' | If dispatcher is null, your listener will listen to everyone.
     * Use the Listener.ListenOnce() method to listen once to an event that lies along the appropriate event flow.
     * If the listener is called it will be automaticly removed from the list.  
     */
    p.ListenOnce = function (event, listener, handler, dispatcher) {
        var data = this._listen(event, listener, handler, dispatcher);
        data.once = true;
    };

    /**
     * 'Listen'
     * @private
     * @param {event_string} 'Event'
     * @param {object} 'Listener'
     * @param {function} 'Handler'
     * @param {object} {optional} 'Dispatcher' | If dispatcher is null, your listener will listen to everyone.
     * Private function to handle both of the Listen / ListenOnce methods. 
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
     * 'Mute'
     * @static
     * @param {event_string} 'Event'
     * @param {object} 'Listener'
     * You can use the Listener.Mute() method to remove an event listener that you no longer need. 
     * It is a good idea to remove any listeners that will no longer be used to prevent memory leaks from happening.
     */
    p.Mute = function (event, listener) {
        var index = this._getListenerIndex(event, listener);
        if (index === -1) throw "Can't remove. Index is -1";

        this._listeners[event].splice(index, 1);    
    };

    /**
     * 'MuteAll'
     * @static
     * @param {object} 'Listener'
     * You can use the Listener.MuteAll() method to remove all event listeners from the object. 
     * Warning: Don't use this if you don't know what you're doing. It's better to mute them individually than to mute it all.
     * This function is mostly used on the end of a dispose function!
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
     * 'Dispatch'
     * @static
     * @param {event_string} 'Event'
     * @param {object} 'caller'
     * @param {{}}  {optional} 'arguments'
     * @param {boolean} {optional} 'call_when_debug' | If you have debug mode on, you will console the dispatch.
     * The Listener.Dispatch() method can be used to dispatch a custom event object into the event flow.
     */
    p.Dispatch = function (event, caller, arguments, call_when_debug) {
        var listeners = this._getListenersByEvent(event);
        if ( call_when_debug ) call_when_debug = true; // Placeholder for the debug call.
        if ( typeof event === "undefined" ) throw "Event is undefined!";

        var len = listeners.length;
        for (var i = len - 1; i >= 0; i--) {
            var current = listeners[i];

            var listen_to_all = (current.dispatcher === null);
            if ( listen_to_all || caller === current.dispatcher ) {
                if ( current.once ) {
                    this.Mute( current.event, current.listener );
                }

                current.handler(caller, arguments);
            }
        }
    };

    /**
     * 'HasListenerAddedEvent'
     * @private
     * @returns {Boolean}
     * @param {object} 'listener'
     * @param {event_string} 'event'
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
     * 'GetListenersByEvent'
     * @private
     * @returns {Object}
     * @param {event_string} 'event'
     */
    p._getListenersByEvent = function (event) {
        return this._listeners[event] || [];
    };

    /**
     * 'GetListenerIndex'
     * @private
     * @returns {int}
     * @param {Object} 'listener'
     * @param {event_string} 'event'
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
     * 'GetListenerIndexes'
     * @private
     * @returns {int[]}
     * @param {Object} 'listener'
     * @param {event_string} 'event'
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