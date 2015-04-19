App.View.Map = Backbone.View.extend({
    template: Handlebars.templates.map,

    initialize: function(options) {
        this.container = options.container;
        this.cityItemView = options.itemView;
        this.currentCity = null;
    },

    render: function() {
        this.$el.html(this.template());
    },

    getRandomCity: function() {
        var randomIndex = Math.floor(Math.random()*this.collection.length);
        return this.collection.at(randomIndex);
    },


    loadMap: function() {
        this.map = new LeafletMap({
            name: "map-area",
            minZoom: 2,
            maxZoom: 12,
            x: 51.8,
            y: 19.3,
            zoom: 5,

            onMarkerClick: function(city) {
                this.loadCity(city.get('id'));
            }.bind(this)
        });

        this.collection.each(function(city) {
            this.map.addCity(city, city.get('latitude'), city.get('longitude'));
        }.bind(this));

        console.log(this.getRandomCity().toJSON());
        this.loadCity(this.getRandomCity().get('id'));
    },

    loadCity: function(pk) {
        if(this.currentCity != pk) {
            this.currentCity = pk;
            App.instance.execute('community/city', pk, function(response) {
                var model = new App.Model.City(response);
                this.container.show(new this.cityItemView({ model: model }));
            }.bind(this));
        }
    }
});