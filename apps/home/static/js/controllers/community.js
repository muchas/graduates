
App.Controller.CommunityController = {
    showDashboard: function() {
        console.log('Show dashboard');
    },

    listTeachers: function() {
        console.log('List teachers');
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