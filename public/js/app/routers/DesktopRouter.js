// DesktopRouter.js
// ----------------
define(["backbone", "../views/Desktop"],

    function(Backbone, Desktop) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index"

            },

            index: function() {

                // Instantiates a new view which will render the desktop
                new Desktop();

            }

        });

        // Returns the DesktopRouter class
        return DesktopRouter;

    }

);