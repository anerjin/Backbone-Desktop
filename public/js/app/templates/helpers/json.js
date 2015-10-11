define(['handlebars'], function ( Handlebars ){
    function json ( context, options ) {
        return JSON.stringify(context);
    }

    Handlebars.registerHelper( 'json', json );

    return json;
});
