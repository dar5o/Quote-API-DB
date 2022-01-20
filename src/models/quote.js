'use strict';

const quoteModel = (sequelize, DataTypes) => sequelize.define('Quotes', {
  quote: {
    type: DataTypes.STRING,
    required: true,
  },
  source: {
    type: DataTypes.STRING,
    defaultValue: 'unknown',
  }
});

module.exports = quoteModel;
