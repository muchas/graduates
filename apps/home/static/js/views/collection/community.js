App.CollectionView.Teachers = Marionette.CollectionView.extend({
    childView: App.ItemView.Teacher
});

App.CollectionView.Groups = Marionette.CollectionView.extend({
    childView: App.ItemView.CommunityGroup
});

App.CollectionView.CityPeople = Marionette.CollectionView.extend({
    childView: App.ItemView.CityPerson,
    emptyView: App.ItemView.EmptyCityPerson
});

App.CollectionView.CityUniversities = Marionette.CollectionView.extend({
    childView: App.ItemView.CityUniversity,
    emptyView: App.ItemView.EmptyCityUniversity
});

App.CollectionView.CityCompanies = Marionette.CollectionView.extend({
    childView: App.ItemView.CityCompany,
    emptyView: App.ItemView.EmptyCityCompany
});
