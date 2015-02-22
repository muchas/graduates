App.Command.Community =  App.Command.Base.extend({

    commands: {
        "community/branches": "getAllBranches"
    },

    getAllBranches: function(callback) {
        this.jsonRequest('GET', 'branch-list', {}, {}, callback);
    }

});