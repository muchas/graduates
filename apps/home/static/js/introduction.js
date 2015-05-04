Marionette.Region.prototype.attachHtml = function(view){
  this.$el.html(view.el);
};

App.Application = Marionette.Application.extend({
    initialize: function (options) {}
});


App.loader = {
  init: function(el) {
    this.$el = $(el);
    this.$el.hide();
  },

  show: function() {},
  hide: function() {}
};

App.layout = new App.Layouts.IntroductionRootLayout();
App.instance = new App.Application();
App.instance.start();
App.instance.vent.on("sync/init", function (displayIntroductionWizard) {

//    $(".preloader").remove();
//    $("#app").show();

//    App.instance.topBar.show(new App.Layouts.TopBar());

    new App.Router.IntroductionRouter();

    new App.Command.Profile();
    new App.Command.Attribute();
    new App.Command.Employment();
    new App.Command.University();
    new App.Command.City();
    new App.Command.Community();

    Backbone.history.start();
});

App.instance.vent.trigger("sync/init");