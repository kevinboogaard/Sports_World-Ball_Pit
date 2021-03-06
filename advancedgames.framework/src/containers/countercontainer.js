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
 */
ADCore.Event = ADCore.Event || {};

/**
 * @event ON_COUNTER_ADD
 * @memberof Event
 */
ADCore.Event.ON_COUNTER_ADD = "on_counter_add";

/**
 * @event ON_COUNTER_REMOVE
 * @memberof Event
 */
ADCore.Event.ON_COUNTER_REMOVE = "on_counter_remove";

ADCore.CounterContainer = (function() {
    
    /**
     * This is a container for all the timers / stopwatchers in the game. 
     * This container is there to update all the timers/stopwatchers.
     * 
     * @class CounterContainer
     * @constructor
     */
    function CounterContainer(){
        
        /**
         * @property {Array} _Counters
         * @private
         */
        this._counters = [];

        Listener.Listen(ADCore.Event.ON_COUNTER_ADD, this, this._onCounterAdd.bind(this));
        Listener.Listen(ADCore.Event.ON_COUNTER_REMOVE, this, this._onCounterRemove.bind(this));
    } 
    var p = CounterContainer.prototype;

    /**
     * @method Update
     * @memberof CounterContainer
     * @public
     * @param {Number} deltaTime
     */
    p.Update = function (deltaTime) {
        var len = this._counters.length;
        for (var i = len - 1; i >= 0; i--) {
            var counter = this._counters[i];
            counter.Update(deltaTime);
        }
    };

    /**
     * @method AddCounter
     * @memberof CounterContainer
     * @public
     * @param {Number} counter
     */
    p.AddCounter = function (counter) {
        this._counters.push(counter);
    };

    /**
     * @method RemoveCounter
     * @memberof CounterContainer
     * @public
     * @param {Number} counter
     */
    p.RemoveCounter = function(counter) {
        var index = this._counters.indexOf(counter);
        this._counters.splice(index, 1);
    };

    /**
     * @method _OnCounterAdd
     * @memberof CounterContainer
     * @private 
     * @param {Object} caller
     * @param {Object} params
     * @param {Object} params.counter
     * @ignore
     */
    p._onCounterAdd = function(caller, params) {
        this.AddCounter(params.counter);
    };

    /**
     * @method _OnCounterRemove
     * @memberof CounterContainer
     * @private 
     * @param {Object} caller
     * @param {Object} params
     * @param {Object} params.counter
     * @ignore
     */
    p._onCounterRemove = function(caller, params) {
        this.RemoveCounter(params.counter);
    };

    /**
     * @method Dispose
     * @memberof CounterContainer
     * @public
     */
    p.Dispose = function () {
        delete this._counters;
    };

    return CounterContainer;
})();