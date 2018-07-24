/**
 * Created with JetBrains WebStorm.
 * User: Surbhi
 * Date: 5/25/17
 * Time: 10:50 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

let expressApp;
const repository = require('../repositories/app.server.repository');
module.exports = function (app) {
    expressApp = app;
    registerEndpoint(
        require('../controllers/app.server.controller')(repository)
    );
};
function registerEndpoint(endpoint) {
    expressApp.use('/api/', endpoint);
}