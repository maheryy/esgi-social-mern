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

router.get("/", async (req, res, next) => {
    try {
        const { page = 1, perPage = 10, ...criteria } = req.query;
        const result = await AccessLog.find(criteria)
            .limit(perPage)
            .skip((page - 1) * perPage);
        res.json(result);
        next();
    } catch (error) {
        res.sendStatus(500);
        next();
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await AccessLog.create({...req.body, timestamp: new Date()});
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

router.get("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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