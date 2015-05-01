App.Model.Post = Backbone.Model.extend({});
App.Model.Comment = Backbone.Model.extend({});

App.Collection.Posts = Backbone.Collection.extend({
   model: App.Model.Post
});

App.Collection.Comments = Backbone.Collection.extend({
   model: App.Model.Comment
});