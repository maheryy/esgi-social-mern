exports.connection = require("./db");

exports.User = require("./User");
exports.Message = require("./Message");
exports.Conversation = require("./Conversation");
exports.UserConversation = require("./UserConversation");
exports.UserFriend = require("./UserFriend");


exports.User.hasMany(exports.UserFriend, {
  as: "requestors",
  foreignKey: "requestorId"
});
exports.User.hasMany(exports.UserFriend, {
  as: "targets",
  foreignKey: "targetId"
});
exports.UserFriend.belongsTo(exports.User, {
  as: 'requestor',
  foreignKey: "requestorId",
});
exports.UserFriend.belongsTo(exports.User, {
  as: 'target',
  foreignKey: "targetId",
});

exports.User.hasMany(exports.UserConversation);
exports.UserConversation.belongsTo(exports.User);

exports.User.hasMany(exports.Message);
exports.Message.belongsTo(exports.User);

exports.UserConversation.belongsTo(exports.Conversation);
exports.Conversation.hasMany(exports.UserConversation, {
  as: "userTargets",
});
exports.Conversation.hasMany(exports.UserConversation, {
  as: "userParticipants",
});


exports.Conversation.hasMany(exports.Message);
exports.Message.belongsTo(exports.Conversation);
