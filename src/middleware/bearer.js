'use strict'

const { User } = require('../models');

module.exports = async (req, res, next) => {

  try {

    if(!req.headers.authorization){
      return next('Invalid Login');
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await User.authenticateToken(token);

    req.userInfo = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }
}