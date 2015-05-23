Handlebars.registerHelper("beautifydate", function (datetime) {
    datetime = moment(datetime);
    return datetime.format("MMMM YYYY");
});

Handlebars.registerHelper("datefromnow", function (datetime) {
    datetime = moment(datetime);
    return datetime.fromNow();
});

Handlebars.registerHelper('breaklines', function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new Handlebars.SafeString(text);
});

Handlebars.registerHelper('wrapURL', function(str) {
    str = Handlebars.Utils.escapeExpression(str);

    var matches = str.match(/http\S+/);
    if(matches) {
        var wrapped = matches.map(function(v, i, a) {
            return '<a href="' + v + '">' + v + '</a>';
        });

        for (var i = 0; i < matches.length; i++) {
            str = str.replace(matches[i], wrapped[i]);
        }
    }

    return new Handlebars.SafeString(str)
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
