;
define([
    "jsmapper/mapper"
], function(MapperAbstract){

    var Mapper = function(adapter) {
        this.adapter = adapter;
    };

    Mapper.prototype = {

        resourceName: SITE_VARIABLES.LANGUAGE_PATH

    };

    $.extend(Mapper.prototype, new MapperAbstract());

    return Mapper;
});