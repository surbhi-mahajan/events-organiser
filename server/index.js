/*
const moment = require('moment-timezone')
const bodyParser = require('body-parser');

//TODO: Add Router

// Rejected only in local storage not backend?
let users = [
    { id: 1, name: 'Surbhi', email: 'surbhi@demo.com', password: '' },
    { id: 2, name: 'Punit', email: 'punit@demo.com', password: '' },
    { id: 3, name: 'Prateek', email: 'prateek@demo.com', password: ''}
]

let events = [
    { id: 101, owner: [1], venue: 'Noida Sports Complex', startTime: 1531567476, endTime: 1536025000, name: 'Football', participants: [] },
    { id: 102, owner: [2], venue: 'Gurgaon Sports Complex', startTime: 1531564450, endTime: 1532025030, name: 'Cricket', participants: [1] },
    { id: 103, owner: [3], venue: 'Rohini Sports Complex', startTime: 1531523450, endTime: 1532025790, name: 'Badminton', participants: [] },
    { id: 104, owner: [1], venue: 'Banglore Sports Complex', startTime: 1531654450, endTime: 1542025990, name: 'Kabaddi', participants: [2] },
    { id: 105, owner: [1], venue: 'Faridabad Sports Complex', startTime: 1531598450, endTime: 1542025840, name: 'Carrom', participants: [2] },
    { id: 106, owner: [2], venue: 'ABC Apartment', startTime: 1531588450, endTime: 1552025021, name: 'Ludo', participants: [1, 3] },
    { id: 107, owner: [3], venue: 'PQR Apartment', startTime: 1531566450, endTime: 1533025065, name: 'Cards', participants: [] }
]

const EVENT_TYPES = {
    PENDING: 'pending',
    CREATED: 'created',
    ACCEPTED: 'accepted'
}

const EVENT_STATUS = {
    ACTIVE: 'active',
    EXPIRED: 'expired'
}

exports.APIs = (app) => {
    //support parsing of application/json type post data
    app.use(bodyParser.json());

    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));

    // Before Request Interceptor
    app.use((req, res, next) => {
        const id = Number(req.headers.authorization)
        const user = users.find(user => user.id === id)

        // Check for authorization header for every API (/api/...) except for login POST API
        if (!user && req.url.includes('/api/') && !req.url.includes('/api/login')) {
            res.send({
                error: 'User is not authorized. Please log in.'
            })
        } else {
            next()
        }
    })

    app.post('/api/login', (req, res) => {
        const user = users.find(userObj => req.body.email === userObj.email)
        const response = {}

        if (user) {
            response.success = { id: user.id }
        } else {
            response.error = 'Incorrect Email ID.'
        }

        res.send(response)
    })

    // Below API is not in use for now
    app.get('/api/events/:eventID', (req, res) => {
        const eventID = Number(req.params.eventID)
        const event = events.find(event => event.id === eventID)
        const response = {}

        if (!event) {
            res.error = 'No event registered for given ID.'
        } else {
            res.success = event
        }

        res.send(response)
    })

    app.post('/api/events/:eventID', (req, res) => {
        const id = Number(req.headers.authorization)
        const eventID = Number(req.params.eventID)
        const status = req.body.status && req.body.status.toLowerCase()
        const event = events.find(event => event.id === eventID)
        const response = {}

        if (!event) {
            response.error = 'No event registered for given ID.'
        } else if (![EVENT_TYPES.ACCEPTED].includes(status)) {
            response.error = 'Unrecognized event type.'
        } else if (event.participants.includes(id)) {
            response.error = 'Already accepted the event.'
        } else {
            event.participants.push(id)
            response.success = 'Successfully accepted the event'
        }

        res.send(response)
    })

    app.get('/api/events', (req, res) => {
        const { headers, query } = req
        const id = Number(headers.authorization)
        const type = query.type || ''
        const status = query.status || ''
        // const page = req.query.page || 1
        // const perPage = req.query.per_page || Infinity
        const clonedEvents = JSON.parse(JSON.stringify(events))
        const response = {}

        if (type && !Object.values(EVENT_TYPES).includes(type)) {
            response.error = 'Invalid Event Type.'
        } else if (status && !Object.values(EVENT_STATUS).includes(status)) {
            response.error = 'Invalid Event Status.'
        } else {
            const currentTime = moment().unix()
            response.success = clonedEvents.filter(event => {
                let isMatchingType = true;
                switch(type) {
                    case EVENT_TYPES.PENDING: 
                        // Filter all those events which are not created neither participated by the user
                        isMatchingType = !(event.owner.includes(id) || event.participants.includes(id));
                        break;
                    case EVENT_TYPES.CREATED:
                        isMatchingType = event.owner.includes(id)
                        break;
                    case EVENT_TYPES.ACCEPTED:
                        isMatchingType = event.participants.includes(id)
                        break;
                }

                const isMatchingStatus = status ? status === EVENT_STATUS.ACTIVE ? event.endTime > currentTime : event.endTime <= currentTime : true

                return isMatchingType && isMatchingStatus
            })
        }

        response.success.forEach(event => {
            event.owner = event.owner.map(id => users.find(user => user.id === id).name)
            event.participants = event.participants.map(id => users.find(user => user.id === id).name)
        })
        
        res.send(response)
    })

    app.post('/api/events', (req, res) => {
        const { body, headers } = req
        const id = Number(headers.authorization)
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
        } else {
            events.push({
                id: events[events.length - 1].id ++,
                owner: [id],
                participants: [],
                venue,
                startTime,
                endTime,
                name
            })
            response.success = 'Event Created Successfully.'
        }
        res.send(response)
    })

}
*/
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const wrench = require('wrench');
mongoose.Promise = global.Promise;
//config
const config = require('./src/config');


exports.server = (app) => {
    //db connection
    mongoose.connect(config.mongoDBConfig.dbUri,null,function(err) {
        if (err) {
            console.error('Could not connect to MongoDB!');
            console.log(err);
        }
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(__dirname));

    wrench.readdirSyncRecursive(__dirname + '/src/models').map(function(file) {
        require(__dirname + '/src/models/'+file);
    });

    require(__dirname +'/src/routes/app.server.routes')(app);
}

