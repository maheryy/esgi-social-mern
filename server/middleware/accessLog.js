const { AccessLogMapper } = require("../mappers/AccessLogMapper");
const { AccessLog } = require("../models/mongo");

module.exports = async (req, res, next) => {
    try {
        const accessLog = AccessLogMapper(req, res);
        await AccessLog.create(accessLog);

        res.sendEvent("dashboard",{
            date: new Date().toISOString(),
        });
        next();
    } catch (error) {
        console.error(error);
        next();
    }
}