App.Layouts.ProfileLayout = Marionette.LayoutView.extend({
    template: Handlebars.templates.profile,
    regions: {
        "employments": "#employments",
        "universities": "#universities",
        "personal_data": "#personal-data",
        "profileSimilarity": "#profile-similarity",
        "connectedPages": "#connectedPages"
    }
});

App.Layouts.EditProfile = Marionette.LayoutView.extend({
    template: Handlebars.templates.edit_profile,
    regions: {
        "marriedName": "#married-name",
        "header": "#edit-profile-header",
        "photo": "#photo",
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
            this.employmentForm.initializeTypeahead();
        }
    },

    addUniversity: function() {
        if(!this.newUniversity.hasView()) {
            this.universityForm = new App.Form.University({ model: new App.Model.University() });
            this.newUniversity.show(this.universityForm);
            this.universityForm.initializeSelect2();
        }
    }
});

App.Layouts.InvitationLayout = Marionette.LayoutView.extend({
   template: Handlebars.templates.invitation,
    regions: {
        "form": "#invitation-form"
    }
});

App.Layouts.ChangePasswordLayout = Marionette.LayoutView.extend({
   template: Handlebars.templates.change_password,
    regions: {
        "form": "#change-password-form"
    }
});