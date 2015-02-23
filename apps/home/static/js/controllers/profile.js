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

        this.showProfileHeader(layout);

        App.instance.execute("profile/photo", function(response) {
            var photo = new App.Model.Photo(response);
            layout.photo.show(new App.Form.Photo({ model: photo }));
        });

        App.instance.execute("profile/personal_data", function(response) {
           var personal_data = new App.Collection.PersonalData(response);
            layout.personal_data.show(new App.CollectionView.EditableAttributes({ collection: personal_data }))
        });

        this.showUniversities(layout);

        App.instance.execute("profile/description", function(response) {
            var description = new App.Model.Description(response);
            layout.description.show(new App.ItemView.EditableDescription({ model: description }));
        });

        this.showEmployments(layout);


        App.instance.execute("university/buildings", function(response) {
            App.Data.universities = response;
        });

        App.instance.execute("city/all", function(response) {
           App.Data.cities = response;
        });

        App.instance.execute("university/departments", function(response) {
           App.Data.departmens = response;
        });

        App.instance.execute("community/branches", function(response) {
           App.Data.branches = response;
        });

        // Listeners
        App.instance.vent.on("employment-created", function() {
            this.showEmployments(layout);
        }.bind(this));

        App.instance.vent.on("student-created", function() {
            this.showUniversities(layout);
        }.bind(this));

        App.instance.vent.on("profile-photo-uploaded", function() {
            this.showProfileHeader(layout);
        }.bind(this));

    },

    showProfileHeader: function(layout) {
        App.instance.execute("profile/my", function(response) {
           var person = new App.Model.Profile(response);
            layout.header.show(new App.ItemView.ProfileEditHeader({ model: person }));
        });
    },

    showUniversities: function(layout) {
        App.instance.execute("profile/universities", function(response) {
           var universities = new App.Collection.Universities(response);
            layout.universities.show(new App.CollectionView.EditableUniversities({ collection: universities }));
        });
    },

    showEmployments: function(layout) {
         App.instance.execute("profile/employments", function(response) {
           var employments = new App.Collection.Employments(response);
            layout.employments.show(new App.CollectionView.EditableEmployments({ collection: employments }));
        });

    }
};