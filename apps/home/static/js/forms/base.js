App.Form.Base = Backbone.Form.extend({
    handleErrors: function(errors) {
       this.$el.find('.form-error').empty();
       _.each(errors, function(error, key) {
           // '.' char has special meaning in CSS, so we replace it with '-'
           key = key.replace(/\./g, '-');
           this.$el.find('.'+ key + '-error').html(Handlebars.templates.form_error({ message: error.message }));
       }.bind(this));
    }
});