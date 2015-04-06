App.Layouts.RootLayout = Marionette.LayoutView.extend({
    el: 'body',

    regions: {
        "search": "#search",
        "searchResults": "#search-results",
        "content": "#content"
    }
});