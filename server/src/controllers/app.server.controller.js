'use strict';

const router = require('express').Router();
const { eventType, status } = require('../constants')

module.exports = function(respository) {
    router.get('/user/:userID/events', function (req, res, next) {
        let eventPromise;
        if(req.query.type === eventType.PENDING) {
            if(req.query.status === status.ACTIVE){
                eventPromise = respository.findActivePendingEvents(req.params.userID)
            }
            else {
                eventPromise = respository.findInActivePendingEvents(req.params.userID)
            }
        } else if(req.query.type === eventType.ACCEPTED){
            if(req.query.status === status.ACTIVE){
                eventPromise = respository.findActiveAcceptedEvents(req.params.userID, req.params.status)
            }
            else {
                eventPromise = respository.findInActiveAcceptedEvents(req.params.userID, req.params.status)
            }
        } else if(req.query.type === eventType.CREATED){
            if(req.query.status === status.ACTIVE){
                eventPromise = respository.findActiveCreatedEvents(req.params.userID, req.params.status)
            }
            else {
                eventPromise = respository.findInActiveCreatedEvents(req.params.userID, req.params.status)
            }
        }
        eventPromise.then(function(events){
            res.json(events);
        });
    });

    router.post('/user/:userID/events', function (req, res, next) {
        console.log('created events', req.body)
        let newEvent = { ...req.body, owner: [req.params.userID], participants: []}
        respository.save(newEvent).then(function(event){
            res.json(event);
        });
    });

    router.put('/user/:userID/event/:eventID',function(req,res,next) {
        let userIds = [req.params.userID]
        if(req.body.userIds){
            userIds = [...userIds, ...req.body.userIds]
        }
        console.log('updated call', userIds)
        respository.updateEvent(req.params.eventID, userIds).then(function(event){
              res.json(event)
        })
    });
    return router;
};