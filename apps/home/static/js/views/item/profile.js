App.ItemView.Employment = Marionette.ItemView.extend({
   template: Handlebars.templates.employment
});

App.ItemView.University = Marionette.ItemView.extend({
   template: Handlebars.templates.university
});

App.ItemView.PersonalData = Marionette.ItemView.extend({
   template: Handlebars.templates.attribute
});

App.ItemView.ProfileSimilarity = Marionette.ItemView.extend({
   template: Handlebars.templates.profile_similarity
});

App.ItemView.Editable = Marionette.ItemView.extend({
    events: {
       'click .edit': 'edit'
    },

    hasOpenedForm: false,

    isOpen: function() {
        return this.hasOpenedForm;
    },

    closeForm: function() {
        this.hasOpenedForm = false;
    },

    edit: function() {
        this.form = this.getForm();
        this.form.parent = this;
        this.$el.fadeOut(300, function() {
            this.$el.html(this.form.render().$el);
            this.trigger('afterFormRender', this.form);
        }.bind(this));
        this.$el.fadeIn(400);
        this.hasOpenedForm = true;
    }
});

App.ItemView.EditableEmployment = App.ItemView.Editable.extend({
    template: Handlebars.templates.edit_employment,
    events: {
       'click .edit': 'edit',
       'click .remove': 'removeEntry'
    },

    initialize: function() {
        this.on('afterFormRender', function(form) {
            form.initializeTypeahead();
        });
    },

    getForm: function() {
        return new App.Form.Employment({ model: this.model });
    },

    removeEntry: function() {
        App.loader.show();
        App.instance.execute('employment/remove', this.model.id, function(response) {
            this.$el.fadeOut(300, function() {
                this.remove();
            }.bind(this));
            App.loader.hide();
        }.bind(this));
    }
});

App.ItemView.EditableDescription = App.ItemView.Editable.extend({
    template: Handlebars.templates.edit_description,
    getForm: function() {
        return new App.Form.Description({ model: this.model });
    }
});


App.ItemView.EditableMarriedName = App.ItemView.Editable.extend({
   template: Handlebars.templates.edit_married_name,
   getForm: function() {
       return new App.Form.MarriedName({ model: this.model });
   }
});


App.ItemView.EditableUniversity = App.ItemView.Editable.extend({
    template: Handlebars.templates.edit_university,
    events: {
       'click .edit': 'edit',
       'click .remove': 'removeEntry'
    },

    initialize: function() {
        this.on('afterFormRender', function(form) {
            form.initializeSelect2();
        });
    },

    getForm: function() {
        return new App.Form.University({ model: this.model });
    },

    removeEntry: function() {
        App.loader.show();
        App.instance.execute('university/remove', this.model.id, function(response) {
            this.$el.fadeOut(300, function() {
                this.remove();
            }.bind(this));
            App.loader.hide();
        }.bind(this));
    }
});

App.ItemView.EditableAttribute = App.ItemView.Editable.extend({
    template: Handlebars.templates.edit_attribute,
    getForm: function() {
        return new App.Form.Attribute({
            model: this.model,
            templateData: { name: this.model.get('name') }
        });
    }
});


App.ItemView.ProfileEditHeader = Marionette.ItemView.extend({
   template: Handlebars.templates.edit_profile_header
});

App.ItemView.ProfileConnectedPage = Marionette.ItemView.extend({
   tagName: 'a',
   className: 'list-group-item',
   template: Handlebars.templates.profile_connected_page,
   attributes: function() {
       return {
           'href': '/#/person/' + this.model.get('id')
       }
   }
});