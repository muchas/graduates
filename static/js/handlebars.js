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

this["Handlebars"]["templates"]["community"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"layout layout-stack-sm layout-main-left\">\n\n        <div class=\"layout-main\">\n\n          <div class=\"portlet\">\n            <div class=\"portlet-body\">\n              <div class=\"portlet row\" style=\"margin-bottom: 0\">\n\n                <h3 class=\"portlet-title\">\n                  <u>Uczniowie</u>\n                </h3>\n\n                <div id=\"students\" class=\"portlet-body\" style=\"margin-bottom: 30px;\">\n\n                </div>\n\n            </div>\n            <div class=\"portlet row\">\n\n                <h3 class=\"portlet-title\">\n                  <u>Absolwenci</u>\n                </h3>\n\n                <div class=\"portlet-body\">\n                    <div id=\"graduates\"></div>\n                </div>\n            </div>\n\n          </div>\n        </div>\n    </div>\n</div>";
  },"useData":true});

this["Handlebars"]["templates"]["community_group"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "      <li><a href=\"#/group/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">Klasa "
    + escapeExpression(((helper = (helper = helpers.symbol || (depth0 != null ? depth0.symbol : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"symbol","hash":{},"data":data}) : helper)))
    + "</a> - wych. <a href=\"#/person/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.tutor : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.tutor : depth0)) != null ? stack1.full_name : stack1), depth0))
    + "</a></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"col-md-4\" style=\"margin-bottom: 25px\">\n    <h4>Rocznik "
    + escapeExpression(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"year","hash":{},"data":data}) : helper)))
    + "</h4>\n    <ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.groups : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </ul>\n</div>";
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

this["Handlebars"]["templates"]["edit_married_name"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <strong>Aktualne nazwisko:</strong> "
    + escapeExpression(((helper = (helper = helpers.married_name || (depth0 != null ? depth0.married_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"married_name","hash":{},"data":data}) : helper)))
    + "\n";
},"3":function(depth0,helpers,partials,data) {
  return "            <strong>Nazwisko nie zostało zmienione.</strong>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div style=\"min-height: 150px;\">\n    <h4 class=\"content-title\"><u>Zmiana nazwiska</u></h4>\n        <div class=\"help-block\">\n            Jeżeli od czasu liceum zmieniłaś nazwisko i chcesz, aby uaktualnić je w naszej bazie, wyedytuj poniższe pole.\n        </div>\n    <div class=\"row\">\n    <div class=\"col-md-10\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.married_name : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n    <div class=\"col-md-2\">\n        <a class=\"btn btn-default edit\"><i class=\"fa fa-edit\"></i> Edytuj</a>\n    </div>\n    </div>\n</div>";
},"useData":true});

