'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const SECRET = process.env.SECRET;

const UserModel = (sequelize, DataTypes) => {
  const Model = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    role: {
      type: DataTypes.ENUM('user','admin'),
      required: true,
      defaultValue: 'user',
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(token) {
        return jwt.sign(token, SECRET);       
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read', 'create'],
          admin:['read', 'create', 'update', 'delete']
        };
        return acl[this.role];
      }
    }
  });

  Model.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  Model.authenticateBasic = async function(username, password) {
    try {
      const user = await this.findOne({where: { username }});
    } catch (e) {
      throw new Error('Server Error: Not Found'); // if DB fails 
    }
    const validUser = await bcrypt.compare(password, user.password); // compares entered PW with stored PW
    if (validUser) return user;
    throw new Error('invalid user'); // if credentials don't check out
  };

  Model.authenticateToken = async function(token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ where: { username: parsedToken.username }});
      if (user) return user;
      throw new Error('User not found')     
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return Model;
}

module.exports = UserModel;