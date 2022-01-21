'use strict'

const base64 = require('base-64');

const { Users } = require('../models');

module.exports = async (req, res, next) => {
  if(!req.headers.authorization){
    return next('No Auth Header');
  }

  const basicHeaderParts = req.headers.authorization.split(' ');
  const encodedString = basicHeaderParts.pop();
  const decodedString = base64.decode(encodedString);

  const [username, password] = decodedString.split(':');

  try {
    console.log(username, password);
    req.userInfo = await Users.authenticateBasic(username, password);
    
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}