this["Handlebars"]["templates"]["edit_profile"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "  <div class=\"layout layout-main-right layout-stack-sm\">\n\n        <div class=\"col-md-3 col-sm-4 layout-sidebar\">\n\n          <div class=\"nav-layout-sidebar-skip\">\n            <strong>Tab Navigation</strong> / <a href=\"#settings-content\">Skip to Content</a>\n          </div>\n\n          <ul id=\"myTab\" class=\"nav nav-layout-sidebar nav-stacked\" style=\"min-height: 350px;\">\n              <li class=\"active\">\n              <a href=\"#profile-tab\" data-toggle=\"tab\">\n              <i class=\"fa fa-user\"></i>\n              &nbsp;&nbsp;Ustawienia profilu\n              </a>\n            </li>\n\n            <li>\n              <a href=\"#password-tab\" data-toggle=\"tab\">\n              <i class=\"fa fa-lock\"></i>\n              &nbsp;&nbsp;Zmiana hasła\n              </a>\n            </li>\n          </ul>\n        </div> <!-- /.col -->\n\n\n\n        <div class=\"col-md-9 col-sm-8 layout-main\">\n\n          <div id=\"settings-content\" class=\"tab-content stacked-content\">\n\n            <div class=\"tab-pane fade in active\" id=\"profile-tab\">\n\n              <h3 class=\"content-title\"><u>Edycja profilu</u></h3>\n                <div id=\"edit-profile-header\"></div>\n\n                <div class=\"row-fluid\">\n                    <h4 class=\"content-title\"><u>Zdjęcie</u></h4>\n                    <div id=\"photo\"></div>\n\n                    <div id=\"married-name\"></div>\n\n                    <h4 class=\"content-title\"><u>Dane kontaktowe</u></h4>\n                    <p>Pole ustawione jako <i>publiczne</i> widoczne jest dla wszystkich użytkowników portalu, zaś <i>prywatne</i> jedynie dla dyrekcji szkoły.</p>\n                    <hr />\n                    <div id=\"attributes\"></div>\n\n                    <h4 class=\"content-title\"><u>Edukacja</u></h4>\n                    <div id=\"universities\"></div>\n                    <div id=\"new-university\"></div>\n                    <a id=\"add-university\" class=\"btn btn-default\"><i class=\"fa fa-plus-circle\"></i> Dodaj uczelnię</a>\n\n\n                    <h4 style=\"margin-top: 30px;\" class=\"content-title\"><u>Krótki opis</u></h4>\n                    <div id=\"description\"></div>\n\n                    <h4 class=\"content-title\"><u>Doświadczenie</u></h4>\n                    <div id=\"employments\"></div>\n                    <div id=\"new-employment\"></div>\n                    <a id=\"add-employment\" class=\"btn btn-default\"><i class=\"fa fa-plus-circle\"></i> Dodaj stanowisko</a>\n\n                </div>\n            </div> <!-- /.tab-content -->\n          </div>\n        </div> <!-- /.col -->\n      </div> <!-- /.row -->\n";
  },"useData":true});

this["Handlebars"]["templates"]["edit_profile_header"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <img src=\""
    + escapeExpression(((helper = (helper = helpers.picture || (depth0 != null ? depth0.picture : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"picture","hash":{},"data":data}) : helper)))
    + "\" class=\"profile-avatar-img thumbnail\" style=\"width:256px; height:256px;\" alt=\"Profile Image\">\n";
},"3":function(depth0,helpers,partials,data) {
  return "            <img src=\"media/unknown.png\" class=\"profile-avatar-img thumbnail\" style=\"width:256px; height: 256px;\" alt=\"Profile Image\">\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"row\">\n    <div class=\"col-md-4\">\n         <div class=\"profile-avatar\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.picture : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div> <!-- /.profile-avatar -->\n    </div>\n    <div class=\"col-md-3\">\n          <h3>"
    + escapeExpression(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"full_name","hash":{},"data":data}) : helper)))
    + "</h3>\n    </div>\n</div>";
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
  return "<div>\n    <div class=\"row\" style=\"margin-bottom: 12px;\">\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Nazwa firmy</h5>\n            <div data-editors=\"company.name\" style=\"\"></div>\n            <div class=\"form-error company-name-error\"></div>\n        </div>\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Stanowisko</h5>\n            <div data-editors=\"name\"></div>\n            <div class=\"form-error name-error\"></div>\n        </div>\n    </div>\n    <div class=\"row\" style=\"margin-bottom: 12px;\">\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Miasto</h5>\n            <div class=\"city\" data-editors=\"city.name\" style=\"\"></div>\n            <div class=\"form-error city-name-error\"></div>\n        </div>\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Branża</h5>\n            <div class=\"branch\" data-editors=\"branch.name\" style=\"\"></div>\n            <div class=\"form-error branch-name-error\"></div>\n        </div>\n    </div>\n    <div class=\"row\" style=\"margin-bottom: 12px;\">\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Początek</h5>\n            <div data-editors=\"start\"></div>\n            <div class=\"form-error start-error\"></div>\n        </div>\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Koniec</h5>\n            <div data-editors=\"end\"></div>\n            <div class=\"help-block\">\n                Jeżeli nadal zajmujesz podane stanowisko, pozostaw to pole puste.\n            </div>\n        </div>\n    </div>\n    <div class=\"row-fluid\">\n        <a class=\"save btn btn-default\"><i class=\"fa fa-check\"></i> Zapisz</a>\n        <a class=\"cancel btn btn-default\"><i class=\"fa fa-times\"></i> Anuluj</a>\n    </div>\n    <hr />\n</div>";
  },"useData":true});

