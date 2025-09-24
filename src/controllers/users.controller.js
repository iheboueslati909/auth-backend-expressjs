// src/api/controllers/users.controller.js
'use strict';

const UserModel = require('../models/user.model');

/**
 * GET /users/me
 * Requires authenticate middleware to have set req.user
 */
async function getMe(req, res, next) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const safe = typeof user.toSafeObject === 'function' ? user.toSafeObject() : user.toObject();
    return res.status(200).json({ user: safe });
  } catch (err) {
    return next(err);
  }
}


module.exports = {
  getMe,
};
