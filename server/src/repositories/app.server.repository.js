'use strict';

const mongoose = require("mongoose");
const moment = require('moment');
const User = mongoose.model("User");
const Event = mongoose.model("Event");

module.exports={
     findActivePendingEvents:function(userId){
         let utcNow = moment.utc().unix();
         return Event.find({ participants: { $nin: [userId] }, owner: { $nin: [userId] }, endTime: { $gt: utcNow }}).populate('owner participants')
     },
     findInActivePendingEvents: function(){
         let utcNow = moment.utc().unix();
         return Event.find({ participants: { $nin: [userId] }, owner: { $nin: [userId] }, endTime: { $lte: utcNow }}).populate('owner participants')
     },
     findActiveCreatedEvents:function(userId){
         let utcNow = moment.utc().unix();
         return Event.find({ owner: { $in: [userId] }, endTime: { $gt: utcNow }}).populate('owner participants')
     },
     findInActiveCreatedEvents:function(userId){
        let utcNow = moment.utc().unix();
        return Event.find({ owner: { $in: [userId] }, endTime: { $lte: utcNow }}).populate('owner participants')
     },
     findActiveAcceptedEvents:function(userId){
         let utcNow = moment.utc().unix();
         return Event.find({ participants: { $in: [userId]}, endTime: { $gt: utcNow }}).populate('owner participants')
     },
    findInActiveAcceptedEvents:function(userId){
        let utcNow = moment.utc().unix();
        return Event.find({ participants: { $in: [userId]}, endTime: { $lte: utcNow }}).populate('owner participants')
    },
    save:function(event){
       return new Event(event).save();
    },
    updateEvent:function(eventId, userIds){
        return Event.update({ _id: eventId }, { $addToSet: { participants: { $each: userIds }}})
    }
}