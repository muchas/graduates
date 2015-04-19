App.Command.Community =  App.Command.Base.extend({

    commands: {
        "community/branches": "getAllBranches",
        "community/teachers": "getAllTeachers",
        "community/group": "getGroup",
        "community/graduated-groups": "getGraduatedGroups",
        "community/student-groups": "getStudentGroups",
        "community/send-invitation": "invitePerson",
        "community/cities": "getAllCities",
        "community/not-empty-cities": "getNotEmptyCities",
        "community/city": "getCity"
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
    },

    invitePerson: function(id, data, callback, failure) {
        this.jsonRequest('POST', 'profile-invitation', { pk: id }, data, callback, failure);
    },

    getAllCities: function(callback) {
        this.jsonRequest('GET', 'city-list', {}, {}, callback);
    },

    getNotEmptyCities: function(callback) {
        this.jsonRequest('GET', 'connected-city-list', {}, {}, callback);
    },

    getCity: function(id, callback) {
        this.jsonRequest('GET', 'city', { pk: id }, {}, callback);
    }
});