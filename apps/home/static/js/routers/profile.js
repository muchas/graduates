App.Router.ProfileRouter = Marionette.AppRouter.extend({
    controller: App.Controller.ProfileController,
    appRoutes: {
        "person/:id": "showPerson",
        "person/:id/invite": "invitePerson",
        "profile": "showMyProfile",
        "profile/edit": "editProfile",
        "profile/change-password": "changePassword"
    }
});