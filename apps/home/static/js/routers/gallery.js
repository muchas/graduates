App.Router.GalleryRouter = Marionette.AppRouter.extend({
    controller: App.Controller.GalleryController,
    appRoutes: {
        "gallery/": "showGallery",
    }
   // /gallery/album/:id
   // /gallery/photo/:id
});