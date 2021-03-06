this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["access_denied"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return " <div class=\"error-container\">\n\n    <div class=\"error-code\">\n    403\n    </div> <!-- /.error-code -->\n\n    <div class=\"error-details\">\n\n      <h4>Ups, <span class=\"text-primary\">Dostęp zabroniony</span>.</h4>\n\n      <p></p>\n\n    </div> <!-- /.error-details -->\n\n  </div> <!-- /.error -->\n";
  },"useData":true});

this["Handlebars"]["templates"]["attribute"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<dt>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + ":</dt>\n<dd>"
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "</dd>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.value : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true});

this["Handlebars"]["templates"]["attribute_form"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"row\">\n    <div class=\"col-md-9\">\n        <div style=\"float:left; padding-top:7px;\"><strong>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + ": </strong></div>\n        <div data-editors=\"value\" style=\"width: 40%; float:left; margin-left: 10px;\"></div>\n        <div data-editors=\"is_public\" style=\"width: 30%; float:left; margin-left: 10px;\"></div>\n    </div>\n    <div class=\"col-md-3\">\n        <a class=\"save btn btn-default\"><i class=\"fa fa-check\"></i> Zapisz</a>\n        <a class=\"cancel btn btn-default\"><i class=\"fa fa-times\"></i> Anuluj</a>\n    </div>\n</div>\n<hr />";
},"useData":true});

this["Handlebars"]["templates"]["description"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "";
},"useData":true});

this["Handlebars"]["templates"]["description_form"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-8\" style=\"margin-bottom: 30px;\">\n        <h5>Jak potoczyły się Twoje losy?</h5>\n        <div data-editors=\"description\" style=\"margin-bottom: 10px;\"></div>\n        <a class=\"save btn btn-default\"><i class=\"fa fa-check\"></i> Zapisz</a>\n        <a class=\"cancel btn btn-default\"><i class=\"fa fa-times\"></i> Anuluj</a>\n    </div>\n</div>";
  },"useData":true});

this["Handlebars"]["templates"]["edit_attribute"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "        <span class=\"label label-info\" style=\"margin-left:5px\">Publiczne</span>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "        <span class=\"label label-primary\" style=\"margin-left:5px\">Prywatne</span>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"row\">\n    <div class=\"col-md-10\">\n        <strong>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</strong>: "
    + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"value","hash":{},"data":data}) : helper)))
    + "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.is_public : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n    <div class=\"col-md-2\">\n        <a class=\"edit btn btn-default\"><i class=\"fa fa-edit\"></i> Edytuj</a>\n    </div>\n</div>\n<hr />";
},"useData":true});

this["Handlebars"]["templates"]["edit_description"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            "
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "\n";
},"3":function(depth0,helpers,partials,data) {
  return "                Brak opisu.\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"row\">\n    <div class=\"col-md-10\">\n        <p>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.description : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </p>\n    </div>\n    <div class=\"col-md-2\">\n        <a class=\"btn btn-default edit\"><i class=\"fa fa-edit\"></i> Edytuj</a>\n    </div>\n</div>\n<br />";
},"useData":true});

