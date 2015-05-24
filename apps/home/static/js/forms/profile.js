App.Form.Base = Backbone.Form.extend({
    events: {
        'click .save': 'save',
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

    hide: function() {
        this.$el.fadeOut(300, function(){
            if(this.parent) {
                this.parent.render();
                this.parent.closeForm();
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
        name: { type:'Text', editorClass: "form-control", validators: ['required'] },
        'company.name': { type: 'Text', editorClass: "form-control", validators: ['required'] },
        'city.name': { type: 'Text', editorClass: "form-control", validators: ['required'] },
        'branch.name': { type: 'Text', editorClass: "form-control", validators: ['required'] },
        start: { type: App.Form.Editor.Month, validators: [
            'required',
            { 'type': 'regexp', match: true, message: "Błędny format daty. Poprawny to MM/YYYY.", regexp: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/ }
        ] },
        end: { type: App.Form.Editor.Month, validators: [
            { 'type': 'regexp', match: true, message: "Błędny format daty. Poprawny to MM/YYYY.", regexp: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/ }
        ] }
    },

    onSave: function() {
        if(this.model.id) {
            this.updateEmployment();
        } else {
            this.createEmployment();
        }
    },

    initializeTypeahead: function() {
        this.$el.find('.city input').typeahead({
            items: 4,
            source: $.map(App.Data.cities, function(city) {
               return city.name;
            })
        });

        this.$el.find('.branch input').typeahead({
           items:4,
           source: $.map(App.Data.branches, function(branch) {
               return branch.name;
           })
        });
    },

    updateEmployment: function() {
        App.loader.show();
        App.instance.execute('employment/update', this.model.id, this.model.toJSON(), function(response) {
            this.hide();
            App.loader.hide();
        }.bind(this));
    },

    createEmployment: function() {
        App.loader.show();
        App.instance.execute('employment/create', this.model.toJSON(), function(response) {
            App.instance.vent.trigger('employment-created');
            this.hide();
            App.loader.hide();
        }.bind(this));
    }
});

App.Form.Description = App.Form.Base.extend({
   template: Handlebars.templates.description_form,

   schema: {
       description: { type: 'TextArea', editorClass: "form-control", editorAttrs: { rows: 4 } }
   },

   onSave: function() {
       App.loader.show();
       App.instance.execute('description/edit', this.model.toJSON(), function(response) {
           this.hide();
           App.loader.hide();
       }.bind(this));
   }
});


App.Form.MarriedName = App.Form.Base.extend({
   template: Handlebars.templates.married_name_form,

   schema: {
       married_name: { type: 'Text', editorClass: "form-control" }
   },

   onSave: function() {
       App.loader.show();
       App.instance.execute('married-name/edit', this.model.toJSON(), function(response) {
           App.instance.vent.trigger('married-name-changed');
           this.hide();
           App.loader.hide();
       }.bind(this));
   }
});

App.Form.University = App.Form.Base.extend({
    template: Handlebars.templates.university_form,
    schema: {
        school: { type: 'Text', editorClass: "form-control", validators: ['required'] },
        'university.id': {
            type: 'Select',
            editorClass: "form-control",
            options: function(callback, editor) {
                callback(new App.Collection.Universities(App.Data.universities));
            }
        },
        'department.name': { type: 'Text', editorClass: "form-control" },
        start: { type: App.Form.Editor.Month, validators: ['required',
                    {
                        'type': 'regexp',
                        match: true,
                        message: "Błędny format daty. Poprawny to MM/YYYY.",
                        regexp: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
                    }

        ] },
        end: { type: App.Form.Editor.Month, validators: [
                {
                    'type': 'regexp',
                    match: true,
                    message: "Błędny format daty. Poprawny to MM/YYYY.",
                    regexp: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
                }
        ] }
    },

    events: {
        'click .save': 'save',
        'click .cancel': 'hide',
        'click .unverified': 'shiftForm'
    },

    onSave: function() {
        console.log(this.model.toJSON());
        // TODO Refactory this hacky part
        // these fields are required in backend but doesn't matter if id exists
        this.model.set('university.name', 'Fake');
        this.model.set('university.city.name', 'Fake');
        if(this.model.id) {
            this.updateUniversity();
        } else {
            this.createUniversity();
        }
    },

    createUniversity: function() {
        App.loader.show();
        App.instance.execute('university/create', this.model.toJSON(), function(response) {
            App.instance.vent.trigger('student-created');
            this.model.set(response);
            this.hide();
            App.loader.hide();
        }.bind(this));
    },

    updateUniversity: function() {
        App.loader.show();
        App.instance.execute('university/update', this.model.id, this.model.toJSON(), function(response) {
            this.model.set(response);
            this.hide();
            App.loader.hide();
        }.bind(this));
    },

    initializeSelect2: function() {
      this.$el.find('select').select2();
    },

    shiftForm: function() {
        var form = new App.Form.UniversityExtended({ model: this.model });
        form.parent = this.parent;
        form.region = this.region;
        this.$el.fadeOut(300, function() {
            if(this.parent) {
                this.parent.$el.html(form.render().$el);
            }
            if(this.region) {
                this.region.show(form);
            }
            form.initializeTypeahead();
            this.remove();
        }.bind(this));
    }
});

App.Form.UniversityExtended = App.Form.Base.extend({
    template: Handlebars.templates.university_extended_form,
    schema: {
        school: { type: 'Text', editorClass: "form-control", validators: ['required'] },
        'university.name': { type: 'Text', editorClass: "form-control", validators: ['required'] },
        'university.city.name': { type: 'Text', editorClass: "form-control", validators: ['required'] },
        'department.name': { type: 'Text', editorClass: "form-control" },
        start: { type: App.Form.Editor.Month, validators: ['required',
                    {
                        'type': 'regexp',
                        match: true,
                        message: "Błędny format daty. Poprawny to MM/YYYY.",
                        regexp: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
                    }

        ] },
        end: { type: App.Form.Editor.Month, validators: [
                {
                    'type': 'regexp',
                    match: true,
                    message: "Błędny format daty. Poprawny to MM/YYYY.",
                    regexp: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
                }
        ] }
    },

    events: {
        'click .save': 'save',
        'click .cancel': 'hide',
        'click .back': 'shiftForm'
    },

    initializeTypeahead: function(options) {
        this.$el.find('.city input').typeahead({
            items: 4,
            source: $.map(App.Data.cities, function(city) {
               return city.name
            })
        })
    },

    onSave: function() {
        this.model.set('university.id', null);
        if(this.model.id) {
            this.updateUniversity();
        } else {
            this.createUniversity();
        }

        console.log('Save university - extended form');
        console.log(this.model.toJSON());
//        this.previousForm.remove();
//        this.hide();
    },

    createUniversity: function() {
        App.loader.show();
        App.instance.execute('university/create', this.model.toJSON(), function(response) {
            this.model.set(response);
            App.instance.vent.trigger('student-created');
            this.hide();
            App.loader.hide();
        }.bind(this));
    },

    updateUniversity: function() {
        App.loader.show();
        App.instance.execute('university/update', this.model.id, this.model.toJSON(), function(response) {
            this.model.set(response);
            this.hide();
            App.loader.hide();
        }.bind(this));
    },

    shiftForm: function() {
        var form = new App.Form.University({ model: this.model });
        form.parent = this.parent;
        form.region = this.region;
        this.$el.fadeOut(300, function() {
            if(this.parent) {
                this.parent.$el.html(form.render().$el);
            }
            if(this.region) {
                this.region.show(form);
            }
            form.initializeSelect2();
            this.remove();
        }.bind(this));
    }
});

App.Form.Attribute = App.Form.Base.extend({
    template: Handlebars.templates.attribute_form,

    schema: {
        value:  { type:'Text', editorClass: "form-control" },
        is_public: { type: 'Select', editorClass: "form-control", options: { true: 'Publiczne', false: 'Prywatne' }}
    },

    onSave: function() {
        App.loader.show();
        App.instance.execute('attribute/edit', this.model.id, this.model.toJSON(), function(response) {
            // this.commit() sets 'is_public' value to string "false" or string "true"
            // which is always boolean true for select - we fix this by setting boolean value from response
            this.model.set('is_public', response.is_public);
            this.hide();
            App.loader.hide();
        }.bind(this));
    }
});

App.Form.Photo = Marionette.ItemView.extend({
    template: Handlebars.templates.photo_form,

    ui: {
        'modal': '#photo-crop-modal',
        'image': '#photo-crop-modal img',
        'area': '#profile-photo-cropper > img',
        'zoomIn': '.zoom-in',
        'zoomOut': '.zoom-out'
    },

    events: {
        'click .upload': 'uploadImage',
        'click .remove': 'removeImage',
        'show.bs.modal @ui.modal': 'onShowModal',
        'hidden.bs.modal @ui.modal': 'onHideModal',
        'click @ui.zoomIn': 'zoomIn',
        'click @ui.zoomOut': 'zoomOut'
    },

    onRender: function() {
        this.$el.find('input[type=file]').on('change', this.onChangeFileInput.bind(this));
    },

    onChangeFileInput: function(event) {
        var files = event.target.files;
        console.log(event);
        if(files && files[0] && this.validateImage(files[0])) {
          this.file = files[0];
        } else {
           this.file = null;
        }
    },

    onShowModal: function() {
       var cropBoxData, canvasData;
       this.ui.area.cropper({
        aspectRatio: 1,
        autoCropArea: 0.8,
        dragCrop: false,
        movable: false,
        resizable: false,
        guides: false,
        minContainerWidth: 550,
        minContainerHeight: 450,
        built: function () {
          // Strict mode: set crop box data first
          this.ui.image.cropper('setCropBoxData', cropBoxData);
          this.ui.image.cropper('setCanvasData', canvasData);
        }.bind(this)
       });
    },

    onHideModal: function() {
        var data = this.ui.image.cropper('getData');
        this.ui.image.cropper('destroy');
        this.ui.image.attr('src', '');
        App.loader.show();
        App.instance.execute("profile/cropPhoto", data, function(response) {
            App.instance.vent.trigger('profile-photo-uploaded');
            this.render();
            App.loader.hide();
        }.bind(this));
    },

    zoomIn: function() {
        this.ui.image.cropper('zoom', 0.1);
    },

    zoomOut: function() {
        this.ui.image.cropper('zoom', -0.1);
    },

    validateImage: function(file) {
        if(file.size > 2621440) { // max-size 2.5 MB
            this.handleErrors({
               'picture': { message: 'Zbyt duży rozmiar pliku. Maksymalny rozmiar to 2.5 MB.' }
            });
            return false;
        }
        this.$el.find('.form-error').empty();
        return true;
    },

    uploadImage: function() {
        if(!this.file) {
            return null;
        }

        if(!this.validateImage(this.file)) {
            return null;
        }

        var data = new FormData();
        data.append('picture', this.file);

        App.loader.show();
        App.instance.execute("profile/uploadPhoto", data, function(response) {
            this.model.set(response);
            this.ui.image.attr('src', this.model.get('picture'));
            this.ui.modal.modal();
//            App.instance.vent.trigger('profile-photo-uploaded');
//            this.render();
            App.loader.hide();
        }.bind(this),
        function(response) {
            var errors = {};
            // change errors structure
            _.each(response, function(value, key) {
               errors[key] = { message: value[0] };
            });
            this.handleErrors(errors);
        }.bind(this));
    },

    removeImage: function() {
        App.loader.show();
        App.instance.execute("profile/removePhoto", function(response) {
            this.model.set(response);
            App.instance.vent.trigger('profile-photo-uploaded');
            this.render();
            App.loader.hide();
        }.bind(this));
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


App.Form.ChangePassword = Backbone.Form.extend({
    template: Handlebars.templates.change_password_form,

    schema: {
        new_password1: { type: 'Password', editorClass: "form-control", validators: ['required'] },
        new_password2: { type: 'Password', editorClass: "form-control", validators: ['required'] },
        old_password: { type: 'Password', editorClass: "form-control", validators: ['required'] }
    },

    events: {
      'click .send': 'save'
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
        App.loader.show();
        App.instance.execute('profile/changePassword', this.model.toJSON(),
            function(response) {

                var n = noty({
                    text: 'Hasło zostało zmienione.',
                    type: 'success'
                });

                setTimeout(function() {
                    n.close();
                }, 5000);

                this.clear();
                App.loader.hide();
            }.bind(this),
            function(response) {
                var errors = {};
                // change errors structure
                _.each(response, function(value, key) {
                   errors[key] = { message: value[0] };
                });
                this.handleErrors(errors);
                App.loader.hide();
            }.bind(this)
        );
    },

    clear: function() {
        _.each(this.fields, function(field) {
            field.setValue('');
        });
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
