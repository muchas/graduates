App.Form.Base = Backbone.Form.extend({
    events: {
        'click .save': 'save',
        'click .cancel': 'hide'
    },

    save: function() {
       if(this.validate() === null) {
           this.commit();
       }
       this.onSave();
    },

    hide: function() {
        this.$el.fadeOut(300, function(){
            if(this.parent) {
                this.parent.render();
            }
            if(this.region) {
                this.region.empty();
            }
            this.remove();
        }.bind(this));
    },

    onShow: function(view, region, options) {
        this.region = region;
    }
});


App.Form.Employment = App.Form.Base.extend({
    template: Handlebars.templates.employment_form,

    schema: {
        name: { type:'Text', editorClass: "form-control" },
        'company.name': { type: 'Text', editorClass: "form-control" },
        'city.name': { type: 'Text', editorClass: "form-control" },
        'branch.name': { type: 'Text', editorClass: "form-control" },
        start: { type: App.Form.Editor.Month },
        end: { type: App.Form.Editor.Month }
    },

    onSave: function() {
        if(this.model.id) {
            this.updateEmployment();
        } else {
            this.createEmployment();
        }
    },

    updateEmployment: function() {
        App.instance.execute('employment/update', this.model.id, this.model.toJSON(), function(response) {
            this.hide();
        }.bind(this));
    },

    createEmployment: function() {
        App.instance.execute('employment/create', this.model.toJSON(), function(response) {
            App.instance.vent.trigger('employment-created');
            this.hide();
        }.bind(this));
    }
});

App.Form.Description = App.Form.Base.extend({
   template: Handlebars.templates.description_form,

   schema: {
       description: { type: 'TextArea', editorClass: "form-control", editorAttrs: { rows: 4 } }
   },

   onSave: function() {
       // todo show loader on $el
       App.instance.execute('description/edit', this.model.toJSON(), function(response) {
            // todo hide loader
           this.hide();
       }.bind(this));
   }
});

App.Form.University = App.Form.Base.extend({
    template: Handlebars.templates.university_form,
    schema: {
        school: { type: 'Text', editorClass: "form-control" },
        'university.id': { type: 'Select', editorClass: "form-control", options: { 1: 'AGH',  2: 'UW', 3 :'UJ'} },
        'department.name': { type: 'Text', editorClass: "form-control" },
        start: { type: App.Form.Editor.Month },
        end: { type: App.Form.Editor.Month }
    },

    onSave: function() {
        console.log('Save university');
        console.log(this.model.toJSON());
    }
});

App.Form.UniversityExtended = Backbone.Form.extend({
    template: Handlebars.templates.university_extended_form,
    schema: {
        school: { type: 'Text', editorClass: "form-control" },
        'university.name': { type: 'Text', editorClass: "form-control" },
        'university.city.name': { type: 'Text', editorClass: "form-control" },
        'department.name': { type: 'Text', editorClass: "form-control" },
        start: { type: App.Form.Editor.Month },
        end: { type: App.Form.Editor.Month }
    },

    onSave: function() {
        console.log('Save university - extended form');
        console.log(this.model.toJSON());
    }
});

App.Form.Attribute = App.Form.Base.extend({
    template: Handlebars.templates.attribute_form,

    schema: {
        value:  { type:'Text', editorClass: "form-control" },
        is_public: { type: 'Select', editorClass: "form-control", options: { true: 'Publiczne', false: 'Prywatne' }}
    },

    onSave: function() {
        // todo show loader
        App.instance.execute('attribute/edit', this.model.id, this.model.toJSON(), function(response) {
            // todo remove loader
            // this.commit() sets 'is_public' value to string "false" or string "true"
            // which is always boolean true for select - we fix this by setting boolean value from response
            this.model.set('is_public', response.is_public);
            this.hide();
        }.bind(this));
    }
});