this["Handlebars"]["templates"]["edit_employment"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"start","hash":{},"data":data}) : helper)));
  },"3":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing;
  stack1 = ((helpers.beautifydate || (depth0 && depth0.beautifydate) || helperMissing).call(depth0, (depth0 != null ? depth0.end : depth0), {"name":"beautifydate","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"end","hash":{},"data":data}) : helper)));
  },"6":function(depth0,helpers,partials,data) {
  return "obecnie";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<div class=\"row\">\n    <div class=\"col-md-9\">\n        <h5>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.name : stack1), depth0))
    + ", "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h5>\n        <h6 class=\"text-muted\">Branża: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.branch : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h6>\n        <h6 class=\"text-muted\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.city : depth0)) != null ? stack1.name : stack1), depth0))
    + ", ";
  stack1 = ((helpers.beautifydate || (depth0 && depth0.beautifydate) || helperMissing).call(depth0, (depth0 != null ? depth0.start : depth0), {"name":"beautifydate","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " - ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.end : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</h6>\n    </div>\n    <div class=\"col-md-3\">\n        <a class=\"edit btn btn-default\"><i class=\"fa fa-edit\"></i> Edytuj</a>\n        <a class=\"remove btn btn-default\"><i class=\"fa fa-times\"></i> Usuń</a>\n    </div>\n</div>\n<hr>\n";
},"useData":true});

this["Handlebars"]["templates"]["edit_profile"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "  <div class=\"layout layout-main-right layout-stack-sm\">\n\n        <div class=\"col-md-3 col-sm-4 layout-sidebar\">\n\n          <div class=\"nav-layout-sidebar-skip\">\n            <strong>Tab Navigation</strong> / <a href=\"#settings-content\">Skip to Content</a>\n          </div>\n\n          <ul id=\"myTab\" class=\"nav nav-layout-sidebar nav-stacked\" style=\"min-height: 350px;\">\n              <li class=\"active\">\n              <a href=\"#profile-tab\" data-toggle=\"tab\">\n              <i class=\"fa fa-user\"></i>\n              &nbsp;&nbsp;Ustawienia profilu\n              </a>\n            </li>\n\n            <li>\n              <a href=\"#password-tab\" data-toggle=\"tab\">\n              <i class=\"fa fa-lock\"></i>\n              &nbsp;&nbsp;Zmiana hasła\n              </a>\n            </li>\n          </ul>\n        </div> <!-- /.col -->\n\n\n\n        <div class=\"col-md-9 col-sm-8 layout-main\">\n\n          <div id=\"settings-content\" class=\"tab-content stacked-content\">\n\n            <div class=\"tab-pane fade in active\" id=\"profile-tab\">\n\n              <h3 class=\"content-title\"><u>Edycja profilu</u></h3>\n                <div class=\"row\">\n                <div class=\"col-md-3\">\n                     <div class=\"profile-avatar\">\n                        <img src=\"https://scontent-ams.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/1502480_571617809599850_387561572_n.jpg?oh=42d2e1a8b1bdbcd4e7163bd299c6eae7&oe=555D4B50\" class=\"profile-avatar-img thumbnail\" alt=\"Profile Image\">\n                    </div> <!-- /.profile-avatar -->\n                </div>\n                <div class=\"col-md-3\">\n                      <h3>Sławomir Mucha</h3>\n\n                </div>\n</div>\n                <div class=\"row-fluid\">\n                    <h4 class=\"content-title\"><u>Zdjęcie</u></h4>\n                    <div id=\"basic\" style=\"margin-bottom: 20px;\">\n                        <form>\n                            <input type=\"file\" style=\"display: inline-block;float:left\" />\n                        <a href=\"\" class=\"btn btn-primary\">Ustaw</a>\n                        <a href=\"\" class=\"btn btn-default\">Usuń aktualne</a>\n                        </form>\n                    </div>\n\n                    <h4 class=\"content-title\"><u>Dane kontaktowe</u></h4>\n                    <p>Pole ustawione jako <i>publiczne</i> widoczne jest dla wszystkich użytkowników portalu, zaś <i>prywatne</i> jedynie dla dyrekcji szkoły.</p>\n                    <hr />\n                    <div id=\"attributes\"></div>\n\n                    <h4 class=\"content-title\"><u>Edukacja</u></h4>\n                    <div id=\"universities\"></div>\n                    <a id=\"add-university\" class=\"btn btn-default\"><i class=\"fa fa-plus-circle\"></i> Dodaj uczelnię</a>\n\n\n                    <h4 style=\"margin-top: 30px;\" class=\"content-title\"><u>Krótki opis</u></h4>\n                    <div id=\"description\"></div>\n\n                    <h4 class=\"content-title\"><u>Doświadczenie</u></h4>\n                    <div id=\"employments\"></div>\n                    <div id=\"new-employment\"></div>\n                    <a id=\"add-employment\" class=\"btn btn-default\"><i class=\"fa fa-plus-circle\"></i> Dodaj stanowisko</a>\n\n                </div>\n            </div> <!-- /.tab-content -->\n          </div>\n        </div> <!-- /.col -->\n      </div> <!-- /.row -->\n";
  },"useData":true});

this["Handlebars"]["templates"]["edit_university"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <h6 class=\"text-muted\">Wydział: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.department : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h6>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"start","hash":{},"data":data}) : helper)));
  },"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"end","hash":{},"data":data}) : helper)));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<div class=\"row\">\n    <div class=\"col-md-9\">\n        <h5>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.university : depth0)) != null ? stack1.name : stack1), depth0))
    + ", "
    + escapeExpression(((helper = (helper = helpers.school || (depth0 != null ? depth0.school : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"school","hash":{},"data":data}) : helper)))
    + "</h5>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.department : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        <h6 class=\"text-muted\">";
  stack1 = ((helpers.beautifydate || (depth0 && depth0.beautifydate) || helperMissing).call(depth0, (depth0 != null ? depth0.start : depth0), {"name":"beautifydate","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " - ";
  stack1 = ((helpers.beautifydate || (depth0 && depth0.beautifydate) || helperMissing).call(depth0, (depth0 != null ? depth0.end : depth0), {"name":"beautifydate","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</h6>\n        <br>\n    </div>\n    <div class=\"col-md-3\">\n        <a class=\"edit btn btn-default\"><i class=\"fa fa-edit\"></i> Edytuj</a>\n        <a class=\"remove btn btn-default\"><i class=\"fa fa-times\"></i> Usuń</a>\n    </div>\n</div>\n<hr>";
},"useData":true});

this["Handlebars"]["templates"]["employment"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"start","hash":{},"data":data}) : helper)));
  },"3":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing;
  stack1 = ((helpers.beautifydate || (depth0 && depth0.beautifydate) || helperMissing).call(depth0, (depth0 != null ? depth0.end : depth0), {"name":"beautifydate","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"end","hash":{},"data":data}) : helper)));
  },"6":function(depth0,helpers,partials,data) {
  return "obecnie";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<h5>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.name : stack1), depth0))
    + ", "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h5>\n<h6 class=\"text-muted\">Branża: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.branch : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h6>\n<h6 class=\"text-muted\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.city : depth0)) != null ? stack1.name : stack1), depth0))
    + ", ";
  stack1 = ((helpers.beautifydate || (depth0 && depth0.beautifydate) || helperMissing).call(depth0, (depth0 != null ? depth0.start : depth0), {"name":"beautifydate","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " - ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.end : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</h6>\n<hr>";
},"useData":true});