this["Handlebars"]["templates"]["form_error"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<ul class=\"parsley-error-list\" style=\"display: block;\">\n    <li class=\"required school-error\" style=\"display: list-item;\">"
    + escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + "</li>\n</ul>";
},"useData":true});

this["Handlebars"]["templates"]["group"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "            <div class=\"col-md-3 pupil-column\" style=\"margin-bottom: 30px;\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.picture : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                <h5><a href=\"#/person/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" style=\"color: black\">"
    + escapeExpression(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"full_name","hash":{},"data":data}) : helper)))
    + "</a></h5>\n            </div>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <img src=\""
    + escapeExpression(((helper = (helper = helpers.picture || (depth0 != null ? depth0.picture : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"picture","hash":{},"data":data}) : helper)))
    + "\" class=\"thumbnail pupil-thumbnail\">\n";
},"4":function(depth0,helpers,partials,data) {
  return "                <img src=\"media/unknown.png\" class=\"thumbnail pupil-thumbnail\">\n";
  },"6":function(depth0,helpers,partials,data) {
  return "był";
  },"8":function(depth0,helpers,partials,data) {
  return "była";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<div class=\"layout layout-stack-sm layout-main-left\">\n\n<div class=\"col-sm-7 col-md-8 layout-main\">\n\n  <div class=\"portlet\">\n\n    <h3 class=\"portlet-title\">\n      <u>Klasa "
    + escapeExpression(((helper = (helper = helpers.symbol || (depth0 != null ? depth0.symbol : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"symbol","hash":{},"data":data}) : helper)))
    + "</u>\n    </h3>\n\n    <style type=\"text/css\">\n      .pupil-thumbnail {\n        width:125px;\n        height:125px;\n        display:block;\n        margin-left:auto;\n        margin-right: auto\n      }\n\n      .pupil-column {\n        text-align: center;\n      }\n\n    </style>\n    <div class=\"portlet-body\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.pupils : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div> <!-- /.portlet-body -->\n  </div> <!-- /.portlet -->\n\n\n\n  <div class=\"row\">\n\n    <div class=\"col-md-6\">\n\n\n\n    </div> <!-- /.col -->\n\n    <div class=\"col-md-6\">\n\n      <div class=\"portlet\">\n\n\n      </div> <!-- /.portlet -->\n\n    </div> <!-- /.col -->\n\n  </div> <!-- /.row -->\n\n\n\n</div> <!-- /.layout-main -->\n\n\n\n<div class=\"col-sm-5 col-md-4 layout-sidebar\">\n\n<!--    <div class=\"portlet\">\n    <a href=\"javascript:;\" class=\"btn btn-primary btn-jumbo btn-block \">New Product</a>\n    <br>\n    <a href=\"javascript:;\" class=\"btn btn-secondary btn-lg btn-block \">New Template</a>\n  </div> -->\n\n  <h4>Informacje</h4>\n\n  <div class=\"well\">\n\n    <ul class=\"icons-list text-md\">\n      <li>\n        <i class=\"icon-li fa fa-user\"></i>\n          Wychowawcą klasy ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.is_male : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.program(8, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n        <a href=\"#/person/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.tutor : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.tutor : depth0)) != null ? stack1.full_name : stack1), depth0))
    + "</a>\n      </li>\n      <li>\n        <i class=\"icon-li fa fa-calendar\"></i>\n        Uczniowie tej klasy uczęszczali do liceum w latach\n        <strong>"
    + escapeExpression(((helper = (helper = helpers.first_year || (depth0 != null ? depth0.first_year : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"first_year","hash":{},"data":data}) : helper)))
    + "-"
    + escapeExpression(((helper = (helper = helpers.last_year || (depth0 != null ? depth0.last_year : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"last_year","hash":{},"data":data}) : helper)))
    + "</strong>\n      </li>\n      </li>\n    </ul>\n  </div> <!-- /.well -->\n\n</div> <!-- /.layout-sidebar -->\n\n</div> <!-- /.layout -->";
},"useData":true});

