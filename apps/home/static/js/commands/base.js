App.Command.Base = Backbone.View.extend({

    initialize: function () {
        this.initCommands();
    },

    jsonRequest: function (method, routeUrl, routeParams, data, successCallback) {
        $.ajax({
            url: Routing.generate(routeUrl, routeParams),
            method: method,
            data: JSON.stringify(data),
            success: successCallback,
            error: function (response) {
                if (response.status === 404) {
                    this.show404();
                }
                else if (response.status === 403) {
                    this.show403();
                }
                else {
                    this.show500();
                }
            }.bind(this),
            dataType: "json"
        });
    },

    initCommands: function () {
        _.each(this.commands, function (callback, commandName) {
            App.instance.commands.setHandler(commandName, this[callback].bind(this));
        }.bind(this));
    },

    show404: function() {
        console.log('Show 404');
    },

    show403: function() {
        console.log('Show 403');
    },

    show500: function() {
        console.log('Show 500');
    }
});