this["Handlebars"]["templates"]["employment_form"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <h5>Nazwa firmy</h5>\n            <div data-editors=\"company.name\" style=\"\"></div>\n            <h5>Miasto</h5>\n            <div data-editors=\"city.name\" style=\"\"></div>\n            <h5>Początek</h5>\n            <div data-editors=\"start\"></div>\n        </div>\n        <div class=\"col-md-4\">\n            <h5>Stanowisko</h5>\n            <div data-editors=\"name\"></div>\n            <h5>Branża</h5>\n            <div data-editors=\"branch.name\" style=\"\"></div>\n            <h5>Koniec</h5>\n            <div data-editors=\"end\"></div>\n        </div>\n    </div>\n    <div class=\"row-fluid\">\n        <a class=\"save btn btn-default\"><i class=\"fa fa-check\"></i> Zapisz</a>\n        <a class=\"cancel btn btn-default\"><i class=\"fa fa-times\"></i> Anuluj</a>\n    </div>\n    <hr />\n</div>";
  },"useData":true});

this["Handlebars"]["templates"]["profile"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "            <a href=\"#/profile/edit\" class=\"list-group-item\">\n                  <i class=\"fa fa-edit text-primary\"></i> &nbsp;&nbsp; Edytuj profil\n                  <i class=\"fa fa-chevron-right list-group-chevron\"></i>\n            </a>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "          <a href=\"javascript:;\" class=\"list-group-item\">\n              <i class=\"fa fa-envelope text-primary\"></i> &nbsp;&nbsp; Wyślij wiadomość\n              <i class=\"fa fa-chevron-right list-group-chevron\"></i>\n            </a>\n";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "          ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.is_male : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.program(8, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.subjects : depth0), {"name":"each","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "          z lat\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.teacher_learn_years : depth0), {"name":"each","hash":{},"fn":this.program(12, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"6":function(depth0,helpers,partials,data) {
  return "Nauczyciel";
  },"8":function(depth0,helpers,partials,data) {
  return "Nauczycielka";
  },"10":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "              "
    + escapeExpression(((helper = (helper = helpers.name_brand || (depth0 != null ? depth0.name_brand : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name_brand","hash":{},"data":data}) : helper)))
    + "\n";
},"12":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(depth0, depth0))
    + "\n";
},"14":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "          ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.is_male : depth0), {"name":"if","hash":{},"fn":this.program(15, data),"inverse":this.program(17, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n          <a href=\"\">klasy "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.symbol : stack1), depth0))
    + "</a> z lat "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.first_year : stack1), depth0))
    + "-"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.last_year : stack1), depth0))
    + "\n";
},"15":function(depth0,helpers,partials,data) {
  return "Uczeń";
  },"17":function(depth0,helpers,partials,data) {
  return "Uczennica";
  },"19":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <h5 class=\"text-muted\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.universities : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.university : stack1)) != null ? stack1.name : stack1), depth0))
    + " - "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.universities : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.school : stack1), depth0))
    + "</h5>\n";
},"21":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <h5 class=\"text-muted\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.employments : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.company : stack1)) != null ? stack1.name : stack1), depth0))
    + " - "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.employments : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.name : stack1), depth0))
    + "</h5>\n";
},"23":function(depth0,helpers,partials,data) {
  return "      <h4 class=\"content-title\"><u>Kontakt</u></h4>\n";
  },"25":function(depth0,helpers,partials,data) {
  return "<br>";
  },"27":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "      <h4 class=\"content-title\"><u>Edukacja</u></h4>\n        <h5>Liceum</h5>\n           <p>W V LO ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.is_male : depth0), {"name":"if","hash":{},"fn":this.program(28, data),"inverse":this.program(30, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " do <a href=\"\">klasy "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.symbol : stack1), depth0))
    + "</a> z lat "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.first_year : stack1), depth0))
    + "-"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.last_year : stack1), depth0))
    + ", której wychowawcą ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.tutor : stack1)) != null ? stack1.is_male : stack1), {"name":"if","hash":{},"fn":this.program(32, data),"inverse":this.program(34, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + " <a href=\"#/person/"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.tutor : stack1)) != null ? stack1.id : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.tutor : stack1)) != null ? stack1.first_name : stack1), depth0))
    + " "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.tutor : stack1)) != null ? stack1.last_name : stack1), depth0))
    + "</a>.</p>\n\n        <br>\n\n";
},"28":function(depth0,helpers,partials,data) {
  return "uczęszczał";
  },"30":function(depth0,helpers,partials,data) {
  return "uczęszczała";
  },"32":function(depth0,helpers,partials,data) {
  return "był";
  },"34":function(depth0,helpers,partials,data) {
  return "była";
  },"36":function(depth0,helpers,partials,data) {
  var stack1, buffer = "      <h4 class=\"content-title\"><u>Obecnie</u></h4>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.description : depth0), {"name":"if","hash":{},"fn":this.program(37, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.employments : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(39, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"37":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <h5>Krótki opis</h5>\n         <p>"
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n        <br>\n";
},"39":function(depth0,helpers,partials,data) {
  return "        <h4>Doświadczenie</h4>\n        <br>\n";
  },"41":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <h5 class=\"content-title\"><u>Wspólne z "
    + escapeExpression(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"first_name","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"last_name","hash":{},"data":data}) : helper)))
    + "</u></h5>\n\n        <div class=\"well\">\n\n\n          <ul class=\"icons-list text-md\">\n\n            <li>\n              <i class=\"icon-li fa fa-university\"></i>\n\n              <strong>1</strong> uczelnia wyższa\n              <br>\n            </li>\n\n            <li>\n              <i class=\"icon-li fa fa-home\"></i>\n\n              <strong>3</strong> miasta, z którymi jesteście powiązani\n              <br>\n            </li>\n\n            <li>\n              <i class=\"icon-li fa fa-suitcase\"></i>\n\n              branża IT\n              <br>\n            </li>\n            <li>\n              <i class=\"icon-li fa fa-user\"></i>\n\n               wychowawca klasy w liceum\n              <br>\n            </li>\n          </ul>\n\n        </div> <!-- /.well -->\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"row\">\n    <div class=\"col-md-3 col-sm-5\">\n      <div class=\"profile-avatar\">\n        <img src=\"https://scontent-ams.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/1502480_571617809599850_387561572_n.jpg?oh=42d2e1a8b1bdbcd4e7163bd299c6eae7&oe=555D4B50\" class=\"profile-avatar-img thumbnail\" alt=\"Profile Image\">\n      </div> <!-- /.profile-avatar -->\n\n      <div class=\"list-group\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.is_owner : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </div> <!-- /.list-group -->\n    </div> <!-- /.col -->\n\n    <div class=\"col-md-6 col-sm-7\">\n      <h3>"
    + escapeExpression(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"first_name","hash":{},"data":data}) : helper)))
    + " "
    + escapeExpression(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"last_name","hash":{},"data":data}) : helper)))
    + "</h3>\n      <h5>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.teacher_learn_years : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(14, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </h5>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.universities : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.employments : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(21, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      <br>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.personal_data : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      <div id=\"personal-data\"></div>\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.personal_data : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.group : depth0), {"name":"if","hash":{},"fn":this.program(27, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      <div id=\"universities\"></div>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.show_now_section : depth0), {"name":"if","hash":{},"fn":this.program(36, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        <div id=\"employments\"></div>\n\n        <br class=\"visible-xs\">\n        <br class=\"visible-xs\">\n\n      </div> <!-- /.col -->\n\n      <div class=\"col-md-3\">\n\n          <h5 class=\"content-title\"><u>Social Stats</u></h5>\n\n        <div class=\"list-group\">\n\n          <a href=\"javascript:;\" class=\"list-group-item\">\n              <h3 class=\"pull-right\"><i class=\"fa fa-eye text-primary\"></i></h3>\n              <h4 class=\"list-group-item-heading\">38,847</h4>\n              <p class=\"list-group-item-text\">Profile Views</p>\n            </a>\n\n          <a href=\"javascript:;\" class=\"list-group-item\">\n            <h3 class=\"pull-right\"><i class=\"fa fa-facebook-square  text-primary\"></i></h3>\n            <h4 class=\"list-group-item-heading\">3,482</h4>\n            <p class=\"list-group-item-text\">Facebook Likes</p>\n          </a>\n\n          <a href=\"javascript:;\" class=\"list-group-item\">\n            <h3 class=\"pull-right\"><i class=\"fa fa-twitter-square  text-primary\"></i></h3>\n            <h4 class=\"list-group-item-heading\">5,845</h4>\n            <p class=\"list-group-item-text\">Twitter Followers</p>\n          </a>\n        </div> <!-- /.list-group -->\n\n        <br>\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.is_owner : depth0), {"name":"unless","hash":{},"fn":this.program(41, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </div> <!-- /.col -->\n\n</div> <!-- /.row -->\n";
},"useData":true});

