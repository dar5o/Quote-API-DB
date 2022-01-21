'use strict';

const express = require('express');

const router = express.Router();

const { Users } = require('../models/index');

const basicAuth = require('../middleware/basic');
const bearerAuth = require('../middleware/bearer');
const permissions = require('../middleware/acl');

router.post('/signup', async (req, res, next) => {
  try {
    const userRecord = await Users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

router.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.userInfo,
    token: req.userInfo.token
  };
  res.status(200).json(user);
});

router.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await Users.get();
  const usersList = userRecords.map(user => user.username);
  res.status(200).json(usersList);
});

router.put('/users/:id', bearerAuth, permissions('update'), async (req, res, next) => {
  const updatedUser = await Users.update(req.params.id, req.body);
  res.status(200).json(updatedUser.username);
});

router.delete('/users/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userToDelete = await Users.delete(req.params.id);
  res.status(204).send(userToDelete); //TODO: check if this returns empty object or null/undefined
});

module.exports = router;