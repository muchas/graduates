
App.Controller.CommunityController = {
    showDashboard: function() {
        var layout = new App.Layouts.Dashboard();
        App.layout.content.show(layout);
        App.instance.execute('community/not-empty-cities', function(response) {
            var cities = new App.Collection.Cities(response);
            var map = new App.View.Map({
                collection: cities,
                container: layout.city,
                itemView: App.ItemView.City
            });
            layout.map.show(map);
            map.loadMap();
        });
    },

    listTeachers: function() {
        var layout = new App.Layouts.Teachers();
        App.layout.content.show(layout);
        App.instance.execute('community/teachers', function(response) {
           var teachers = new App.Collection.Teachers(response);
            layout.teachers.show(new App.CollectionView.Teachers({ collection: teachers }));
        });
    },

    showMyGroup: function() {
        console.log('Show my group');
    },

    showGroup: function(id) {
        App.instance.execute('community/group', id, function(response) {
             var group = new App.Model.Group(response);

             App.layout.content.show(new App.ItemView.Group({ model: group }));
        });
    },

    showCommunity: function() {
        var layout = new App.Layouts.Community();
        App.layout.content.show(layout);
        App.instance.execute('community/student-groups', function(response) {
           var groups = new App.Collection.Groups(response);
            layout.students.show(new App.CollectionView.Groups({ collection: groups }));
        });

        App.instance.execute('community/graduated-groups', function(response) {
           var groups = new App.Collection.Groups(response);
            layout.graduates.show(new App.CollectionView.Groups({ collection: groups }));
        });
    },

    showUniversity: function() {

    },

    showCompany: function() {

    }
};