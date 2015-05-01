App.CollectionView.Posts = Marionette.CollectionView.extend({
    childView: App.ItemView.Post
});

App.CollectionView.Comments = Marionette.CollectionView.extend({
   childView: App.ItemView.Comment
});