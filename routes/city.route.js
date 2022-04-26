import express from 'express';
import cityModel from '../models/city.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await cityModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const city = await cityModel.findById(id);
  if (city === null) {
    return res.status(204).end();
  }

  res.json(city);
})

router.post('/', async function (req, res) {
  let city = req.body;
  const ret = await cityModel.add(city);

  city = {
    city_id: ret[0],
    ...city
  }
  res.status(201).json(city);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await cityModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const city = req.body;
  const n = await cityModel.patch(id, city);
  res.json({
    affected: n
  });
})

export default router;