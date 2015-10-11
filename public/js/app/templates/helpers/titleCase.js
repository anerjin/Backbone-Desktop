define(['handlebars'], function ( Handlebars ){

    function titleCase( context, options ) {
        return context.trim()[0].toUpperCase() + context.trim().substring(1);
    }

    Handlebars.registerHelper( 'titleCase', titleCase );

    return titleCase;
});