this["Handlebars"]["templates"]["married_name_form"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row-fluid\" style=\"min-height: 160px;\">\n    <h4 class=\"content-title\"><u>Zmiana nazwiska</u></h4>\n    <div class=\"row-fluid\" style=\"margin-bottom: 30px;\">\n        <div class=\"col-md-8\">\n            <h5>Aktualne nazwisko</h5>\n            <div data-editors=\"married_name\" style=\"margin-bottom: 10px;\"></div>\n            <a class=\"save btn btn-default\"><i class=\"fa fa-check\"></i> Zapisz</a>\n            <a class=\"cancel btn btn-default\"><i class=\"fa fa-times\"></i> Anuluj</a>\n        </div>\n    </div>\n</div>";
  },"useData":true});

this["Handlebars"]["templates"]["photo_form"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "            <a class=\"remove btn btn-default\">Usuń aktualne</a>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div style=\"margin-bottom: 20px;\">\n    <form enctype=\"multipart/form-data\">\n        <div class=\"help-block\" style=\"margin-bottom: 15px;\">\n            Zwróć uwagę, aby zdjęcie nie było dużo mniejsze niż 256 x 256 pikseli oraz zachowywało podobną proporcję.\n        </div>\n        <div>\n            <input type=\"file\" style=\"display: inline-block; float:left\" />\n            <a class=\"upload btn btn-primary\">Ustaw</a>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.picture : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </div>\n    </form>\n</div>";
},"useData":true});

