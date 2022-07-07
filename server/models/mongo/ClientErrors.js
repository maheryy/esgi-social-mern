const mongoose = require("./db");

const ClientErrorSchema = new mongoose.Schema({
    name: String,
    message: String,
    stack: String,
    timestamp: Date
});

const ClientError = new mongoose.model("ClientErrors", ClientErrorSchema);

module.exports = ClientError;