App.Command.City =  App.Command.Base.extend({

    commands: {
        "city/all": "getAll"
    },

    getAll: function(callback) {
        this.jsonRequest('GET', 'city-list', {}, {}, callback);
    }

});