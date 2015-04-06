App.CollectionView.SearchResults = Marionette.CollectionView.extend({
    tagName: "ul",
    className: "nav",
    childView: App.ItemView.SearchResult,

    onRender: function() {
    }
});