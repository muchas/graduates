App.Application = Marionette.Application.extend({

    initialize: function (options) {},

    showOnlyForAuthenticatedUser: function (renderer) {
        if (App.syncManager.isAuthenticated && App.syncManager.isConfigured) {
            renderer();
        }
        else if (App.syncManager.isAuthenticated && !App.syncManager.isConfigured) {
            Backbone.history.navigate("/configuration", true);
        }
        else {
            App.instance.content.show(new App.Layouts.AccessDenied());
        }
    },

    showOnlyForNotConfiguredUser: function (renderer) {
        if (App.syncManager.isAuthenticated && !App.syncManager.isConfigured) {
            renderer();
        }
        else {
            App.instance.content.show(new App.Layouts.AccessDenied());
        }
    }

});

App.layout = new App.Layouts.RootLayout();
App.instance = new App.Application();
App.instance.start();
App.instance.vent.on("sync/init", function (displayIntroductionWizard) {

//    $(".preloader").remove();
//    $("#app").show();

//    App.instance.topBar.show(new App.Layouts.TopBar());

    new App.Router.ProfileRouter();
    new App.Router.CommunityRouter();
    new App.Router.DiscussionRouter();

    new App.Command.Profile();
    new App.Command.Description();
    new App.Command.Attribute();
    new App.Command.Employment();
    new App.Command.University();
    new App.Command.City();
    new App.Command.Community();

    Backbone.history.start();

    if (displayIntroductionWizard) {
        Backbone.history.navigate("/introduction", true);
    }
});

App.instance.vent.trigger("sync/init", false);
