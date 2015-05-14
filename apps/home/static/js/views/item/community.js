App.ItemView.Group = Marionette.ItemView.extend({
   template: Handlebars.templates.group
});

App.ItemView.CommunityGroup = Marionette.ItemView.extend({
    template: Handlebars.templates.community_group
});

App.ItemView.Teacher = Marionette.ItemView.extend({
   template: Handlebars.templates.teacher
});

App.ItemView.CityPerson = Marionette.ItemView.extend({
   template: Handlebars.templates.city_person
});

App.ItemView.City = Marionette.ItemView.extend({
   template: Handlebars.templates.city,

    ui: {
       'select': '.year',
       'people': '#people'
    },

    events: {
        'change @ui.select': 'filter'
    },

    initialize: function() {
        this.peopleCollection = new App.Collection.People(this.model.get('people'));
        this.peopleView = new App.CollectionView.CityPeople({ collection: this.peopleCollection });
    },

    onRender: function() {
        this.ui.people.html(this.peopleView.render().$el);
    },

    filter: function(e) {
        var year = Number(this.ui.select.val());
        var people = this.model.get('people');
        if(year) {
            this.peopleCollection.reset(_.where(people, { year: year }));
        } else {
            this.peopleCollection.reset(people);
        }
        this.ui.people.hide();
        this.ui.people.html(this.peopleView.render().$el);
        this.ui.people.fadeIn(400);
    }
});