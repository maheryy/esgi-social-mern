const { Router } = require("express");
const {
    Message,
    User
} = require("../models/postgres");
const { ValidationError } = require("sequelize");

const router = new Router();

const formatError = (validationError) => {
    return validationError.errors.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
    }, {});
};

router.get("/", async (req, res) => {
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
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Message.findByPk(id);
        res.json(result);
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const [nbLines, [result]] = await Message.update(req.body, {
            where: {
            id: parseInt(req.params.id, 10),
            },
            returning: true,
        });
        if (!nbLines) {
            res.sendStatus(404);
        } else {
            res.json(result);
        }
        } catch (error) {
        console.log(error);
    
        if (error instanceof ValidationError) {
            res.status(422).json(formatError(error));
        } else {
            res.sendStatus(500);
            console.error(error);
        }
    }
});

module.exports = router;