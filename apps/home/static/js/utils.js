Handlebars.registerHelper("beautifydate", function (datetime) {
    datetime = moment(datetime);
    return datetime.format("MMMM YYYY");
});

Handlebars.registerHelper('trans',
  function(str){
    return (gettext != undefined ? gettext(str) : str);
  }
);

Handlebars.registerHelper("avatar", function(picture) {
   if(picture) {
       return picture;
   } else {
       return "media/unknown.png"
   }
});

String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
