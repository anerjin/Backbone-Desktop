define(["backbone", "models/Model", "text!templates/window.html", "handlebars"],

    function(Backbone, Model, template, Handlebars) {

        return Backbone.View.extend({

            className: "abs-window",

            tagName: 'div',

            initialize: function(options) {

                this.model = new Model();

                this.model.set('icon', options.icon);
                this.model.set('windowTitle', options.windowTitle);
                this.model.set('windowSide', options.windowSide);
                this.model.set('windowMain', options.windowMain);
                this.model.set('windowBottom', options.windowBottom);
                this.model.set('windowId', options.windowId);

                this.render();
            },


            events: {
                'click window-min': 'minimizeWindow',
                "click .window-resize": "resizeWindow",
                'click .window-close': 'closeWindow',
                'dblclick .window-top': 'resizeWindow'
            },

            minimizeWindow: function(ev) {
                var self = this;
                self.$el.closest('div.window').hide();
                // target.hide();
                // notify bottom bar of minimized state
            },

            resizeWindow: function(){
                var self = this;

                var win = self.$el.closest('div.window');

                // Is it maximized already?
                if (win.hasClass('window_full')) {
                    // Restore window position.
                    win.removeClass('window_full').css({
                        'top': win.attr('data-t'),
                        'left': win.attr('data-l'),
                        'right': win.attr('data-r'),
                        'bottom': win.attr('data-b'),
                        'width': win.attr('data-w'),
                        'height': win.attr('data-h')
                    });
                } else {
                    win.attr({
                        // Save window position.
                        'data-t': win.css('top'),
                        'data-l': win.css('left'),
                        'data-r': win.css('right'),
                        'data-b': win.css('bottom'),
                        'data-w': win.css('width'),
                        'data-h': win.css('height')
                    }).addClass('window_full').css({
                        // Maximize dimensions.
                        'top': '0',
                        'left': '0',
                        'right': '0',
                        'bottom': '0',
                        'width': '100%',
                        'height': '100%'
                    });
                }
            },

            closeWindow: function(ev) {
                var self = this;
                var target = $(ev.target).closest('a.window_close');
                target.closest('div.window').hide();
                self.remove();
                // $(target.attr('href')).hide('fast');

                // notify bottom bar of closed state
            },

            // Renders the view's template to the UI
            render: function() {

                var temp = Handlebars.compile(template);
                temp = temp(this.model.toJSON());

                // Dynamically updates the UI with the view's template
                this.$el.html(temp);

                this.$el.show();

                return this;

            }

        });

    }

);