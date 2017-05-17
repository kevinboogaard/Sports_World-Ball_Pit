var net = net || { session: null };

net.ADServer = (function () {
    'use strict';

    function ADServer(url) {
        net.Post.call(this, url);
        this.baseURL = gridForce.BASE_URL;
    };

    ADServer.prototype = Object.create(net.Post.prototype);
    ADServer.prototype.constructor = ADServer;
    var p = ADServer.prototype;

    p.onComplete = function (response, textStatus, request) {
        var sessionID = response.session;
        if (sessionID != null) { net.sessionID = sessionID; };
        if ( this.callback ) this.callback.call( null, response );
        else this.defaultCallback.call( null, response );
    };

    p.__send = p.send;
    p.send = function (params, callback) {
        /*
        if ( params && net.sessionID != null ) {
            params.session = net.sessionID;
        }
        else 
        */
        if (net.sessionID != null) {
            this.beforeSend = function (request) { request.setRequestHeader("session", net.sessionID); }
        }
        this.__send( params, callback );
    };

    p.__defaultCallback = p.defaultCallback;
    p.defaultCallback = function ( response ) {
        console.log( "GF, response for: " + this.url + " \n Response: " + response );
    };


    p.__onError = p.onError;
    p.onError = function ( xhr, textStatus, errorThrown ) {
        this.__onError();
    };

    return ADServer;
})();