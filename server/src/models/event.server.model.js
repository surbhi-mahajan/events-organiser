var mongoose = require("mongoose");
var eventSchema = new mongoose.Schema({
    "name": {
        "type": String,
        required: true
    },
    "venue":{
        "type": String,
        required: true
    },
    "startTime":{
        "type": Number,
        required: true
    },
    "endTime":{
        "type": Number,
        required: true
    },
    "owner":[{
        "type": mongoose.Schema.Types.ObjectId,
        "ref": "User"
    }],
    "participants":[{
        "type": mongoose.Schema.Types.ObjectId,
        "ref": "User"
    }]
});
mongoose.model("Event",eventSchema);
module.exports = eventSchema;
