exports.connection = require("./db");

exports.User = require("./User");
exports.Message = require("./Message");
exports.Conversation = require("./Conversation");
exports.UserConversation = require("./UserConversation");

exports.User.hasMany(exports.UserConversation);
exports.UserConversation.belongsTo(exports.User);

exports.User.hasMany(exports.Message);
exports.Message.belongsTo(exports.User);

exports.Conversation.hasMany(exports.UserConversation);
exports.UserConversation.belongsTo(exports.Conversation);

exports.Conversation.hasMany(exports.Message);
exports.Message.belongsTo(exports.Conversation);
