App.Layouts.Teachers = Marionette.LayoutView.extend({
    template: Handlebars.templates.teachers,
    regions: {
        'teachers': '#teachers'
    }
});

App.Layouts.Community = Marionette.LayoutView.extend({
   template: Handlebars.templates.community,
   regions: {
       'students': '#students',
       'graduates': '#graduates'
   }
});

App.Layouts.Dashboard = Marionette.LayoutView.extend({
   template: Handlebars.templates.dashboard,
    regions: {
        'map': '#map',
        'city': '#city'
    }
});