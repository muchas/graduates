App.Form.SharePost = App.Form.Base.extend({
    template: Handlebars.templates.post_form,

    schema: {
        content: { type: 'TextArea', editorClass: "form-control share-widget-textarea", validators: ['required'], editorAttrs: { "rows": 3 } }
    },

    events: {
      'click .save': 'save'
    },

    save: function() {
       console.log('onSave');
       var errors = this.commit();
       if(_.isUndefined(errors)) {
           this.onSave();
       } else {
           console.log(errors);
           this.handleErrors(errors);
       }
    },

    onSave: function() {
        App.instance.execute('posts/newPost', this.model.toJSON(),
            function(response) {
                App.instance.vent.trigger('post:new');
                this.clear();
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

    clear: function() {
        _.each(this.fields, function(field) {
            field.setValue('');
        });
    }
});


App.Form.EditPost = App.Form.Base.extend({
    template: Handlebars.templates.edit_post_form,

    schema: {
        content: { type: 'TextArea', editorClass: "form-control", validators: ['required'], editorAttrs: { "rows": 4 } }
    },

    events: {
      'click .save': 'save',
      'click .cancel': 'cancel'
    },

    save: function() {
       var errors = this.commit();
       if(_.isUndefined(errors)) {
           this.onSave();
       } else {
           this.handleErrors(errors);
       }
    },

    onSave: function() {
        App.instance.execute('posts/editPost', this.model.get('id'), this.model.toJSON(),
            function(response) {
                this.parent.renderContent();
                this.remove();
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

    cancel: function() {
      this.parent.renderContent();
      this.remove();
    }
});
