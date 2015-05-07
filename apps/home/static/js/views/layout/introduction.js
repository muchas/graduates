App.Layouts.Graduates = Marionette.LayoutView.extend({
    template: Handlebars.templates.introduction_graduates,
    regions: {
        "map": "#map",
        "city": "#city"
    }
});

App.Layouts.PersonalData = Marionette.LayoutView.extend({
    template: Handlebars.templates.introduction_profile,
    regions: {
        "personalData": "#personalData",
        "universities": "#universities",
        "employments": "#employments",
        "newEmployment": "#new-employment",
        "newUniversity": "#new-university"
    },

    events: {
        'click #add-employment': 'addEmployment',
        'click #add-university': 'addUniversity',
        'click #finish-introduction': 'finish'
    },

    addEmployment: function() {
        if(!this.newEmployment.hasView()) {
            this.employmentForm = new App.Form.Employment({ model: new App.Model.Employment() });
            this.newEmployment.show(this.employmentForm);
            this.employmentForm.initializeTypeahead();
        }
    },

    addUniversity: function() {
        if(!this.newUniversity.hasView()) {
            this.universityForm = new App.Form.University({ model: new App.Model.University() });
            this.newUniversity.show(this.universityForm);
            this.universityForm.initializeSelect2();
        }
    },

    hasOpenedForms: function() {
        return this.newEmployment.hasView() || this.newUniversity.hasView();
    },

    finish: function(e) {
        e.preventDefault();
        this.trigger('finish:introduction', e);
    }
});