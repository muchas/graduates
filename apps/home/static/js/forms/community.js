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
           this.$el.find('.form-error').empty();
           _.each(errors, function(error, key) {
               // '.' char has special meaning in CSS, so we replace it with '-'
               key = key.replace(/\./g, '-');
               this.$el.find('.'+ key + '-error').html(Handlebars.templates.form_error({ message: error.message }));
           }.bind(this));
       }
    },

    onSave: function() {
        console.log(this.model.toJSON());
        App.instance.execute('community/send-invitation', this.model.toJSON(), function(response) {

        });
    },

    hide: function() {
        Backbone.history.navigate("/person/" + this.model.get('id'), true);
        this.remove();
    }
});
