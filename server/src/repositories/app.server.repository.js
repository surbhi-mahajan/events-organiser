'use strict';

const mongoose = require("mongoose");
const moment = require('moment');
const User = mongoose.model("User");
const Event = mongoose.model("Event");

const { eventStatus } = require('../constants')

module.exports = {

    findUser(email) {
        return User.findOne({ email })
    },

    addUser(user) {
        return new User(user).save();
    },

    findUserById(userId) {
        return User.findOne({ _id: userId })
    },

    findEventById(eventId) {
        return Event.findOne({ _id: eventId })
    },

    findPendingEvents(userId, status = eventStatus.ACTIVE){
        let utcNow = moment.utc().unix();
        return Event.find({ participants: { $nin: [userId] }, owner: { $nin: [userId] }, endTime: { [status === eventStatus.ACTIVE ? '$gt' : '$lte']: utcNow }}).populate('owner participants', 'name -_id')
    },

    findCreatedEvents(userId, status = eventStatus.ACTIVE){
        let utcNow = moment.utc().unix();
        return Event.find({ owner: { $in: [userId] }, endTime: { [status === eventStatus.ACTIVE ? '$gt' : '$lte']: utcNow }}, { _id: 0 }).populate('owner participants', 'name -_id')
    },
    findAcceptedEvents(userId, status = eventStatus.ACTIVE){
        let utcNow = moment.utc().unix();
        return Event.find({ participants: { $in: [userId]}, endTime: { [status === eventStatus.ACTIVE ? '$gt' : '$lte']: utcNow }}, { _id: 0 }).populate('owner participants', 'name -_id')
    },
    save(event){
       return new Event(event).save();
    },
    updateEvent(eventId, userId, status){
        return Event.update({ _id: eventId,  owner: { $nin: [userId] }}, { $addToSet: { participants: userId }})
    }
}