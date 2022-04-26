import express from 'express';
import customerModel from '../models/customer.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await customerModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const customer = await customerModel.findById(id);
  if (customer === null) {
    return res.status(204).end();
  }

  res.json(customer);
})

router.post('/', async function (req, res) {
  let customer = req.body;
  const ret = await customerModel.add(customer);

  customer = {
    customer_id: ret[0],
    ...customer
  }
  res.status(201).json(customer);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await customerModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const customer = req.body;
  const n = await customerModel.patch(id, customer);
  res.json({
    affected: n
  });
})

export default router;