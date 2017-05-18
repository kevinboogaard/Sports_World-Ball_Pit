/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var net = net || { session: null };

net.Post = (function () {
	"use strict";
	
    /**
     * @class Post
     * @constructor 
     * @param {String} url
     */
	function Post( url ) {
        /**
         * @property {String} _BaseURL
         * @private
		 * @default "http://localhost:8080"
         */
	    this._baseURL = "http://localhost:8080";

        /**
         * @property {String} _Url
         * @private
         */
	    this._url = url;

        /**
         * @property {String} _BeforeSend
         * @private
         */
        this._beforeSend = null;
	};
	var p = Post.prototype;

    /**
     * @method Send
     * @memberof Post
     * @public
	 * @param {Object} params 
	 * @param {Function} callback
     */
	p.Send = function ( params, callback ) {
	    if (typeof callback !== "undefined") this.callback = callback;

	    var data = {
	        type: "POST",
	        url: this._baseURL + this._url,
	        data: params,
	        success: this._onComplete.bind(this),
	        error: this._onError.bind(this)
	    };

	    if( this._beforeSend != null ) data.beforeSend = this._beforeSend;
	    $.ajax(data);
	};
	
    /**
     * @method _DefaultCallback
     * @memberof Post
     * @private
	 * @param {String} Response
     */
	p._defaultCallback = function ( response ) {
	    Debug.LogError("The default server response for: " + this._url + " \n Response: " + response );
	};
	
    /**
     * @method _OnComplete
     * @memberof Post
     * @private
	 * @param {String} Response
	 * @param {String} TextStatus
	 * @param {Object} Request
     */
	p._onComplete = function ( response, textStatus, request ) {
	    if (this.callback) this.callback.call( null, response );
	    else this.defaultCallback.call( null, response );
	}

    /**
     * @method _OnError
     * @memberof Post
     * @private
	 * @param {Object} Xhr
	 * @param {String} TextStatus
	 * @param {String} ErrorThrown
     */
	p._onError = function ( xhr, textStatus, errorThrown ) {
		if ( this.timeoutId ) clearTimeout( this.timeoutId );
		if ( this.callback ) this.callback.call( null, { "success": false, "error": "Error: " + xhr.status + ". Something went wrong. Please try again later." } );
		this.Cancel();
	}
	
    /**
     * @method Cancel
     * @memberof Post
     * @public
     */
	p.Cancel = function () {
		this._url = null;
		this.params = null;
		this.callback = null;
		clearTimeout( this.timeoutId );
	}
	
	return Post;
})();