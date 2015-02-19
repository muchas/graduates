App.Model.Profile = Backbone.Model.extend({});
App.Model.PersonalData = Backbone.Model.extend({});
App.Model.Employment = Backbone.DeepModel.extend({});
App.Model.University = Backbone.Model.extend({});
App.Model.Description = Backbone.Model.extend({});


App.Collection.PersonalData = Backbone.Collection.extend({
    model: App.Model.PersonalData
});

App.Collection.Employments = Backbone.Collection.extend({
   model: App.Model.Employment
});

App.Collection.Universities = Backbone.Collection.extend({
   model: App.Model.University
});