this["Handlebars"]["templates"]["profile"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <img src=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" class=\"profile-avatar-img thumbnail\" style=\"width: 256px; height: 256px\" alt=\"Profile Image\">\n";
},"3":function(depth0,helpers,partials,data) {
  return "        <img src=\"media/unknown.png\" class=\"profile-avatar-img thumbnail\" alt=\"Profile Image\">\n";
  },"5":function(depth0,helpers,partials,data) {
  return "            <a href=\"#/profile/edit\" class=\"list-group-item\">\n                  <i class=\"fa fa-edit text-primary\"></i> &nbsp;&nbsp; Edytuj profil\n                  <i class=\"fa fa-chevron-right list-group-chevron\"></i>\n            </a>\n";
  },"7":function(depth0,helpers,partials,data) {
  return "          <a href=\"javascript:;\" class=\"list-group-item\">\n              <i class=\"fa fa-envelope text-primary\"></i> &nbsp;&nbsp; Wyślij wiadomość\n              <i class=\"fa fa-chevron-right list-group-chevron\"></i>\n            </a>\n";
  },"9":function(depth0,helpers,partials,data) {
  var stack1, buffer = "          ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.is_male : depth0), {"name":"if","hash":{},"fn":this.program(10, data),"inverse":this.program(12, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.subjects : depth0), {"name":"each","hash":{},"fn":this.program(14, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "          z lat\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.teacher_learn_years : depth0), {"name":"each","hash":{},"fn":this.program(16, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"10":function(depth0,helpers,partials,data) {
  return "Nauczyciel";
  },"12":function(depth0,helpers,partials,data) {
  return "Nauczycielka";
  },"14":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "              "
    + escapeExpression(((helper = (helper = helpers.name_brand || (depth0 != null ? depth0.name_brand : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name_brand","hash":{},"data":data}) : helper)))
    + "\n";
},"16":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(depth0, depth0))
    + "\n";
},"18":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "          ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.is_male : depth0), {"name":"if","hash":{},"fn":this.program(19, data),"inverse":this.program(21, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n          <a href=\"#/group/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">klasy "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.symbol : stack1), depth0))
    + "</a> z lat "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.first_year : stack1), depth0))
    + "-"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.last_year : stack1), depth0))
    + "\n";
},"19":function(depth0,helpers,partials,data) {
  return "Uczeń";
  },"21":function(depth0,helpers,partials,data) {
  return "Uczennica";
  },"23":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <h5 class=\"text-muted\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.universities : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.university : stack1)) != null ? stack1.name : stack1), depth0))
    + " - "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.universities : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.school : stack1), depth0))
    + "</h5>\n";
},"25":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "          <h5 class=\"text-muted\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.employments : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.company : stack1)) != null ? stack1.name : stack1), depth0))
    + " - "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.employments : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.name : stack1), depth0))
    + "</h5>\n";
},"27":function(depth0,helpers,partials,data) {
  return "      <h4 class=\"content-title\"><u>Kontakt</u></h4>\n";
  },"29":function(depth0,helpers,partials,data) {
  return "<br>";
  },"31":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "      <h4 class=\"content-title\"><u>Edukacja</u></h4>\n        <h5>Liceum</h5>\n           <p>W V LO ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.is_male : depth0), {"name":"if","hash":{},"fn":this.program(32, data),"inverse":this.program(34, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " do <a href=\"#/group/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">klasy "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.symbol : stack1), depth0))
    + "</a> z lat "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.first_year : stack1), depth0))
    + "-"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.last_year : stack1), depth0))
    + ", której wychowawcą ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.tutor : stack1)) != null ? stack1.is_male : stack1), {"name":"if","hash":{},"fn":this.program(36, data),"inverse":this.program(38, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + " <a href=\"#/person/"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.tutor : stack1)) != null ? stack1.id : stack1), depth0))
    + "\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.group : depth0)) != null ? stack1.tutor : stack1)) != null ? stack1.full_name : stack1), depth0))
    + "</a>.</p>\n\n        <br>\n\n";
},"32":function(depth0,helpers,partials,data) {
  return "uczęszczał";
  },"34":function(depth0,helpers,partials,data) {
  return "uczęszczała";
  },"36":function(depth0,helpers,partials,data) {
  return "był";
  },"38":function(depth0,helpers,partials,data) {
  return "była";
  },"40":function(depth0,helpers,partials,data) {
  var stack1, buffer = "      <h4 class=\"content-title\"><u>Obecnie</u></h4>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.description : depth0), {"name":"if","hash":{},"fn":this.program(41, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.employments : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(43, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"41":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <h5>Krótki opis</h5>\n         <p>"
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n        <br>\n";
},"43":function(depth0,helpers,partials,data) {
  return "        <h4>Doświadczenie</h4>\n        <br>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"row\">\n    <div class=\"col-md-3 col-sm-5\">\n      <div class=\"profile-avatar\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.thumbnail : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </div> <!-- /.profile-avatar -->\n\n      <div class=\"list-group\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.is_owner : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </div> <!-- /.list-group -->\n    </div> <!-- /.col -->\n\n    <div class=\"col-md-6 col-sm-7\">\n      <h3>"
    + escapeExpression(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"full_name","hash":{},"data":data}) : helper)))
    + "</h3>\n      <h5>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.teacher_learn_years : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(18, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      </h5>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.universities : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(23, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.employments : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(25, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n      <br>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.personal_data : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(27, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      <div id=\"personal-data\"></div>\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.personal_data : depth0)) != null ? stack1.length : stack1), {"name":"if","hash":{},"fn":this.program(29, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.group : depth0), {"name":"if","hash":{},"fn":this.program(31, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "      <div id=\"universities\"></div>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.show_now_section : depth0), {"name":"if","hash":{},"fn":this.program(40, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        <div id=\"employments\"></div>\n\n        <br class=\"visible-xs\">\n        <br class=\"visible-xs\">\n\n      </div> <!-- /.col -->\n\n      <div class=\"col-md-3\">\n\n          <h5 class=\"content-title\"><u>Social Stats</u></h5>\n\n        <div class=\"list-group\">\n\n          <a href=\"javascript:;\" class=\"list-group-item\">\n              <h3 class=\"pull-right\"><i class=\"fa fa-eye text-primary\"></i></h3>\n              <h4 class=\"list-group-item-heading\">38,847</h4>\n              <p class=\"list-group-item-text\">Profile Views</p>\n            </a>\n\n          <a href=\"javascript:;\" class=\"list-group-item\">\n            <h3 class=\"pull-right\"><i class=\"fa fa-facebook-square  text-primary\"></i></h3>\n            <h4 class=\"list-group-item-heading\">3,482</h4>\n            <p class=\"list-group-item-text\">Facebook Likes</p>\n          </a>\n\n          <a href=\"javascript:;\" class=\"list-group-item\">\n            <h3 class=\"pull-right\"><i class=\"fa fa-twitter-square  text-primary\"></i></h3>\n            <h4 class=\"list-group-item-heading\">5,845</h4>\n            <p class=\"list-group-item-text\">Twitter Followers</p>\n          </a>\n        </div> <!-- /.list-group -->\n\n        <br>\n\n      <div id=\"profile-similarity\"></div>\n\n      </div> <!-- /.col -->\n\n</div> <!-- /.row -->\n";
},"useData":true});

