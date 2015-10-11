define(['handlebars'], function ( Handlebars ){

    function eachProperty(context, options) {
        var ret = "";
        for(var prop in context)
        {
            ret = ret + options.fn({property:prop, value:context[prop]});
        }
        return ret;
    }

    Handlebars.registerHelper( 'eachProperty', eachProperty );

    return eachProperty;
});