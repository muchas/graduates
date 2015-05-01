App.Router.PostsRouter = Marionette.AppRouter.extend({
    controller: App.Controller.PostsController,
    appRoutes: {
        "posts/": "showPosts"
    }
});
