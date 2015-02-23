App.Command.Profile = App.Command.Base.extend({

    commands: {
        "profile/similarity": "getPersonSimilarity",
        "profile/person": "getPersonInformation",
        "profile/my": "getAuthenticatedPersonInformation",
        "profile/employments": "getEmployments",
        "profile/universities": "getUniversities",
        "profile/description": "getDescription",
        "profile/personal_data": "getPersonalData",
        "profile/photo": "getPhoto",
        "profile/uploadPhoto": "uploadPhoto",
        "profile/removePhoto": "removePhoto",
    },

    getPersonInformation: function(id, callback) {
        this.jsonRequest("GET", "person-card", { pk: id }, {}, callback);
    },

    getPhoto: function(callback) {
        this.jsonRequest("GET", "person-photo", {}, {}, callback);
    },

    getAuthenticatedPersonInformation: function(callback) {
        this.jsonRequest("GET", "profile-header", {}, {}, callback);
    },

    getPersonSimilarity: function(id, callback) {
      // todo implement
    },

    getEmployments: function(callback) {
        this.jsonRequest("GET", "employment-list", {}, {}, callback);
    },

    getUniversities: function(callback) {
        this.jsonRequest("GET", "student-list", {}, {}, callback);
    },

    getDescription: function(callback) {
        this.jsonRequest("GET", "person-description", {}, {}, callback);
    },

    getPersonalData: function(callback) {
        this.jsonRequest("GET", "personal-data-list", {}, {}, callback);
    },

    uploadPhoto: function(data, callback) {
        $.ajax({
            url: Routing.generate('person-photo', {}),
            method: "PUT",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            success: callback,
            error: this.handleErrors.bind(this),
            dataType: "json"
        });
    },

    removePhoto: function(callback) {
        this.jsonRequest("PUT", "person-photo", {}, { picture: null }, callback);
    }
});

App.Command.University = App.Command.Base.extend({

    commands: {
        "university/create": "postStudent",
        "university/update": "putStudent",
        "university/remove": "deleteStudent",
        "university/buildings": "getBuildings",
        "university/departments": "getAllDepartments"
    },

    getBuildings: function(callback) {
        this.jsonRequest("GET", "university-list", {}, {}, callback);
    },

    getAllDepartments: function(callback) {
       this.jsonRequest("GET", "department-list", {}, {}, callback);
    },

    postStudent: function(data, callback) {
        this.jsonRequest("POST", 'student-list', {}, data, callback);
    },

    putStudent: function(id, data, callback) {
        this.jsonRequest("PUT", 'student', { pk: id }, data, callback);
    },

    deleteStudent: function(id, callback) {
        this.jsonRequest("DELETE", 'student', { pk: id }, {}, callback);
    }
});


App.Command.Employment = App.Command.Base.extend({

    commands: {
        "employment/create": "postEmployment",
        "employment/update": "putEmployment",
        "employment/remove": "deleteEmployment"
    },

    postEmployment: function(data, callback) {
        this.jsonRequest("POST", 'employment-list',  {}, data, callback);
    },

    putEmployment: function(id, data, callback) {
        this.jsonRequest("PUT", 'employment', { pk: id }, data, callback);
    },

    deleteEmployment: function(id, callback) {
        this.jsonRequest("DELETE", 'employment', { pk: id }, {}, callback);
    }
});

App.Command.Description = App.Command.Base.extend({

    commands: {
        "description/edit": "putDescription"
    },

    putDescription: function(data, callback) {
        this.jsonRequest("PUT", "person-description", {}, data, callback);
    }
});


App.Command.Attribute = App.Command.Base.extend({

    commands: {
        "attribute/edit": "putAttribute"
    },

    putAttribute: function(id, data, callback) {
        this.jsonRequest("PUT", "personal-data", { pk: id }, data, callback);
    }
});