var config = {};

config.dev = {
    js: ['dev/js/**/*.js'],
    html: ['dev/js/**/*.html'],
    fonts: ['dev/fonts/**']
};

config.policy_manager_library = '../policy-manager-library/dist/policy-manager-lib.min.js';
config.policy_manager_library_gulpfile = "../policy-manager-library/gulpfile.js";

config.dest = "www";
config.appName = "app.js";
config.moduleName = "policy-manager-ui";

config.ionicSassPaths = {
    sass: ['./scss/**/*.scss']
};

config.build_libs_dir = config.dest + "/lib";

module.exports = config;
