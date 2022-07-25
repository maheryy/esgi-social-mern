const jwt = require("jsonwebtoken");

exports.createToken = async (user) => {
    const payload = {
        id: user.id,
        pseudo: user.pseudo,
        isAdmin: user.isAdmin,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1y",
    });
};

exports.checkToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        return {
            id: decoded.id,
            pseudo: decoded.pseudo,
            isAdmin: decoded.isAdmin,
        };
    } catch (error) {
        return false;
    }
};