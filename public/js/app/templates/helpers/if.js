define(['handlebars'], function ( Handlebars ){

    function iff(conditional, options) {

        if(conditional) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    }

    Handlebars.registerHelper( 'if', iff );

    return iff;
});