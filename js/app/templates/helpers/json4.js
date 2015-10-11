define(['handlebars'], function ( Handlebars ){

    function json4 ( context, options){
        return JSON.stringify(context, null, 4);
    }

    Handlebars.registerHelper( 'json4', json4 );

    return json4;

});
