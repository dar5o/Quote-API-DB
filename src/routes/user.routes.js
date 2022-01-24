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
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

router.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

router.get(
  '/users',
  bearerAuth,
  permissions('read'),
  async (req, res, next) => {
    const userRecords = await Users.findAll({}); //changed from .get()
    const usersList = userRecords.map((user) => user.username); // TODO this doesn't give us an id to use for patching or deleting
    res.status(200).json(usersList);
  },
);
// TODO should add a get one to view user info in more detail

//Switched to patch since we will most likely be replacing the value, not the whole thing.
router.patch(
  '/users/:id',
  bearerAuth,
  permissions('update'),
  async (req, res, next) => {
    const record = await Users.findOne({ where: { id: req.params.id } }); //changed from .update()
    record.update(req.body);
    res.status(200).json(record.username);
  },
);

router.delete(
  '/users/:id',
  bearerAuth,
  permissions('delete'),
  async (req, res, next) => {
    // const userToDelete = await Users.findOne({ where: { id: req.params.id } });
    await Users.destroy({ where: { id: req.params.id } }); // changed from delete()
    res.status(200).json(`Deleted a user`); //Changed to 200 - 204 does not read json message - TODO: check if this returns empty object or null/undefined
    // res.status(200).json(`Deleted: ${userToDelete.username}`); //Changed to 200 - 204 does not read json message - TODO: check if this returns empty object or null/undefined
  },
);

module.exports = router;
