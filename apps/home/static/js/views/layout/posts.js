App.Layouts.PostsLayout = Marionette.LayoutView.extend({
    template: Handlebars.templates.posts,
    regions: {
        "form": "#new-post-form",
        "posts": "#post-container"
    }
});