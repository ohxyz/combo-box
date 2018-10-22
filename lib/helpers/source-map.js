const path = require('path');

const RELATIVE_PATH_OF_COMPONENTS = '../components';
const RELATIVE_PATH_OF_APPS = '../sub-apps';
const RELATIVE_PATH_OF_HELPERS = '../helpers';

let fullPathOfComponents = path.join(__dirname, RELATIVE_PATH_OF_COMPONENTS);
let fullPathOfApps = path.join(__dirname, RELATIVE_PATH_OF_APPS);

let paths = {

    __components: fullPathOfComponents,
    __apps: fullPathOfApps,
    __helpers: __dirname
};

module.exports = {

    paths
};