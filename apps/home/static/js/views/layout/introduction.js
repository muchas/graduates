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

    initialize: function() {
        this.editableViews = [];
        this.notification = null;
    },

    addEditableView: function(view) {
        this.editableViews.push(view);
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

    finish: function(e) {
        var hasOpenedForms = false;
        // check if user saved/canceled all forms
        _.each(this.editableViews, function(view) {
            if(view.isOpen()) hasOpenedForms = true;
        }.bind(this));

        if(hasOpenedForms || this.newEmployment.hasView() || this.newUniversity.hasView()) {
            e.preventDefault();
            if(!this.notification){
                this.notification = noty({
                    text: 'Pozostawiłeś niezapisane dane. Aby kontynuować, zapisz lub anuluj otwarte formularze.',
                    type: 'error'
                });

                setTimeout(function() {
                    this.notification.close();
                    this.notification = null;
                }.bind(this), 5000);
            }
        }
    }
});