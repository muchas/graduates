App.Router.IntroductionRouter = Marionette.AppRouter.extend({
    controller: App.Controller.IntroductionController,
    appRoutes: {
        "": "showGraduates",
        "you": "editUserProfile"
    }
});