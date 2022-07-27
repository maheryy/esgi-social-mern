const { Router } = require("express");
const { AccessLog } = require("../models/mongo");
const mongoose = require("mongoose");
const router = new Router();

const formatError = (validationError) => {
    return Object.keys(validationError.errors).reduce((acc, key) => {
        acc[key] = validationError.errors[key].message;
        return acc;
    }, {});
};

router.get("/dashboard", async (req, res, next) => {
    try {
        const statusCodes = await AccessLog.aggregate([
            {
                $group: {
                    _id: "$res.statusCode",
                    totalReq: { $sum: 1 },
                }
            }
        ]);
        const methods = await AccessLog.aggregate([
            {
                $group: {
                    _id: "$req.method",
                    totalReq: { $sum: 1 },
                }
            }
        ]);
        const urls = await AccessLog.aggregate([
            {
                $group: {
                    _id: "$req.url",
                    totalReq: { $sum: 1 },
                }
            },
            {
                $sort: { totalReq: -1 }
            },
            {
                $limit: 5
            }
        ]);

        const days = await AccessLog.aggregate([
            {
                $group: {
                    _id: {
                        $arrayElemAt: [
                            {
                                $split: [{$toString: "$timestamp"}, "T"],
                            },
                            0,
                        ],
                    },
                    totalReq: {
                        $sum: 1,
                    },
                },
            },
        ]);
        days.sort((a, b) => b.totalReq - a.totalReq);
        urls.sort((a, b) => b.totalReq - a.totalReq);
        statusCodes.sort((a, b) => b.totalReq - a.totalReq)
        methods.sort((a, b) => b.totalReq - a.totalReq)
        res.json({
            statusCodes,
            methods,
            urls,
            days
        });
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});
router.get("/", async (req, res, next) => {
    try {
        const { page = 1, perPage = 10, ...criteria } = req.query;
        const result = await AccessLog.find(criteria)
            .sort({ timestamp: -1 })
            .limit(perPage)
            .skip((page - 1) * perPage);
        res.json(result);
    } catch (error) {
        res.sendStatus(500);
    }
})

router.post("/", async (req, res, next) => {
    try {
        const result = await AccessLog.create({ ...req.body, timestamp: new Date() });
        res.status(201).json(result);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json(formatError(error));
            next();
        } else {
            res.sendStatus(500);
            next();
        }
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const result = await AccessLog.findOne({
            _id: req.params.id,
        });
        if (!result) {
            res.sendStatus(404);
            next();
        } else {
            res.json(result);
            next();
        }
    } catch (error) {
        res.sendStatus(500);
        next();
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const result = await AccessLog.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            { $set: req.body }
        );
        if (!result) {
            res.sendStatus(404);
            next();
        } else {
            res.json(result);
            next();
        }
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(422).json(formatError(error));
            next();
        } else {
            res.sendStatus(500);
            next();
        }
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const result = await AccessLog.findOneAndRemove({
            _id: req.params.id,
        });
        if (!result) {
            res.sendStatus(404);
            next();
        } else {
            res.sendStatus(204);
            next();
        }
    } catch (error) {
        res.sendStatus(500);
        next();
    }
});

module.exports = router;