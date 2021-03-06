App.Controller.ProfileController = {
    showPerson: function(id) {
        App.instance.execute("profile/person", id, function(response) {
            var profile = new App.Model.Profile(response);
            var personal_data = new App.Collection.PersonalData(response.personal_data);
            var universities = new App.Collection.Universities(response.universities);
            var employments = new App.Collection.Employments(response.employments);

            var layout = new App.Layouts.ProfileLayout({ model: profile });

            App.layout.content.show(layout);

            layout.personal_data.show(new App.CollectionView.PersonalData({ collection: personal_data }));
            layout.universities.show(new App.CollectionView.Universities({ collection: universities }));
            layout.employments.show(new App.CollectionView.Employments({ collection: employments }));
        });
    },

    invitePerson: function(id) {
        console.log('Invite person' + id);
    },

    showMyProfile: function() {
        //TODO get user id from sync manager
        this.showPerson(1);
    },

    editProfile: function() {
        var layout = new App.Layouts.EditProfile();
        App.layout.content.show(layout);

        App.instance.execute("profile/personal_data", function(response) {
           var personal_data = new App.Collection.PersonalData(response);
            layout.personal_data.show(new App.CollectionView.EditableAttributes({ collection: personal_data }))
        });

        App.instance.execute("profile/universities", function(response) {
           var universities = new App.Collection.Universities(response);
            layout.universities.show(new App.CollectionView.EditableUniversities({ collection: universities }));
        });

        App.instance.execute("profile/description", function(response) {
            var description = new App.Model.Description(response);
            layout.description.show(new App.ItemView.EditableDescription({ model: description }));
        });

        this._showEmployments(layout);

        // Listeners
        App.instance.vent.on("employment-created", function() {
            this._showEmployments(layout);
        }.bind(this));
    },

    _showEmployments: function(layout) {
         App.instance.execute("profile/employments", function(response) {
           var employments = new App.Collection.Employments(response);
            layout.employments.show(new App.CollectionView.EditableEmployments({ collection: employments }));
        });

    }
};