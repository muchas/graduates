
App.Controller.CommunityController = {
    showDashboard: function() {
        console.log('Show dashboard');
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

    },

    showUniversity: function() {

    },

    showCompany: function() {

    }
};