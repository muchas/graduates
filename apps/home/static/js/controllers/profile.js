App.Controller.ProfileController = {
    showPerson: function(id) {

        var profile = new App.Model.Profile();
        var layout = new App.Layouts.ProfileLayout({ model: profile });

        App.loader.show();
        App.instance.execute("profile/person", id, function(response) {
            var personal_data = new App.Collection.PersonalData(response.personal_data);
            var universities = new App.Collection.Universities(response.universities);
            var employments = new App.Collection.Employments(response.employments);

            profile.set(response);

            App.layout.content.show(layout);

            layout.personal_data.show(new App.CollectionView.PersonalData({ collection: personal_data }));
            layout.universities.show(new App.CollectionView.Universities({ collection: universities }));
            layout.employments.show(new App.CollectionView.Employments({ collection: employments }));

            App.instance.execute("profile/connectedPages", id, function(response) {
                var connectedPeople = new App.Collection.People(response);
                var connectedPagesView = new App.CollectionView.ProfileConnectedPages({ collection: connectedPeople });
                layout.connectedPages.show(connectedPagesView);
            });

            if(!profile.get('is_owner')) {
                App.instance.execute("profile/similarity", id, function(response) {
                    var similarity = new App.Model.ProfileSimilarity(response);
                    var similarityView = new App.ItemView.ProfileSimilarity({ model: similarity });
                    layout.profileSimilarity.show(similarityView);
                });
            }
            App.loader.hide();
        });

    },

    invitePerson: function(id) {
        App.loader.show();
        App.instance.execute("profile/person", id, function(response) {
             var profile = new App.Model.Profile(response);

            var layout = new App.Layouts.InvitationLayout({ model: profile });
            App.layout.content.show(layout);

            var invitation = new App.Model.Invitation({ person: id });
            layout.form.show(new App.Form.Invitation({
                model: invitation,
                templateData: profile.toJSON()
            }));
            App.loader.hide();
        });
    },

    changePassword: function() {
        var layout = new App.Layouts.ChangePasswordLayout();
        App.layout.content.show(layout);

        var password = new App.Model.Password();
        layout.form.show(new App.Form.ChangePassword({ model: password }))
    },

    showMyProfile: function() {
        //TODO get user id from sync manager
        this.showPerson(1);
    },

    editProfile: function() {
        var layout = new App.Layouts.EditProfile();
        App.layout.content.show(layout);

        $('[data-toggle="popover"]').popover({
            "html": true,
            "container": "body",
            "trigger": "hover"
        });

        this.showProfileHeader(layout);

        App.instance.execute("profile/photo", function(response) {
            var photo = new App.Model.Photo(response);
            layout.photo.show(new App.Form.Photo({ model: photo }));
        });

        App.instance.execute("profile/personal_data", function(response) {
            console.log(response);
           var personal_data = new App.Collection.PersonalData(response);
            layout.personal_data.show(new App.CollectionView.EditableAttributes({ collection: personal_data }));
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

        App.instance.vent.on("married-name-changed", function() {
            this.showProfileHeader(layout);
        }.bind(this));

    },

    showProfileHeader: function(layout) {
        App.instance.execute("profile/my", function(response) {
           var person = new App.Model.Profile(response);
            layout.header.show(new App.ItemView.ProfileEditHeader({ model: person }));

            if(person.isFemale()) {
                layout.marriedName.show(new App.ItemView.EditableMarriedName({ model: person }));
            }
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