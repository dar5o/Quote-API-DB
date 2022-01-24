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
  console.log('hit on GET /quotes *****************');

  const allQuotes = await Quotes.get();
  res.status(200).json(allQuotes);
}

async function handleGetOne(req, res) {
  // TODO: currently returns null if object doesn't exist, should return 404 not found
  const id = req.params.id;
  const oneQuote = await Quotes.get(id);
  res.status(200).json(oneQuote);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  const updatedQuote = await Quotes.update(id, obj);
  res.status(202).json(updatedQuote);
}

async function handleCreate(req, res) {
  console.log('hit on POST /quotes *****************');
  const obj = req.body;
  const newQuote = await Quotes.create(obj);
  res.status(201).json(newQuote); 
}

async function handleDelete(req, res) {
  const id = req.params.id;
  const deletedQuote = await Quotes.delete(id);
  res.status(204).json(deletedQuote);
}

module.exports = router;