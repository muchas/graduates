App.Controller.IntroductionController = {
    showGraduates: function() {
        var layout = new App.Layouts.Graduates();
        App.layout.content.show(layout);
        App.instance.execute('community/cities', function(response) {
            var cities = new App.Collection.Cities(response);
            var map = new App.View.Map({
                collection: cities,
                container: layout.city,
                itemView: App.ItemView.IntroductionCity
            });
            layout.map.show(map);
            map.loadMap();
        });
    },

    editUserProfile: function() {
        var layout = new App.Layouts.PersonalData();
        App.layout.content.show(layout);

        App.instance.execute("profile/personal_data", function(response) {
            var personal_data = new App.Collection.PersonalData(response);
            var attributes = new App.CollectionView.EditableAttributes({ collection: personal_data });
            layout.personalData.show(attributes);
            attributes.edit();
        });

        this.showUniversities(layout);
        this.showEmployments(layout);

       var loadedData = {
           "universities": false,
           "cities": false,
           "departments": false,
           "branches": false
       };

       App.instance.vent.on("formDataLoaded", function(key) {
            loadedData[key] = true;
            for(var index in loadedData) {
                if(!loadedData[index]) return false;
            }
            console.log(key);
            layout.addEmployment();
            layout.addUniversity();
       });

        App.instance.execute("university/buildings", function(response) {
            App.Data.universities = response;
            App.instance.vent.trigger("formDataLoaded", "universities");
        });

        App.instance.execute("city/all", function(response) {
           App.Data.cities = response;
            App.instance.vent.trigger("formDataLoaded", "cities");
        });

        App.instance.execute("university/departments", function(response) {
           App.Data.departmens = response;
            App.instance.vent.trigger("formDataLoaded", "departments");
        });

        App.instance.execute("community/branches", function(response) {
           App.Data.branches = response;
            App.instance.vent.trigger("formDataLoaded", "branches");

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