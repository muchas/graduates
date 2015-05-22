App.Form.Editor.Month = Backbone.Form.editors.Base.extend({

    tagName: 'input',

    className: 'form-control',

    events: {
        'change': function() {
            // The 'change' event should be triggered whenever something happens
            // that affects the result of `this.getValue()`.
            this.trigger('change', this);
        },
        'focus': function() {
            // The 'focus' event should be triggered whenever an input within
            // this editor becomes the `document.activeElement`.
            this.trigger('focus', this);
            // This call automatically sets `this.hasFocus` to `true`.
        },
        'blur': function() {
            // The 'blur' event should be triggered whenever an input within
            // this editor stops being the `document.activeElement`.
            this.trigger('blur', this);
            // This call automatically sets `this.hasFocus` to `false`.
        }
    },

    initialize: function(options) {
        // Call parent constructor
        Backbone.Form.editors.Base.prototype.initialize.call(this, options);
    },

    render: function() {
        this.setValue(this.value);
        this.$el.datepicker({
            format: 'mm/yyyy',
            viewMode: 'years',
            minViewMode: 'months'
        });
        return this;
    },

    getValue: function() {
        var value = this.$el.val();
        if(!value) {
            return null;
        }
        if(/^((0[1-9])|(1[0-2]))\/(\d{4})$/.test(value)) {
            value = value.split("/");
            return value[1] + "-" + value[0] + "-" + "01";
        }
        return value;
    },

    setValue: function(value) {
        if(value) {
            value = value.split("-");
            this.$el.val(value[1] + "/" + value[0]);
        } else {
            this.$el.val("");
        }
    },

    focus: function() {
        if (this.hasFocus) return;

        // This method call should result in an input within this editor
        // becoming the `document.activeElement`.
        // This, in turn, should result in this editor's `focus` event
        // being triggered, setting `this.hasFocus` to `true`.
        // See above for more detail.
        this.$el.focus();
    },

    blur: function() {
        if (!this.hasFocus) return;

        this.$el.blur();
    }
});