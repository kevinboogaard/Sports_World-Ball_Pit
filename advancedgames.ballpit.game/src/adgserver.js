/**
 * @author      Kevin Boogaard <{@link http://www.kevinboogaard.com/}>
 * @author      Alex Antonides <{@link http://www.alex-antonides.com/}>
 * @license     {@link https://github.com/kevinboogaard/Sports_World-Ball_Pit/blob/master/LICENSE}
 * @ignore
 */
var net = net || { session: null };

net.ADServer = (function () {
    'use strict';

    /**
     * @class ADServer
     * @extends Post
     * @constructor 
     * @param {String} url
     */
    function ADServer(url) {
        net.Post.call(this, url);

        /**
         * @property {String} _BaseURL
         * @private
		 * @default environment.BASE_URL;
         */
        this._baseURL = ballpit.BASE_URL;
    }
    ADServer.prototype = Object.create(net.Post.prototype);
    ADServer.prototype.constructor = ADServer;
    var p = ADServer.prototype;

    /**
     * @method Send
     * @memberof ADServer
     * @public
	 * @param {Object} params 
	 * @param {Function} callback
     */
    p.__send = p.Send;
    p.Send = function (params, callback) {
        if (net.sessionID != null) {
            this.beforeSend = function (request) { request.setRequestHeader("session", net.sessionID); }
        }
        this.__send( params, callback );
    };

    /**
     * @method _OnComplete
     * @memberof ADServer
     * @private
	 * @param {String} Response
	 * @param {String} TextStatus
	 * @param {Object} Request
     */
	p._onComplete = function ( response, textStatus, request ) {
        var sessionID = response.session;
        if (sessionID != null) { net.sessionID = sessionID; };
        if ( this.callback ) this.callback.call( null, response );
        else this.defaultCallback.call( null, response );
    };

    /**
     * @method _DefaultCallback
     * @memberof ADServer
     * @private
	 * @param {String} Response
     */
    p.__defaultCallback = p.DefaultCallback;
    p.DefaultCallback = function ( response ) {
        Debug.Log( "The ADServer response for: " + this._url + " \n Response: " + response );
    };

    /**
     * @method _OnError
     * @memberof ADServer
     * @private
	 * @param {Object} Xhr
	 * @param {String} TextStatus
	 * @param {String} ErrorThrown
     */
    p.__onError = p.OnError;
    p.OnError = function ( xhr, textStatus, errorThrown ) {
        this.__onError();
    };

    return ADServer;
})();

net.GET_HIGHSCORES  = new net.ADServer( 'GetHighscores');
net.SAVE_HIGHSCORE  = new net.ADServer( 'SaveHighscoreFromPost');