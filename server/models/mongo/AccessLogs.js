const mongoose = require("./db");

const AccessLogSchema = new mongoose.Schema({
    timestamp: Date,
    req: {
        method: String,
        url: String,
        query: Object,
        params: Object,
        headers: {
            host: String,
            "sec-ch-ua": String,
            "user-agent": String,
        },
        body: Object
    },
    res: {
        statusCode: Number,
    }
});

const AccessLog = new mongoose.model("AccessLogs", AccessLogSchema);

module.exports = AccessLog;