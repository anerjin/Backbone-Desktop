define(["jquery", "backbone", "models/Model", "text!templates/desktop.html", "workers/DesktopWorker"],
    function($, Backbone, Model, template, DesktopWorker) {

        var Desktop = Backbone.View.extend({

            // The DOM Element associated with this view
            el: "#page",

            // View constructor
            initialize: function() {

                // Calls the view's render method
                this.render();

                // this.loadIcons();

                this.$el.find('.desktop-wrap').selectable({
                    filter: "a"
                });

                this.desktopWorker = new DesktopWorker({view: this});

                // this.desktopWorker.addIconToDesktop('newWindow');

                // this.desktopWorker.addWindow();
            },

            // View Event Handlers
            events: {
                'click a': 'handleAnchor',
                // 'mousedown a.menu_trigger': 'handleMenuTrigger',
                'mouseenter div.window': 'draggableWindow', // make window draggable
                'mousedown div.window': 'mouseOnWindow', // Focus active window.
                'dblclick a.icon': 'doubleClickIcon',
                'mousedown a.icon': 'highlightIcon',
                'mouseenter a.icon': 'makeIconDraggable',
                'mouseenter a.menu_trigger': 'transferFocus',
                // 'click #dock a': 'taskbar',
                // 'dblclick div.window_top': 'fullscreen',
                // 'click a.window_min': 'minimizeWindow',
                // 'click a.window_resize': 'resizeWindow',
                // 'click a.window_close': 'closeWindow',
                'mousedown #show_desktop': 'showDesktop',
                'click .drawer-icon': 'showDrawer'
            },

            handleAnchor: function(ev) {
                var target = $(ev.target).closest('a');
                // var url = target.attr('href');
                target.blur();

                // if (url.match(/^#/)) {
                    ev.preventDefault();
                    ev.stopPropagation();
                // } else {
                    // target.attr('target', '_blank');
                // }
            },

            // handleMenuTrigger: function(ev) {
            //     var target = $(ev.target).closest('a.menu_trigger');
            //     if (target.next('ul.menu').is(':hidden')) {
            //         this.clear_active();
            //         target.addClass('active').next('ul.menu').show();
            //     } else {
            //         this.clear_active();
            //     }
            // },

            mouseOnWindow: function(ev){
                var target = $(ev.target).closest('div.window');
                this.window_flat();
                target.addClass('window_stack');
            },

            draggableWindow: function(ev) {
                var target = $(ev.target).closest('div.window');
                target.off('mouseenter').draggable({
                    cancel: 'a',
                    containment: 'parent', // Confine to desktop.
                    handle: 'div.window-top' // Movable via top bar only.
                }).resizable({
                    containment: 'parent',
                    minWidth: 400,
                    minHeight: 200
                });
            },

            showDrawer: function(ev) {
                var self = this;
                self.$el.find('.drawer-icon').toggleClass('button-active');
            },

            doubleClickIcon: function(ev) {
                var self = this;
                var target = $(ev.target).closest('a.icon');

                self.desktopWorker.addWindow(target.attr('icon-type'));
                // Get the link's target.
                // var x = target.attr('href');
                // var y = self.$el.find(x).find('a').attr('href');

                // // Show the taskbar button.
                // if (self.$el.find(x).is(':hidden')) {
                //     self.$el.find(x).remove().appendTo('#dock');
                //     self.$el.find(x).show('fast');
                // }

                // Bring window to front.
                this.window_flat();
                // self.$el.find(y).addClass('window_stack').show();
            },

            highlightIcon: function(ev) {
                var target = $(ev.target).closest('a.icon');


                // Highlight the icon.
                this.clear_active();
                target.addClass('active');
            },

            transferFocus: function(ev) {
                var self = this;
                var target = $(ev.target).closest('a.menu_trigger');
                if (self.$el.find('ul.menu').is(':visible')) {
                    this.clear_active();
                    target.addClass('active').next('ul.menu').show();
                }
            },

            taskbar: function(ev){
                var self = this;
                var target = $(ev.target).closest('#dock a');
                // Get the link's target.
                var x = self.$el.find(target.attr('href'));

                // Hide, if visible.
                if (x.is(':visible')) {
                    x.hide();
                } else {
                    // Bring window to front.
                    this.window_flat();
                    x.show().addClass('window_stack');
                }
            },

            showDesktop: function(ev) {
                var self = this;
                // If any windows are visible, hide all.
                if (self.$el.find('div.window:visible').length) {
                    self.$el.find('div.window').hide();
                } else {
                    var target = $(ev.target).closest('#show_desktop');
                    // Otherwise, reveal hidden windows that are open.
                    self.$el.find('#dock li:visible a').each(function() {
                        $($(this).attr('href')).show();
                    });
                }
            },

            clear_active: function() {
                var self = this;
                self.$el.find('a.active').removeClass('active');
            },

            window_flat: function() { // Zero out window z-index.
                this.$el.find('div.window').removeClass('window_stack');
            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

        return Desktop;

    }

);