define(['handlebars'], function ( Handlebars ){

    function abs ( context, options ) {

        if(!isNaN(context)){
            return Math.abs(context);
        }
        return context;
    }

    Handlebars.registerHelper( 'abs', abs );

    return abs;
});