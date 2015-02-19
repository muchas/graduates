App.Layouts.RootLayout = Marionette.LayoutView.extend({
    el: 'body',

    regions: {
        "topBar": "header",
        "content": "#content"
    }
});