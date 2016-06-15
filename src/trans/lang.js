;
define([
    "G4/utils",
    "./lang-mapper",
    "storage/local"
], function(
    Utils,
    LangMapper,
    LocalStorage
){

    var Lang = function() {};

    Lang.prototype = {

        key: 'ND|LANG',

        get: function (callback)
        {
            this.hasLocal() ?
                callback(this.getLocal()) :
                this.getRemote(callback);

        },

        getRemote: function(callback)
        {
            new LangMapper("remote").
                get().
                success(this.onRemoteGet.bind(this, callback)).
                error(this.onError.bind(this, callback));
        },

        getLocal: function()
        {
             return LocalStorage.get(this.key);
        },

        onError: function(callback)
        {
            LocalStorage.set(this.key, {});
            callback({});
        },

        onRemoteGet: function(callback, data)
        {
            LocalStorage.set(this.key, data);
            callback(data);
        },

        hasLocal: function()
        {
            return LocalStorage.has(this.key);
        },

        exists: function()
        {
            return SITE_VARIABLES != undefined &&
                SITE_VARIABLES.LANGUAGE_PATH != undefined;
        }

    };


    return Lang;
});