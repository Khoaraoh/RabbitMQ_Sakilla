import express from 'express';
import paymentModel from '../models/payment.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await paymentModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const payment = await paymentModel.findById(id);
  if (payment === null) {
    return res.status(204).end();
  }

  res.json(payment);
})

router.post('/', async function (req, res) {
  let payment = req.body;
  const ret = await paymentModel.add(payment);

  payment = {
    payment_id: ret[0],
    ...payment
  }
  res.status(201).json(payment);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await paymentModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const payment = req.body;
  const n = await paymentModel.patch(id, payment);
  res.json({
    affected: n
  });
})

export default router;