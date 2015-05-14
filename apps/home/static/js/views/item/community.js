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

App.ItemView.CityUniversity = Marionette.ItemView.extend({
   template: Handlebars.templates.city_university
});

App.ItemView.CityCompany = Marionette.ItemView.extend({
   template: Handlebars.templates.city_company
});

App.ItemView.EmptyCityCompany = Marionette.ItemView.extend({
   template: Handlebars.templates.city_company_empty
});

App.ItemView.EmptyCityUniversity = Marionette.ItemView.extend({
   template: Handlebars.templates.city_university_empty
});

App.ItemView.EmptyCityPerson = Marionette.ItemView.extend({
   template: Handlebars.templates.city_person_empty
});


App.ItemView.City = Marionette.ItemView.extend({
   template: Handlebars.templates.city,

    ui: {
       'select': '.year',
       'selectBox': '.filter-box',
       'container': '.city-container',
       'people': '.people',
       'companies': '.companies',
       'universities': '.universities'
    },

    events: {
        'change @ui.select': 'filter',
        'click @ui.people': 'renderPeople',
        'click @ui.companies': 'renderCompanies',
        'click @ui.universities': 'renderUniversities'
    },

    initialize: function() {
        this.peopleCollection = new App.Collection.People(this.model.get('people'));
        this.peopleView = new App.CollectionView.CityPeople({ collection: this.peopleCollection });

        this.companiesCollection = new App.Collection.Companies(this.model.get('companies'));
        this.companiesView = new App.CollectionView.CityCompanies({ collection: this.companiesCollection });

        this.universitiesCollection = new App.Collection.Universities(this.model.get('universities'));
        this.universitiesView = new App.CollectionView.CityUniversities({ collection: this.universitiesCollection });

        this.view = null;
        this.collection = null;
    },

    onRender: function() {
        this.renderPeople();
    },

    renderContainer: function(collection, view) {
        this.collection = collection;
        this.view = view;
        this.ui.container.hide();
        this.ui.container.html(this.view.render().$el);
        this.ui.container.fadeIn(300);
    },

    renderPeople: function() {
        this.ui.selectBox.show();
        this.renderContainer(this.peopleCollection, this.peopleView);
    },

    renderCompanies: function() {
        this.ui.selectBox.hide();
        this.renderContainer(this.companiesCollection, this.companiesView);
    },

    renderUniversities: function() {
        this.ui.selectBox.hide();
        this.renderContainer(this.universitiesCollection, this.universitiesView);
    },

    filter: function(e) {
        var year = Number(this.ui.select.val());
        var people = this.model.get('people');
        if(year) {
            this.collection.reset(_.where(people, { year: year }));
        } else {
            this.collection.reset(people);
        }
        this.renderContainer(this.peopleCollection, this.peopleView);
    }
});