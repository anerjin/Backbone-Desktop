define(["jquery", "backbone", "views/Window"],
    function($, Backbone, Window) {

        // a worker here is a model, a view should delegate work to a worker
        return Backbone.Model.extend({

            initialize: function(options) {
                var self = this;
                // var iconsToLoad = [{
                //     'blank': {
                //         load: true
                //     }
                // }];

                if(!options || !options.view){
                    throw new Error("Need to set view on worker!");
                }

                self.iconPos = {left: 0, top: 0, column: 0};

                self.view = options.view;

                self.view.$el.find('.desktop-wrap');

                for(var i=0; i<5; i++){
                    self.addIconToDesktop('newWindow');
                    self.addIconToDesktop('Computer');
                    self.addIconToDesktop('Network');
                    self.addIconToDesktop('News');
                    self.addIconToDesktop('Hard Drive');
                    self.addIconToDesktop('Audio CD');
                }
            },

            addWindow: function(windowName){
                var self = this;
                var newDiv = $('<div/>', {"class": 'abs window'});

                newDiv.appendTo(self.view.$el.find('.desktop-wrap'));

                var newWindow = new Window({
                    icon: "images/icons/icon_32_computer.png",
                    windowTitle: windowName,
                    windowSide: "Side contents",
                    windowMain: "Main Contents",
                    windowBottom: "bottom bar",
                    windowId: "1"
                });

                newWindow.setElement(newDiv).render();
            },

            addIconToDesktop: function(iconName){
                // save preferences
                var self = this;
                var randomId = (iconName+ Math.ceil(Math.random() * 10000)).split(/\s+/).join('');
                var desktopWrap = self.view.$el.find('.desktop-wrap');

                var injectCommon = function(){
                    return 'class="abs icon" style="left:'+self.iconPos.left+'px;top:'+self.iconPos.top+'px;" icon-type="'+iconName+'" id="'+randomId+'"';
                };

                switch(iconName){
                    case 'newWindow':
                        desktopWrap.append('<a '+injectCommon()+'><img src="images/icons/news.png" /><span>'+iconName+'</span></a>');
                        break;
                    case 'Computer':
                        desktopWrap.append('<a '+injectCommon()+'><img src="images/icons/icon_32_computer.png" /><span>'+iconName+'</span></a>');
                        break;
                    case 'Network':
                        desktopWrap.append('<a '+injectCommon()+'><img src="images/icons/icon_32_network.png" /><span>'+iconName+'</span></a>');
                        break;
                    case 'News':
                        desktopWrap.append('<a '+injectCommon()+'><img src="images/icons/news.png" /><span>'+iconName+'</span></a>');
                        break;
                    case 'Hard Drive':
                        desktopWrap.append('<a '+injectCommon()+'><img src="images/icons/icon_32_drive.png" /><span>'+iconName+'</span></a>');
                        break;
                    case 'Audio CD':
                        desktopWrap.append('<a '+injectCommon()+'><img src="images/icons/icon_32_disc.png" /><span>'+iconName+'</span></a>');
                        break;
                }
                self.makeIconDraggable(randomId);
                // console.log((Math.round(self.iconPos.top % (window.innerHeight - 200)  / 100)) * 100)
                // self.iconPos.top = (( (Math.round(self.iconPos.top % (window.innerHeight - 200)  / 100)) * 100) + 100);
                self.iconPos.top += 100;

                if(self.iconPos.top > window.innerHeight - 250){
                    self.iconPos.top = 0;
                    self.iconPos.column++;
                }

                self.iconPos.left = 100 * self.iconPos.column;

            },

            makeIconDraggable: function(id) {
                var selected, self = this;
                console.log(id, self.view.$el.find(id));
                self.view.$el.find("#"+id).draggable({
                    revert: false,
                    containment: 'parent',
                    start: function(ev, ui) {
                        console.log('this', $(this));
                        if ($(this).hasClass("ui-selected")){
                            selected = self.view.$el.find(".ui-selected").not(this).each(function() {
                               var el = $(this);
                               el.data("offset", el.offset());
                            });
                            console.log('selected', selected);
                        }  else {
                            console.log('else');
                            selected = $([]);
                            self.view.$el.find(".ui-selected").removeClass("ui-selected");
                        }
                        offset = $(this).offset();
                    },
                    drag: function(ev, ui) {
                        var dt = ui.position.top - offset.top, dl = ui.position.left - offset.left;
                        if(!selected){
                            console.log('none selected');
                            return;
                        }
                        // take all the elements that are selected expect $("this"), which is the element being dragged and loop through each.
                        selected.not(this).each(function() {
                            // create the variable for we don't need to keep calling $("this")
                            // el = current element we are on
                            // off = what position was this element at when it was selected, before drag
                            var el = $(this), off = el.data("offset");
                            if(off.left > window.innerWidth){
                                off.left = window.innerWidth - 100;
                            }
                            if(off.top > window.innerHeight){
                                off.top = window.innerHeight - 100;
                            }
                            el.css({top: off.top + dt, left: off.left + dl});
                        });
                    }
                });
            },

            removeIconFromDesktop: function(){
                // save preferences
            },

            onIconDoubleClick: function(){
                // launch new window
            }

        });

    }

);
