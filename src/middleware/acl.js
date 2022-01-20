'use strict'

// Used one liners if there are issues check here!

module.exports = (capability) => {

  return (req, res, next) => {
    try{
      if(req.user.capabilities.includes(capability)) next();
      else next('Access Denied!');
    }catch (e){
      next('Invalid Login');
    }
  };
};