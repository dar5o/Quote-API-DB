'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require('./middleware/error-handlers/500');
const notFound = require('./middleware/error-handlers/404');

const userRoutes = require('./routes/user.routes');
const quoteRoutes = require('./routes/quote.routes');

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cors());
server.use(morgan('tiny'));
server.use(userRoutes);
server.use('/api', quoteRoutes);
server.use(notFound);
server.use(errorHandler);

module.exports = {
  server, 
  start: (port) => {
    server.listen(port, () => {
      console.log(`server running on port: ${port}`);
    });
  },
};