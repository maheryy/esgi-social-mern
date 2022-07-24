const { Router } = require("express");
const {
    Message,
    User
} = require("../models/postgres");
const { ValidationError } = require("sequelize");
const checkAuth = require("../middleware/checkAuth");

const router = new Router();

const formatError = (validationError) => {
    return validationError.errors.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
    }, {});
};

router.get("/",checkAuth , async (req, res, next) => {
    try {
        const { page = 1, perPage = 10, ...criteria } = req.query;
        const result = await Message.findAll({
        attributes: ["id", "content", "readAt", "createdAt", "userId", "conversationId"],
        where: {
            isModerated: true
        },
        order: [["createdAt", "DESC"]],
        limit: perPage,
        offset: (page - 1) * perPage
        });
        res.json(result);
        next();
    } catch (error) {
        res.sendStatus(500);
        next();
        console.error(error);
    }
});

router.get("/:id",checkAuth , async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Message.findByPk(id);
        res.json(result);
        next();
    } catch (error) {
        res.sendStatus(500);
        next();
        console.error(error);
    }
});

router.put("/:id",checkAuth , async (req, res, next) => {
    try {
        const [nbLines, [result]] = await Message.update(req.body, {
            where: {
            id: parseInt(req.params.id, 10),
            },
            returning: true,
        });
        if (!nbLines) {
            res.sendStatus(404);
            next();
        } else {
            res.json(result);
            next();
        }
        } catch (error) {
        console.log(error);
    
        if (error instanceof ValidationError) {
            res.status(422).json(formatError(error));
            next();
        } else {
            res.sendStatus(500);
            next();
            console.error(error);
        }
    }
});

module.exports = router;