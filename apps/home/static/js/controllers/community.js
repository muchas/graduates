
App.Controller.CommunityController = {
    showDashboard: function() {
        App.loader.show();
        var layout = new App.Layouts.Dashboard();
        App.layout.content.show(layout);
        App.instance.execute('community/not-empty-cities', function(response) {
            var cities = new App.Collection.Cities(response);
            var map = new App.View.Map({
                collection: cities,
                container: layout.city,
                itemView: App.ItemView.City
            });
            layout.map.show(map);
            map.loadMap();
            App.loader.hide();
        });
    },

    showSupport: function() {
        var layout = new App.Layouts.Support();
        App.layout.content.show(layout);

        var support = new App.Model.Support();
        layout.form.show(new App.Form.Support({
            model: support
        }));
    },

    listTeachers: function() {
        App.loader.show();
        var layout = new App.Layouts.Teachers();
        App.layout.content.show(layout);
        App.instance.execute('community/teachers', function(response) {
           var teachers = new App.Collection.Teachers(response);
            layout.teachers.show(new App.CollectionView.Teachers({ collection: teachers }));
            App.loader.hide();
        });
    },

    showMyGroup: function() {
        console.log('Show my group');
    },

    showGroup: function(id) {
        App.loader.show();
        App.instance.execute('community/group', id, function(response) {
             var group = new App.Model.Group(response);
             App.layout.content.show(new App.ItemView.Group({ model: group }));
            App.loader.hide();
        });
    },

    showCommunity: function() {
        var layout = new App.Layouts.Community();
        App.layout.content.show(layout);
        App.loader.show();
        App.instance.execute('community/student-groups', function(response) {
            response = this.formatGroupsJSON(response);
           var groups = new App.Collection.Groups(response);
            layout.students.show(new App.CollectionView.Groups({ collection: groups }));
        }.bind(this));

        App.instance.execute('community/graduated-groups', function(response) {
            response = this.formatGroupsJSON(response);
           var groups = new App.Collection.Groups(response);
            layout.graduates.show(new App.CollectionView.Groups({ collection: groups }));
            App.loader.hide();
        }.bind(this));
    },

    formatGroupsJSON: function(groups) {
        var years = [];
        var buckets = {};
        _.each(groups, function(group) {
            if(!buckets[group.last_year]) {
                buckets[group.last_year] = [];
            }
            buckets[group.last_year].push(group);
        });
        _.each(buckets, function(value, key) {
            years.push({
                'year': key,
                'groups': value
            });
        });
        return years.reverse();
    },

    showUniversity: function() {

    },

    showCompany: function() {

    }
};