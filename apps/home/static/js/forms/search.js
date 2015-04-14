
App.Form.Search = Marionette.ItemView.extend({
   template: Handlebars.templates.search_form,

    events: {
        "input input": "search",
        "keypress input": "press",
        "blur input": "blur",
        "focusin input": "focus",
        "click input": "select"
    },

    ui: {
        input: "input"
    },

    initialize: function() {
        this.current = "";
    },

    select: function() {
        this.ui.input.select();
    },

    focus: function() {
       if(this.ui.input.val() != "") {
           this.search();
       }
    },

    press: function(e) {
        if(e.which == 13) {
            e.preventDefault();
        }
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
        this.current = "";
        setTimeout(function() {
            this.collection.reset();
        }.bind(this), 250);
    },

    clear: function() {
        console.log('Wywolanie clear');
        if(this.ui.input.val() == "") {
            this.collection.reset();
        }
    }
});