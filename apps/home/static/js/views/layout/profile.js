App.Layouts.ProfileLayout = Marionette.LayoutView.extend({
    template: Handlebars.templates.profile,
    regions: {
        "employments": "#employments",
        "universities": "#universities",
        "personal_data": "#personal-data"
    }
});

App.Layouts.EditProfile = Marionette.LayoutView.extend({
    template: Handlebars.templates.edit_profile,
    regions: {
        "universities": "#universities",
        "employments": "#employments",
        "newEmployment": "#new-employment",
        "newUniversity": "#new-university",
        "description": "#description",
        "personal_data": "#attributes"
    },

    events: {
        'click #add-employment': 'addEmployment',
        'click #add-university': 'addUniversity'
    },

    addEmployment: function() {
        if(!this.newEmployment.hasView()) {
            this.employmentForm = new App.Form.Employment({ model: new App.Model.Employment() });
            this.newEmployment.show(this.employmentForm);
        }
    },

    addUniversity: function() {
        if(!this.newUniversity.hasView()) {
            this.universityForm = new App.Form.University({ model: new App.Model.University() });
            this.newUniversity.show(this.universityForm);
        }
    }
});