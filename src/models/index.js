'use strict';

const { Sequelize, DataTypes } = require('sequelize');

// Models
const QuoteModel = require('./quote.js');
const UserModel = require('./user.js');
const Collection = require('./data-collection.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ?
 'sqlite:memory' :
  process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ?
 {
   dialecticOptions: {
     ssl: true,
     rejectUnauthorized: false,
   }
 } : {};

 const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
 const Quotes = QuoteModel(sequelize, DataTypes);
 const Users = UserModel(sequelize, DataTypes);

 module.exports = {
   db: sequelize,
   Quotes: new Collection(Quotes),
   Users: new Collection(Users),
 }
