'use strict';

const express = require('express');

const { Quotes } = require('../models');

const bearerAuth = require('../middleware/bearer');
const permissions = require('../middleware/acl');
const router = express.Router();

router.get('/quotes', bearerAuth, handleGetAll);
router.get('/quotes/:id', bearerAuth, handleGetOne);
router.put('/quotes/:id', bearerAuth, permissions('update'), handleUpdate);
router.post('/quotes', bearerAuth, permissions('create'), handleCreate);
router.delete('/quotes/:id', bearerAuth, permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
  const allQuotes = await Quotes.get();
  res.status(200).json(allQuotes);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  const oneQuote = await Quotes.get(id);
  res.status(200).json(oneQuote);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  const updatedQuote = await Quotes.update(id, obj);
  res.status(200).json(updatedQuote);
}

async function handleCreate(req, res) {
  const obj = req.body;
  const newQuote = await Quotes.create(obj);
  res.status(200).json(newQuote);
}

async function handleDelete(req, res) {
  const id = req.params.id;
  const deletedQuote = await Quotes.delete(id);
  res.status(200).json(deletedQuote);
}

module.exports = router;