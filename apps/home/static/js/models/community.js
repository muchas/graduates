App.Model.Teacher = Backbone.Model.extend({});
App.Model.Group = Backbone.Model.extend({});
App.Model.Invitation = Backbone.Model.extend({});
App.Model.City = Backbone.Model.extend({});
App.Model.Support = Backbone.Model.extend({});
App.Collection.Teachers = Backbone.Collection.extend({
    model: App.Model.Teacher
});
App.Collection.Groups = Backbone.Collection.extend({
   model: App.Model.Group
});
App.Collection.Cities = Backbone.Collection.extend({
   model: App.Model.City
});