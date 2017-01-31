var config = {};


config.server = {};

config.dest = ".";
config.server.host = '0.0.0.0';
config.server.port = '8888';

config.angular = "bower_components/angular/angular.min.js";
config.angular_material = "bower_components/angular-material/angular-material.min.js";
config.angular_material_css = "bower_components/angular-material/angular-material.min.css";

config.build_directory = "dist/";
config.src_directory = "src/";

config.main = {};
config.main.html = "index.html";
config.main.js = "index.js";
config.policy_manager_lib = "policy-manager-lib.js";
config.policy_manager_lib_min = "policy-manager-lib.min.js";

config.services_directory = "src/services/";

config.tmpl_directory = "templates/";
config.api_service_tmpl_marker = "{$application_server}";
config.api_service_tmpl = "APIService.tmpl";
config.application_server = "https://myserver";





module.exports = config;