this["Handlebars"]["templates"]["university"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<h6 class=\"text-muted\">Wydział: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.department : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h6>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.start || (depth0 != null ? depth0.start : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"start","hash":{},"data":data}) : helper)));
  },"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return escapeExpression(((helper = (helper = helpers.end || (depth0 != null ? depth0.end : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"end","hash":{},"data":data}) : helper)));
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "<h5>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.university : depth0)) != null ? stack1.name : stack1), depth0))
    + ", "
    + escapeExpression(((helper = (helper = helpers.school || (depth0 != null ? depth0.school : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"school","hash":{},"data":data}) : helper)))
    + "</h5>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.department : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "<h6 class=\"text-muted\">";
  stack1 = ((helpers.beautifydate || (depth0 && depth0.beautifydate) || helperMissing).call(depth0, (depth0 != null ? depth0.start : depth0), {"name":"beautifydate","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += " - ";
  stack1 = ((helpers.beautifydate || (depth0 && depth0.beautifydate) || helperMissing).call(depth0, (depth0 != null ? depth0.end : depth0), {"name":"beautifydate","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</h6>\n<br>";
},"useData":true});

this["Handlebars"]["templates"]["university_extended_form"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div>\n    <div class=\"row\">\n        <div class=\"col-md-4\">\n            <h5>Uczelnia</h5>\n            <div data-editors=\"university.name\" style=\"\"></div>\n            <h5>Kierunek</h5>\n            <div data-editors=\"school\" style=\"\"></div>\n            <h5>Początek</h5>\n            <div data-editors=\"start\"></div>\n        </div>\n        <div class=\"col-md-4\">\n            <h5>Miasto</h5>\n            <div data-editors=\"university.city.name\"></div>\n            <h5>Wydział</h5>\n            <div data-editors=\"department.name\"></div>\n            <h5>Koniec</h5>\n            <div data-editors=\"end\"></div>\n        </div>\n    </div>\n    <div class=\"row-fluid\">\n        <a class=\"save btn btn-default\"><i class=\"fa fa-check\"></i> Zapisz</a>\n        <a class=\"back btn btn-default\"><i class=\"fa fa-backward\"></i> Powrót do listy uczelni</a>\n        <a class=\"cancel btn btn-default\"><i class=\"fa fa-times\"></i> Anuluj</a>\n    </div>\n    <hr />\n</div>";
  },"useData":true});

this["Handlebars"]["templates"]["university_form"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n    <div class=\"col-md-4\">\n        <h5>Uczelnia</h5>\n        <div data-editors=\"university.id\" style=\"\"></div>\n        <a>Twojej uczelni brakuje na liście? Kliknij!</a>\n        <h5>Kierunek</h5>\n        <div data-editors=\"school\" style=\"\"></div>\n        <h5>Początek</h5>\n        <div data-editors=\"start\"></div>\n    </div>\n    <div class=\"col-md-4\">\n        <h5>Wydział</h5>\n        <div data-editors=\"department.name\"></div>\n        <!--<h5>Branża</h5>-->\n\n        <h5>Koniec</h5>\n        <div data-editors=\"end\"></div>\n    </div>\n</div>\n<div class=\"row-fluid\">\n    <a class=\"save btn btn-default\"><i class=\"fa fa-check\"></i> Zapisz</a>\n    <a class=\"cancel btn btn-default\"><i class=\"fa fa-times\"></i> Anuluj</a>\n</div>\n<hr />";
  },"useData":true});