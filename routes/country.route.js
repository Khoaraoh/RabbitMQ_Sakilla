import express from 'express';
import countryModel from '../models/country.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await countryModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const country = await countryModel.findById(id);
  if (country === null) {
    return res.status(204).end();
  }

  res.json(country);
})

router.post('/', async function (req, res) {
  let country = req.body;
  const ret = await countryModel.add(country);

  country = {
    country_id: ret[0],
    ...country
  }
  res.status(201).json(country);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await countryModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const country = req.body;
  const n = await countryModel.patch(id, country);
  res.json({
    affected: n
  });
})

export default router;