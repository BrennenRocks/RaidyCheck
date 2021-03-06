const jwt = require('jsonwebtoken');
const config = require('../config/database'),
  constants = require('../config/constants');

const User = require('../models/user'),
  Group = require('../models/group');

let middlewareObj = {};

middlewareObj.getAuthToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.json({ success: false, message: 'You must be logged in to do that' });
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log('verifying jwt', err);
      return res.json({ success: false, message: 'Please log out and log back in' });
    }

    req.decodedUser = decoded;
    next();
  });
};

middlewareObj.checkGroupOwnership = (req, res, next) => {
  User.findOne({ _id: req.decodedUser.id }, (err, user) => {
    if (err) {
      console.log('checkGroupOwnership finding user', err);
      return res.json({ success: false, message: constants.errMsg });
    }
    
    if (!user) {
      return res.json({ success: false, message: constants.userNotFound });
    }

    Group.findOne({ _id: req.params.groupId }, (err, group) => {
      if (err) {
        console.log('checkGroupOwnership finding group', err);
        return res.json({ success: false, message: constants.errMsg });
      }

      if (!group) {
        return res.json({ success: false, messaeg: constants.groupNotFound });
      }

      if (user.bnet.battletag !== group.owner) {
        return res.json({ success: false, message: "You don't have permission to do that" });
      }
      
      req.rc_user = user;
      req.rc_group = group;
      next();
    });
  });
}

module.exports = middlewareObj;