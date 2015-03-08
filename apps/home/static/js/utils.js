Handlebars.registerHelper("beautifydate", function (datetime) {
    datetime = moment(datetime);
    return datetime.format("MMMM YYYY");
});

Handlebars.registerHelper('trans',
  function(str){
    return (gettext != undefined ? gettext(str) : str);
  }
);