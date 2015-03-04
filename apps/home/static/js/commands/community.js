App.Command.Community =  App.Command.Base.extend({

    commands: {
        "community/branches": "getAllBranches",
        "community/teachers": "getAllTeachers",
        "community/group": "getGroup",
        "community/graduated-groups": "getGraduatedGroups",
        "community/student-groups": "getStudentGroups"
    },

    getAllBranches: function(callback) {
        this.jsonRequest('GET', 'branch-list', {}, {}, callback);
    },

    getAllTeachers: function(callback) {
        this.jsonRequest('GET', 'teacher-list', {}, {}, callback);
    },

    getGroup: function(id, callback) {
        this.jsonRequest('GET', 'group', { pk: id }, {}, callback);
    },

    getGraduatedGroups: function(callback) {
        this.jsonRequest('GET', 'graduated-group-list', {}, {}, callback);
    },

    getStudentGroups: function(callback) {
        this.jsonRequest('GET', 'student-group-list', {}, {}, callback);
    }
});