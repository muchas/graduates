App.CollectionView.Teachers = Marionette.CollectionView.extend({
    childView: App.ItemView.Teacher
});

App.CollectionView.Groups = Marionette.CollectionView.extend({
    childView: App.ItemView.CommunityGroup
});