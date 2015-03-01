App.Command.Community =  App.Command.Base.extend({

    commands: {
        "community/branches": "getAllBranches",
        "community/teachers": "getAllTeachers",
        "community/group": "getGroup"
    },

    getAllBranches: function(callback) {
        this.jsonRequest('GET', 'branch-list', {}, {}, callback);
    },

    getAllTeachers: function(callback) {
        this.jsonRequest('GET', 'teacher-list', {}, {}, callback);
    },

    getGroup: function(id, callback) {
        this.jsonRequest('GET', 'group', { pk: id }, {}, callback);
    }
});