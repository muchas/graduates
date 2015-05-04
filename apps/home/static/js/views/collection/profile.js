App.CollectionView.Employments = Marionette.CollectionView.extend({
    childView: App.ItemView.Employment
});

App.CollectionView.Universities = Marionette.CollectionView.extend({
   childView: App.ItemView.University
});

App.CollectionView.PersonalData = Marionette.CollectionView.extend({
   className: "dl-horizontal",
   childView: App.ItemView.PersonalData
});

App.CollectionView.EditableEmployments = Marionette.CollectionView.extend({
   childView: App.ItemView.EditableEmployment,

   isOpen: function() {
       var result = false;
       this.children.each(function(view) {
            if(view.isOpen()) result = true;
       });
       return result;
   }
});

App.CollectionView.EditableUniversities = Marionette.CollectionView.extend({
   childView: App.ItemView.EditableUniversity,

   isOpen: function() {
       var result = false;
       this.children.each(function(view) {
            if(view.isOpen()) result = true;
       });
       return result;
   }
});

App.CollectionView.EditableAttributes = Marionette.CollectionView.extend({
   childView: App.ItemView.EditableAttribute,

   isOpen: function() {
       var result = false;
       this.children.each(function(view) {
            if(view.isOpen()) result = true;
       });
       return result;
   },

   edit: function() {
       this.children.each(function(view) {
          view.edit();
       });
   }
});

App.CollectionView.ProfileConnectedPages = Marionette.CollectionView.extend({
    childView: App.ItemView.ProfileConnectedPage
});