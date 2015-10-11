// Require.js Configurations
// -------------------------
require.config({

  // Sets the js folder as the base directory for all future relative paths
  baseUrl: "./js/app",

  paths: {

      // Core Libraries
      // --------------
      "jquery": "../libs/jquery",

      "jqueryui": "../libs/jqueryui",

      // "underscore": "../libs/lodash",
      "underscore": "../libs/underscore",

      "backbone": "../libs/backbone",

      // Plugins
      // -------
      "text": "../libs/plugins/text",

      "jasminejquery": "../libs/plugins/jasmine-jquery",

      "handlebars": "../libs/handlebars",

      "hbs": "../libs/hbs",

      "json3": "../libs/json3.min"

  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

      // jQueryUI
      "jqueryui": ["jquery"],

      // Jasmine-jQuery plugin
      "jasminejquery": ["jquery"],

      // //Handlebars
      // "handlebars":{
      //     "exports":"Handlebars"
      // },

      "hbs": ['handlebars']

  },
  // hbs config - must duplicate in Gruntfile.js Require build
  hbs: {
      templateExtension: "html",
      helperDirectory: "templates/helpers/",
      compileOptions: {}        // options object which is passed to Handlebars compiler
  }

});