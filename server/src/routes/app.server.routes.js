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

module.exports = (app) => {
  expressApp = app;
  registerEndpoint(
    require('../controllers/app.server.controller')(repository)
  );
};

function registerEndpoint(endpoint) {

  // Before Request Interceptor
  expressApp.use((req, res, next) => {
    const userId = req.headers.authorization;

    // Check for authorization header for every API (/api/...) except for login POST API
    if (req.url.includes('/api/') && !req.url.includes('/api/login') && !req.url.includes('/api/signup')) {
      if (!userId) {
        res.status(401).send({
          error: 'User is not authorized. Please log in.'
        })
      } else {
        return repository.findUserById(userId)
          .then(user => {
            if (!user) {
              res.status(401).send({
                error: 'User is not authorized. Please log in.'
              })
            } else {
              next()
            }
          })
      }
    } else {
      next()
    }
  });

  expressApp.use('/api/', endpoint);

  // // Handle uncaught exceptions so that we don't have to put this in catch() of each API
  // expressApp.use((err, req, res) => {
  //     res.send({
  //         error: 'Something went wrong. Please try again.!'
  //     })
  // })
}