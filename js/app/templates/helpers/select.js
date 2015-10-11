define(['handlebars', 'jquery'],
	function ( Handlebars, $ ){
	    var selectFunct = function( value, options ){
		    var $el = $('<select />').html( options.fn(this) );
		    $el.find('[value="' + value + '"]').attr({'selected':'selected'});
		    return $el.html();
		};

	    Handlebars.registerHelper( 'select', selectFunct );

	    return selectFunct;
	}
);