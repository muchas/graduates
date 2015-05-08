App.Controller.IntroductionController = {
    showGraduates: function() {
        var layout = new App.Layouts.Graduates();
        App.layout.content.show(layout);
        App.instance.execute('community/not-empty-cities', function(response) {
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
        var universities = new App.Collection.Universities();
        var employments = new App.Collection.Employments();
        var $modal = $('#reasonModal');
        var editableViews = [];
        var notification = null;
        var modalDisplays = 0;
        var modalDisplaysMax = 1;

        App.layout.content.show(layout);

        App.instance.execute("profile/personal_data", function(response) {
            var personal_data = new App.Collection.PersonalData(response);
            var attributes = new App.CollectionView.EditableAttributes({ collection: personal_data });
            layout.personalData.show(attributes);
            editableViews.push(attributes);
            attributes.edit();
        });

        this.showUniversities(layout, universities, editableViews);
        this.showEmployments(layout, employments, editableViews);

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
        layout.on("finish:introduction", function(event) {
           var hasOpenedForms = false;
            // check if user saved/canceled all forms
            _.each(editableViews, function(view) {
                if(view.isOpen()) hasOpenedForms = true;
            }.bind(this));

           if(hasOpenedForms || layout.hasOpenedForms()) {
                if(!notification){
                    notification = noty({
                        text: 'Pozostawiono niezapisane dane. Aby kontynuować, zapisz lub anuluj otwarte formularze.',
                        type: 'error'
                    });

                    setTimeout(function() {
                        notification.close();
                        notification = null;
                    }.bind(this), 5000);
                }
           } else if(employments.length == 0 || universities.length == 0) {
               $modal.modal();
               modalDisplays++;
           } else {
               window.location.href = Routing.generate('introduce');
           }
        });


        App.instance.vent.on("employment-created", function() {
            this.showEmployments(layout, employments, editableViews);
        }.bind(this));

        App.instance.vent.on("student-created", function() {
            this.showUniversities(layout, universities, editableViews);
        }.bind(this));

        App.instance.vent.on("profile-photo-uploaded", function() {
            this.showProfileHeader(layout);
        }.bind(this));

        App.instance.vent.on("married-name-changed", function() {
            this.showProfileHeader(layout);
        }.bind(this));
    },

    showUniversities: function(layout, universities, editableViews) {
        App.instance.execute("profile/universities", function(response) {
            universities.set(response);
            var editableUniversities = new App.CollectionView.EditableUniversities({ collection: universities });
            layout.universities.show(editableUniversities);
            editableViews.push(editableUniversities);
        });
    },

    showEmployments: function(layout, employments, editableViews) {
         App.instance.execute("profile/employments", function(response) {
            employments.set(response);
            var editableEmployments = new App.CollectionView.EditableEmployments({ collection: employments });
            layout.employments.show(editableEmployments);
            editableViews.push(editableEmployments);
        });

    }
};