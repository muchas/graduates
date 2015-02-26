App.ItemView.Employment = Marionette.ItemView.extend({
   template: Handlebars.templates.employment
});

App.ItemView.University = Marionette.ItemView.extend({
   template: Handlebars.templates.university
});

App.ItemView.PersonalData = Marionette.ItemView.extend({
   template: Handlebars.templates.attribute
});

App.ItemView.EditableEmployment = Marionette.ItemView.extend({
    template: Handlebars.templates.edit_employment,
    events: {
       'click .edit': 'edit',
       'click .remove': 'remove_entry'
    },

    edit: function() {
        this.form = new App.Form.Employment({ model: this.model });
        this.form.parent = this;
        this.$el.fadeOut(300, function() {
            this.$el.html(this.form.render().$el);
            this.form.initializeTypeahead();
        }.bind(this));
        this.$el.fadeIn(400);
    },

    remove_entry: function() {
        App.instance.execute('employment/remove', this.model.id, function(response) {
            this.$el.fadeOut(300, function() {
                this.remove();
            }.bind(this));
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

    edit: function() {
        this.form = new App.Form.University({ model: this.model });
        this.form.parent = this;
        this.$el.fadeOut(300, function() {
            this.$el.html(this.form.render().$el);
        }.bind(this));
        this.$el.fadeIn(400);
    },

    remove_entry: function() {
        App.instance.execute('university/remove', this.model.id, function(response) {
            this.$el.fadeOut(300, function() {
                this.remove();
            }.bind(this));
        }.bind(this));
    }
});

App.ItemView.EditableAttribute = Marionette.ItemView.extend({
    template: Handlebars.templates.edit_attribute,

    events: {
       'click .edit': 'edit'
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
    }
});


App.ItemView.ProfileEditHeader = Marionette.ItemView.extend({
   template: Handlebars.templates.edit_profile_header
});