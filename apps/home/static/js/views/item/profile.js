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

App.ItemView.EditableEmployment = Marionette.ItemView.extend({
    template: Handlebars.templates.edit_employment,
    events: {
       'click .edit': 'edit',
       'click .remove': 'remove_entry'
    },

    initialize: function() {
        this.hasOpenedForm = false;
    },

    edit: function() {
        this.form = new App.Form.Employment({ model: this.model });
        this.form.parent = this;
        this.$el.fadeOut(300, function() {
            this.$el.html(this.form.render().$el);
            this.form.initializeTypeahead();
        }.bind(this));
        this.$el.fadeIn(400);
        this.hasOpenedForm = true;
    },

    isOpen: function() {
        return this.hasOpenedForm;
    },

    closeForm: function() {
        this.hasOpenedForm = false;
    },

    remove_entry: function() {
        App.loader.show();
        App.instance.execute('employment/remove', this.model.id, function(response) {
            this.$el.fadeOut(300, function() {
                this.remove();
            }.bind(this));
            App.loader.hide();
        }.bind(this));
    }
});

App.ItemView.EditableDescription = Marionette.ItemView.extend({
   template: Handlebars.templates.edit_description,
   events: {
       'click .edit': 'edit'
   },

    edit: function() {
        this.form = new App.Form.Description({ model: this.model });
        this.form.parent = this;
        this.$el.fadeOut(300, function() {
            this.$el.html(this.form.render().$el);
        }.bind(this));
        this.$el.fadeIn(400);
    }
});


App.ItemView.EditableMarriedName = Marionette.ItemView.extend({
   template: Handlebars.templates.edit_married_name,
   events: {
       'click .edit': 'edit'
   },

    edit: function() {
        this.form = new App.Form.MarriedName({ model: this.model });
        this.form.parent = this;
        this.$el.fadeOut(300, function() {
            this.$el.html(this.form.render().$el);
        }.bind(this));
        this.$el.fadeIn(400);
    }
});


App.ItemView.EditableUniversity = Marionette.ItemView.extend({
    template: Handlebars.templates.edit_university,
    events: {
       'click .edit': 'edit',
       'click .remove': 'remove_entry'
    },

    initialize: function() {
        this.hasOpenedForm = false;
    },

    edit: function() {
        this.form = new App.Form.University({ model: this.model });
        this.form.parent = this;
        this.$el.fadeOut(300, function() {
            this.$el.html(this.form.render().$el);
            this.form.initializeSelect2();
        }.bind(this));
        this.$el.fadeIn(400);
        this.hasOpenedForm = true;
    },

     isOpen: function() {
        return this.hasOpenedForm;
    },

    closeForm: function() {
        this.hasOpenedForm = false;
    },

    remove_entry: function() {
        App.loader.show();
        App.instance.execute('university/remove', this.model.id, function(response) {
            this.$el.fadeOut(300, function() {
                this.remove();
            }.bind(this));
            App.loader.hide();
        }.bind(this));
    }
});

App.ItemView.EditableAttribute = Marionette.ItemView.extend({
    template: Handlebars.templates.edit_attribute,

    events: {
       'click .edit': 'edit'
    },

    initialize: function() {
        this.hasOpenedForm = false;
    },

    isOpen: function() {
        return this.hasOpenedForm;
    },

    closeForm: function() {
        this.hasOpenedForm = false;
    },

    edit: function() {
        this.form = new App.Form.Attribute({
            model: this.model,
            templateData: { name: this.model.get('name') }
        });
        this.form.parent = this;
        this.$el.fadeOut(300, function() {
            this.$el.html(this.form.render().$el);
        }.bind(this));
        this.$el.fadeIn(400);
        this.hasOpenedForm = true;
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