App.Model.PersonSearchResult = Backbone.Model.extend({});

App.Collection.PeopleSearchResults = Backbone.Collection.extend({
   model: App.Model.PersonSearchResult,
   url: '/community/search/'
});
