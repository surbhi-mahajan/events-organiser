'use strict';

const router = require('express').Router();
const { eventType, eventStatus } = require('../constants')

module.exports = (respository) => {

  router.post('/login', (req, res) => {
    const { email, password } = req.body
    respository.findUser(email)
      .then(user => {
        const response = {}

        if (user && user.password === password) {
          // Can access '_id' by 'id'
          response.success = { id: user.id, name: user.name }
        } else {
          response.error = 'Incorrect Email ID or Password.'
        }

        res.send(response)
      })
      .catch((err) => {
        res.send({
          error: 'Oops! Something went wrong. Please try again.'
        })
      })
  })

  router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    const response = {}

    if (!name || !name.trim()) {
      response.error = 'Name cannot be empty.'
    } else if (!email || !email.trim()) {
      response.error = 'Email cannot be empty.'
    } else if (!password || !password.trim()) {
      response.error = 'Password cannot be empty.'
    } else {
      return respository.findUser(email)
        .then(user => {
          if (user) {
            res.send({
              error: 'Email ID already taken.'
            });
          } else {
            return respository.addUser({ name, email, password })
              .then((user) => {
                res.send({
                  success: { id: user.id, name: user.name }
                });
              })
          }
        })
        .catch((err) => {
          res.send({
            error: 'Oops! Something went wrong. Please try again.'
          })
        })
    }

    res.send(response);
  })

  router.get('/events', (req, res) => {
    const { headers, query } = req
    const userId = headers.authorization
    const type = query.type || ''
    const status = query.status || ''
    // const page = req.query.page || 1
    // const perPage = req.query.per_page || Infinity
    const response = {}
    let eventPromise;

    if (type && !Object.values(eventType).includes(type)) {
      response.error = 'Invalid Event Type.'
    } else if (status && !Object.values(eventStatus).includes(status)) {
      response.error = 'Invalid Event Status.'
    } else {
      switch (type) {
        case eventType.PENDING:
          eventPromise = respository.findPendingEvents(userId, status)
          break;
        case eventType.CREATED:
          eventPromise = respository.findCreatedEvents(userId, status)
          break;
        case eventType.ACCEPTED:
          eventPromise = respository.findAcceptedEvents(userId, status)
          break;
      }

      return eventPromise.then(events => {
        res.send({
          success: events
        })
      })
        .catch((err) => {
          res.send({
            error: 'Oops! Something went wrong. Please try again.'
          })
        })
    }

    res.send(response)
  });

  router.post('/events', (req, res) => {
    const { body, headers } = req
    const userId = headers.authorization
    const { venue, startTime, endTime, name } = body

    const response = {}

    if (!venue && typeof venue !== 'string') {
      response.error = 'Invalid Venue.'
    } else if (!startTime && typeof startTime !== 'number') {
      response.error = 'Invalid Start Time.'
    } else if (!endTime && typeof endTime !== 'number') {
      response.error = 'Invalid End Time.'
    } else if (!name && typeof name !== 'string') {
      response.error = 'Invalid Event Name.'
    } else if (endTime <= startTime) {
      response.error = 'End time should be more than start time.'
    } else {
      return respository.save({
        owner: [userId],
        participants: [],
        venue,
        startTime,
        endTime,
        name
      })
        .then(() => {
          res.send({
            success: 'Event Created Successfully.'
          })
        })
        .catch((err) => {
          res.send({
            error: 'Oops! Something went wrong. Please try again.'
          })
        })
    }
    res.send(response)
  });

  // Below API is not in use for now
  router.get('/events/:eventID', (req, res) => {
    const eventID = req.params.eventID
    const response = {}

    respository.findEventById(eventID)
      .then(event => {
        if (!event) {
          response.error = 'No event registered for given ID.'
        } else {
          response.success = event
        }
        res.send(response)
      })
      .catch((err) => {
        res.send({
          error: 'Oops! Something went wrong. Please try again.'
        })
      })
  });

  router.put('/events/:eventID', (req, res) => {
    const userId = req.headers.authorization
    const eventID = req.params.eventID
    const status = req.body.status
    const response = {}

    // May support reject as well that's y kept in Array for now.
    if (![eventType.ACCEPTED].includes(status)) {
      res.send({
        error: 'Unrecognized event type.'
      })
    }

    respository.updateEvent(eventID, userId, status)
      .then(event => {
        if (!event.nModified) {
          response.error = 'Unable to accept the event.'
        }
        else {
          response.success = 'Event accepted successfully.'
        }
        res.send(response)
      })
      .catch((err) => {
        res.send({
          error: 'Oops! Something went wrong. Please try again.'
        })
      })
  });

  return router;
};