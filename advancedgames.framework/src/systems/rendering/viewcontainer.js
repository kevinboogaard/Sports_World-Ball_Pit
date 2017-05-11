var ADCore = ADCore || {};

ADCore.Event = ADCore.Event || {};
ADCore.Event.ON_MODEL_ADD = "on_model_add";
ADCore.Event.ON_MODEL_REMOVE = "on_model_remove";

ADCore.Event.ON_LOWER_MODEL_ADD = "on_lower_model_add";
ADCore.Event.ON_LOWER_MODEL_REMOVE = "on_lower_model_remove";

ADCore.ViewContainer = (function () {

     /**
     * 'Viewcontainer'
     *  @extends {Phaser.Group}
     */
    function ViewContainer() {
        Phaser.Group.call(this, ADCore.phaser, null, "ViewContainer");
        
        this._views = new Phaser.Group( ADCore.phaser, null, "Views");
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
     * 'render'
     */
    p.render = function () {
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

        this._views.sort( "y", Phaser.Group.SORT_ASCENDING );
    };

     /**
     * '_onModelAdd '
     *  @private
     * @param {caller} 'name', 
     * @param {params} 'params'
     */
    p._onModelAdd = function ( caller, params ) {
        var view = new params.viewtype( params.model, params.key );
        this._views.addChild( view );
    };

     /**
     * '_onLowerModelAdd '
     *  @private
     * @param {caller} 'name', 
     * @param {params} 'params'
     */
    p._onLowerModelAdd = function ( caller, params ) {
        var view = new params.viewtype( params.model, params.key );
        this._lowerviews.addChild( view );
    };

     /**
     * '_onModelRemove '
     *  @private
     * @param {caller} 'name', 
     * @param {params} 'params'
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
     * '_onLowerModelRemove '
     *  @private
     * @param {caller} 'name', 
     * @param {params} 'params'
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
     * 'dispose'
     */
    p.Dispose = function () {
        Listener.Mute( ADCore.Event.ON_MODEL_ADD, this );
        Listener.Mute( ADCore.Event.ON_MODEL_REMOVE, this );
        Listener.Mute( ADCore.Event.ON_LOWER_MODEL_ADD, this );
        Listener.Mute( ADCore.Event.ON_LOWER_MODEL_REMOVE, this );

        this.removeChild(this._views);
        delete this._views;

        this.removeChild(this._lowerviews);
        delete this._lowerviews;
    };

    return ViewContainer;
}());