App.Router.CommunityRouter = Marionette.AppRouter.extend({
    controller: App.Controller.CommunityController,
    appRoutes: {
        "": "showDashboard",
        "feedback": "showSupport",
        "teachers": "listTeachers",
        "group": "showMyGroup",
        "group/:id": "showGroup",
        "community": "showCommunity",
        "university/:id": "showUniversity",
        "company/:id": "showCompany"
    }
});