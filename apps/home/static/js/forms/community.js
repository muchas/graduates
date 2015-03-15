App.Form.Invitation = Backbone.Form.extend({
    template: Handlebars.templates.invitation_form,

    schema: {
        email: { type: 'Text', editorClass: "form-control", validators: ['required', 'email'] },
        message: { type: 'TextArea', editorClass: "form-control", editorAttrs: { rows: 4 } }
    },

    events: {
      'click .send': 'save',
      'click .cancel': 'hide'
    },

    save: function() {
       var errors = this.commit();
       if(_.isUndefined(errors)) {
           this.onSave();
       } else {
           console.log(errors);
           this.handleErrors(errors);
       }
    },

    onSave: function() {
        App.instance.execute('community/send-invitation', this.model.get('person'), this.model.toJSON(),
            function(response) {

                var n = noty({
                    text: 'Zaproszenie zostało wysłane.',
                    type: 'success'
                });

                setTimeout(function() {
                    n.close();
                }, 5000);

                this.hide();
            }.bind(this),
            function(response) {
                var errors = {};
                // change errors structure
                _.each(response, function(value, key) {
                   errors[key] = { message: value[0] };
                });
                this.handleErrors(errors);
            }.bind(this)
        );
    },

    hide: function() {
        Backbone.history.navigate("/person/" + this.model.get('person'), true);
        this.remove();
    },

    handleErrors: function(errors) {
       this.$el.find('.form-error').empty();
       _.each(errors, function(error, key) {
           // '.' char has special meaning in CSS, so we replace it with '-'
           key = key.replace(/\./g, '-');
           this.$el.find('.'+ key + '-error').html(Handlebars.templates.form_error({ message: error.message }));
       }.bind(this));
    }
});
