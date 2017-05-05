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

/**
 * @event ON_MODEL_ADD
 * @memberof ADCore.Event
 * @param {T} model 
 * @param {string} key 
 */
ADCore.Event.ON_MODEL_ADD = "on_model_add";

/**
 * @event ON_MODEL_REMOVE
 * @memberof ADCore.Event
 * @param {T} model 
 * @param {string} key 
 */
ADCore.Event.ON_MODEL_REMOVE = "on_model_remove";

/**
 * @event ON_LOWER_MODEL_ADD
 * @memberof ADCore.Event
 * @param {T} model 
 */
ADCore.Event.ON_LOWER_MODEL_ADD = "on_lower_model_add";

/**
 * @event ON_LOWER_MODEL_REMOVE
 * @memberof ADCore.Event
 * @param {T} model 
 */
ADCore.Event.ON_LOWER_MODEL_REMOVE = "on_lower_model_remove";

ADCore.ViewContainer = (function () {

    /**
     * Container of all the views in game. 
     * This class renders and depthsorts all the views in game. Follows the MVC-pattern.
     * It is important to construct this class at the beginning of a scene before any models are made.
     * Add this as a child to a scene so that all the views in-game are visible.
     * There are two type of groups in the container: Normal groups and the Lower groups.
     * The lower groups isn't depthsorted. This functionality is great for background images and/or tiles.
     *
     * @class ViewContainer
     * @constructor
     * @extends {Phaser.Group}
     */
    function ViewContainer() {
        Phaser.Group.call(this, ADCore.phaser, null, "ViewContainer");
        
        /**
        * @property {Phaser.Group} views - Normal group of views.
        * @private
        */
        this._views = new Phaser.Group( ADCore.phaser, null, "Views");

        /**
        * @property {Phaser.Group} views - Lower group of views.
        * @private
        */
        this._lowerviews = new Phaser.Group( ADCore.phaser, null, "LowerViews");

        this.addChild( this._lowerviews );
        this.addChild( this._views );

        Listener.Listen( ADCore.Event.ON_MODEL_ADD, this, this._onModelAdd.bind( this ) );
        Listener.Listen( ADCore.Event.ON_MODEL_REMOVE, this, this._onModelRemove.bind( this ) );

        Listener.Listen( ADCore.Event.ON_LOWER_MODEL_ADD, this, this._onLowerModelAdd.bind( this ) );
        Listener.Listen( ADCore.Event.ON_LOWER_MODEL_REMOVE, this, this._onLowerModelRemove.bind( this ) );
    }
    ViewContainer.prototype = Object.create(Phaser.Group.prototype);
    ViewContainer.prototype.constructor = ViewContainer;
    var p = ViewContainer.prototype;

    /**
     * Call this function to render all the views in the scene.
     * The lower views are rendered before the normal views.
     * 
     * @method Render
     * @memberof ViewContainer
     * @public 
     */
    p.Render = function () {
        var l_len = this._lowerviews.children.length;
        for ( var i = 0; i < l_len; i++ ) {
            var l_view = this._lowerviews.children[i];
            l_view.Render();
        }

        var v_len = this._views.children.length;
        for ( var j = 0; j < v_len; j++ ) {
            var v_view = this._views.children[j];
            v_view.Render();
        }
    };

     /**
     * @method OnModelAdd
     * @memberof ViewContainer
     * @private
     * @param {Object} caller -  Dispatcher of the event.
     * @param {Object} params - The given parameters.
     * @param {T} params.model - Model of the view being added.
     * @param {string} params.key - Key of the sprite that the view needs.
     */
    p._onModelAdd = function ( caller, params ) {
        var view = new params.viewtype( params.model, params.key );
        this._views.addChild( view );
    };

     /**
     * @method OnLowerModelAdd
     * @memberof ViewContainer
     * @private
     * @param {Object} caller -  Dispatcher of the event.
     * @param {Object} params - The given parameters.
     * @param {T} params.model - Model of the view being added.
     * @param {string} params.key - Key of the sprite that the view needs.
     */
    p._onLowerModelAdd = function ( caller, params ) {
        var view = new params.viewtype( params.model, params.key );
        this._lowerviews.addChild( view );
    };
  
     /**
     * @method OnModelRemove
     * @memberof ViewContainer
     * @private
     * @param {Object} caller -  Dispatcher of the event., 
     * @param {Object} params - The given parameters.
     * @param {T} params.model - Model of the view being removed.
     */
    p._onModelRemove = function ( caller, params ) {
        var views_children = this._views.children;
        var len = views_children.length;

        for ( var i = 0; i < len; i++ ) {
            var view = views_children[i];
            var model = view.model;

            if ( model === params.model ) {
                this._views.removeChild( view );
                view.Dispose();

                break;
            }
        }
    };
    
     /**
     * @method OnLowerModelRemove
     * @memberof ViewContainer
     * @private
     * @param {Object} caller -  Dispatcher of the event., 
     * @param {Object} params - The given parameters.
     * @param {T} params.model - Model of the view being removed.
     */
    p._onLowerModelRemove = function ( caller, params ) {
        var views_children = this._lowerviews.children;
        var len = this._lowerviews.length;

        for ( var i = 0; i < len; i++ ) {
            var view = views_children[i];
            var model = view.model;

            if ( model === params.model ) {
                this._lowerviews.removeChild( view );
                view.Dispose();

                break;
            }
        }
    };

    /**
     * Dispose the ViewContainer. Use this method to clean the ViewContainer and the views in order to avoid memory leaks.
     *
     * @method Dispose
     * @memberof ViewContainer
     * @public
     */
    p.dispose = function () {
        throw new Error( "NO DISPOSE WRITTEN YET !" );
    };

    return ViewContainer;
}());