this["Handlebars"]["templates"]["profile_similarity"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<h5 class=\"content-title\"><u>Wspólne z "
    + escapeExpression(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"full_name","hash":{},"data":data}) : helper)))
    + "</u></h5>\n<div class=\"well\">\n  <ul class=\"icons-list text-md\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.universities : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.cities : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.companies : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.branches : depth0), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.educator : depth0), {"name":"if","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </ul>\n</div> <!-- /.well -->\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <li>\n      <i class=\"icon-li fa fa-university\"></i>\n      "
    + escapeExpression(((helper = (helper = helpers.universities || (depth0 != null ? depth0.universities : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"universities","hash":{},"data":data}) : helper)))
    + "\n      <br>\n    </li>\n";
},"4":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <li>\n      <i class=\"icon-li fa fa-home\"></i>\n      "
    + escapeExpression(((helper = (helper = helpers.cities || (depth0 != null ? depth0.cities : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"cities","hash":{},"data":data}) : helper)))
    + "\n      <br>\n    </li>\n";
},"6":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <li>\n      <i class=\"icon-li fa fa-suitcase\"></i>\n      "
    + escapeExpression(((helper = (helper = helpers.companies || (depth0 != null ? depth0.companies : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"companies","hash":{},"data":data}) : helper)))
    + "\n      <br>\n    </li>\n";
},"8":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <li>\n      <i class=\"icon-li fa fa-share-alt\"></i>\n      "
    + escapeExpression(((helper = (helper = helpers.branches || (depth0 != null ? depth0.branches : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"branches","hash":{},"data":data}) : helper)))
    + "\n      <br>\n    </li>\n";
},"10":function(depth0,helpers,partials,data) {
  return "    <li>\n      <i class=\"icon-li fa fa-user\"></i>\n       wychowawca klasy w liceum\n      <br>\n    </li>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.has_similarities : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { return stack1; }
  else { return ''; }
  },"useData":true});

