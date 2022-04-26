import express from 'express';
import rentalModel from '../models/rental.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await rentalModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const rental = await rentalModel.findById(id);
  if (rental === null) {
    return res.status(204).end();
  }

  res.json(rental);
})

router.post('/', async function (req, res) {
  let rental = req.body;
  const ret = await rentalModel.add(rental);

  rental = {
    rental_id: ret[0],
    ...rental
  }
  res.status(201).json(rental);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await rentalModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const rental = req.body;
  const n = await rentalModel.patch(id, rental);
  res.json({
    affected: n
  });
})

export default router;