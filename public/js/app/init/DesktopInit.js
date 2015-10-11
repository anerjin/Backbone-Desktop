// DesktopInit.js
// --------------

// Includes Desktop Specific JavaScript files here (or inside of your Desktop router)
require(["jquery", "backbone", "routers/DesktopRouter", "jqueryui", "underscore", "handlebars"],

  function($, Backbone, DesktopRouter, jqueryui, _, handlebars) {

    _.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };
    // Instantiates a new Desktop Router instance
    new DesktopRouter();

  }

);