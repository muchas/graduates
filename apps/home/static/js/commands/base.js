App.Command.Base = Backbone.View.extend({

    initialize: function () {
        this.initCommands();
    },

    jsonRequest: function (method, routeUrl, routeParams, data, successCallback, failureCallback) {
        this.failureCallback = failureCallback;
        $.ajax({
            url: Routing.generate(routeUrl, routeParams),
            method: method,
            data: JSON.stringify(data),
            success: successCallback,
            error: this.handleErrors.bind(this),
            dataType: "json"
        });
    },

    initCommands: function () {
        _.each(this.commands, function (callback, commandName) {
            App.instance.commands.setHandler(commandName, this[callback].bind(this));
        }.bind(this));
    },

    handleErrors: function(jqXHR, textStatus, errors) {
        if(jqXHR.status === 400) {
            (this.failureCallback ? this.failureCallback(jqXHR.responseJSON) : console.log('Show 400'));
        }
        else if (jqXHR.status === 404) {
            this.show404();
        }
        else if (jqXHR.status === 403) {
            this.show403();
            location.reload();
        }
        else if (jqHX.status === 401) {
        }
        else {
            this.show500();
        }
    },

    show404: function() {
        console.log('Show 404');
    },

    show403: function() {
        console.log('Show 403');
    },

    show500: function() {
        console.log('Show 500');
        var n = noty({
            text: 'Błąd 500',
            type: 'error'
        });
        setTimeout(function() {
            n.close();
        }, 10000);
    }
});
