App.Controller.PostsController = {
    showPosts: function() {
        var layout = new App.Layouts.PostsLayout();
        App.layout.content.show(layout);

        layout.form.show(new App.Form.SharePost({ model: new App.Model.Post() }));

        this.showPostList(layout);
        App.instance.vent.on("post:new", function() {
            this.showPostList(layout);
        }.bind(this))

    },

    showPostList: function(layout) {
        App.loader.show();
        App.instance.execute("posts/list", function(response) {
            var posts = new App.Collection.Posts(response);
            layout.posts.show(new App.CollectionView.Posts({ collection: posts }));
            App.loader.hide();
        });
    }
};