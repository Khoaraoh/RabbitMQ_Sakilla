import express from 'express';
import inventoryModel from '../models/inventory.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await inventoryModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const inventory = await inventoryModel.findById(id);
  if (inventory === null) {
    return res.status(204).end();
  }

  res.json(inventory);
})

router.post('/', async function (req, res) {
  let inventory = req.body;
  const ret = await inventoryModel.add(inventory);

  inventory = {
    inventory_id: ret[0],
    ...inventory
  }
  res.status(201).json(inventory);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await inventoryModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const inventory = req.body;
  const n = await inventoryModel.patch(id, inventory);
  res.json({
    affected: n
  });
})

export default router;