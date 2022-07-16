const { AccessLogMapper } = require("../mappers/AccessLogMapper");
const { AccessLog } = require("../models/mongo");

module.exports = async (req, res, next) => {
    try {
        const accessLog = AccessLogMapper(req, res);
        // console.log(accessLog);
        await AccessLog.create(accessLog);
        next();
    } catch (error) {
        console.error(error);
        next();
    }
}