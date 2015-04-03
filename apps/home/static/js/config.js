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
    View: {},
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
 * Form validation messages setup
 */
Backbone.Form.validators.errMessages.required = 'To pole jest wymagane.';
//Backbone.Form.validators.errMessages.match = 'This value must match the value of {{field}}';
//Backbone.Form.validators.errMessages.email = '{{value}} is an invalid email address.';


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

/**
 * Leaflet map
 */
  function LeafletMap(options) {
    this.markers = [];
    this.onMarkerClick = options.onMarkerClick;
    this.map = new L.Map(options.name);
    this.osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
    this.mblayer = new L.TileLayer(this.mbUrl, {id: 'examples.map-i875mjb7'});

    this.osm = new L.TileLayer(this.osmUrl, { minZoom: options.minZoom, maxZoom: options.maxZoom });
    this.map.setView(new L.LatLng(options.x, options.y), options.zoom);
    this.map.addLayer(this.mblayer);
  }

  LeafletMap.prototype.addCity = function(city, x, y) {
    var marker = L.marker([x, y]).addTo(this.map);
    marker.on('click', function() {
      this.onMarkerClick(city);
    }.bind(this));
    this.markers.push(marker);
  };
