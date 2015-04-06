
App.Form.Search = Marionette.ItemView.extend({
   template: Handlebars.templates.search_form,

    events: {
        "input input": "search"
    },

    ui: {
        input: "input"
    },

    initialize: function() {
        this.current = "";
        this.previous = "";
    },

    search: function() {
        var phrase = this.ui.input.val().trim();
        console.log("Wyszukuję "+ phrase + "...");
        if(phrase == "") {
            console.log('Czyszczenie kolekcji');
            this.collection.reset();
        } else if(phrase != this.current) {
            console.log("Wyszukuję "+ phrase + "...");
            this.collection.fetch({ data: { q: phrase }, success: this.clear.bind(this) });
            console.log(this.collection);
            this.current = phrase;
        }
    },

    blur: function(e) {
        console.log(e);
        this.collection.reset();
    },

    clear: function() {
        console.log('Wywolanie clear');
        if(this.ui.input.val() == "") {
            this.collection.reset();
        }
    }
});