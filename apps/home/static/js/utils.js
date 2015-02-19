Handlebars.registerHelper("beautifydate", function (datetime) {
    datetime = moment(datetime);
    return datetime.format("MMMM YYYY");
});