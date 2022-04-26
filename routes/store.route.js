import express from 'express';
import storeModel from '../models/store.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await storeModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const store = await storeModel.findById(id);
  if (store === null) {
    return res.status(204).end();
  }

  res.json(store);
})

router.post('/', async function (req, res) {
  let store = req.body;
  const ret = await storeModel.add(store);

  store = {
    store_id: ret[0],
    ...store
  }
  res.status(201).json(store);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await storeModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const store = req.body;
  const n = await storeModel.patch(id, store);
  res.json({
    affected: n
  });
})

export default router;