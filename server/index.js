const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const wrench = require('wrench');
const config = require('./src/config');

mongoose.Promise = global.Promise;

exports.server = (app) => {
    //db connection
    mongoose.connect(config.mongoDBConfig.dbUri, null, (err) => {
        if (err) {
            console.error('Could not connect to MongoDB!');
            console.log(err);
        }
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(__dirname));

    wrench.readdirSyncRecursive(__dirname + '/src/models').map(function(file) {
        require(__dirname + '/src/models/' + file);
    });

    require(__dirname +'/src/routes/app.server.routes')(app);
}

