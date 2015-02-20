var App = {
    Controller: {},
    Command: {},
    Data: {},
    Model: {},
    Form: {
        Editor: {}
    },
    Collection: {},
    Router: {},
    ItemView: {},
    CollectionView: {},
    Layouts: {},
    Token: {
        CSRF: $.cookie('csrftoken')
    }
};

/**
 * Datetime settings
 */
moment.locale('pl-PL');


Marionette.Region.prototype.attachHtml = function(view){
  this.$el.hide();
  this.$el.html(view.el);
  this.$el.slideDown("fast");
};


/**
 *  Handlebars templates settings
 */
Handlebars.registerPartial('student', Handlebars.templates.university);


/**
 * AJAX setup
 */
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    contentType: "application/json; charset=utf-8",

    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", App.Token.CSRF);
        }
    }
});