this["Handlebars"]["templates"]["teacher"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <img src=\""
    + escapeExpression(((helper = (helper = helpers.picture || (depth0 != null ? depth0.picture : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"picture","hash":{},"data":data}) : helper)))
    + "\" class=\"thumbnail\" style=\"width: 125px; height: 125px;\">\n";
},"3":function(depth0,helpers,partials,data) {
  return "      <img src=\"media/unknown.png\" class=\"thumbnail\" style=\"width: 125px; height: 125px;\">\n";
  },"5":function(depth0,helpers,partials,data) {
  return "nauczyciel";
  },"7":function(depth0,helpers,partials,data) {
  return "nauczycielka";
  },"9":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "              "
    + escapeExpression(((helper = (helper = helpers.name_brand || (depth0 != null ? depth0.name_brand : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name_brand","hash":{},"data":data}) : helper)))
    + "\n";
},"11":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                "
    + escapeExpression(lambda(depth0, depth0))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"col-md-4 pupil-column\" style=\"margin-bottom: 20px;\">\n    <div style=\"width: 40%; float:left;\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.picture : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div>\n    <div style=\"width:60%;float:left\">\n      <h5><a href=\"#/person/"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" style=\"color: black\">"
    + escapeExpression(((helper = (helper = helpers.full_name || (depth0 != null ? depth0.full_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"full_name","hash":{},"data":data}) : helper)))
    + "</a></h5>\n        <p>";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.is_male : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.subjects : depth0), {"name":"each","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            <br />\n          z lat\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.teacher_learn_years : depth0), {"name":"each","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </p>\n    </div>\n</div>";
},"useData":true});

this["Handlebars"]["templates"]["teachers"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"portlet\">\n    <h3 class=\"portlet-title\">\n      <u>Grono pedagogiczne</u>\n    </h3>\n    <div id=\"teachers\"></div>\n</div>";
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
  return "<div>\n    <div class=\"row\" style=\"margin-bottom: 12px;\">\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Uczelnia</h5>\n            <div data-editors=\"university.name\" style=\"\"></div>\n            <div class=\"form-error university-name-error\"></div>\n        </div>\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Miasto</h5>\n            <div class=\"city\" data-editors=\"university.city.name\"></div>\n            <div class=\"form-error university-city-name-error\"></div>\n        </div>\n    </div>\n    <div class=\"row\" style=\"margin-bottom: 12px;\">\n        <div class=\"col-md-4\">\n            <h5>Wydział</h5>\n            <div data-editors=\"department.name\"></div>\n        </div>\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Kierunek</h5>\n            <div data-editors=\"school\" style=\"\"></div>\n            <div class=\"form-error school-error\"></div>\n        </div>\n    </div>\n    <div class=\"row\" style=\"margin-bottom: 12px;\">\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Początek</h5>\n            <div data-editors=\"start\"></div>\n            <div class=\"form-error start-error\"></div>\n        </div>\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Koniec</h5>\n            <div data-editors=\"end\"></div>\n            <div class=\"form-error end-error\"></div>\n        </div>\n    </div>\n    <div class=\"row-fluid\">\n        <a class=\"save btn btn-default\"><i class=\"fa fa-check\"></i> Zapisz</a>\n        <a class=\"back btn btn-default\"><i class=\"fa fa-reply\"></i> Powrót do listy uczelni</a>\n        <a class=\"cancel btn btn-default\"><i class=\"fa fa-times\"></i> Anuluj</a>\n    </div>\n    <hr />\n</div>";
  },"useData":true});

this["Handlebars"]["templates"]["university_form"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div>\n    <div class=\"row\" style=\"margin-bottom: 12px;\">\n        <div class=\"col-md-4\">\n            <h5>Uczelnia</h5>\n            <div data-editors=\"university.id\" style=\"\"></div>\n\n        </div>\n        <div class=\"col-md-4\">\n            <h5>Wydział</h5>\n            <div data-editors=\"department.name\"></div>\n        </div>\n    </div>\n    <div class=\"row\" style=\"margin-bottom: 12px;\">\n        <div class=\"col-md-4\">\n                <a class=\"unverified\">Twojej uczelni brakuje na liście? Kliknij!</a>\n        </div>\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Kierunek</h5>\n            <div data-editors=\"school\" style=\"\"></div>\n            <div class=\"form-error school-error\"></div>\n        </div>\n    </div>\n    <div class=\"row\" style=\"margin-bottom: 12px;\">\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Początek</h5>\n            <div data-editors=\"start\"></div>\n            <div class=\"form-error start-error\"></div>\n        </div>\n        <div class=\"col-md-4 form-group\" style=\"margin-bottom: 0\">\n            <h5>Koniec</h5>\n            <div data-editors=\"end\"></div>\n            <div class=\"form-error end-error\"></div>\n\n        </div>\n    </div>\n    <div class=\"row-fluid\">\n        <a class=\"save btn btn-default\"><i class=\"fa fa-check\"></i> Zapisz</a>\n        <a class=\"cancel btn btn-default\"><i class=\"fa fa-times\"></i> Anuluj</a>\n    </div>\n    <hr />\n</div>";
  },"useData":true});