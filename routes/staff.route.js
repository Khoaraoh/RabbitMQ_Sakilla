import express from 'express';
import staffModel from '../models/staff.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await staffModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const actor = await staffModel.findById(id);
  if (staff === null) {
    return res.status(204).end();
  }

  res.json(staff);
})

router.post('/', async function (req, res) {
  let staff = req.body;
  const ret = await staffModel.add(staff);

  staff = {
    staff_id: ret[0],
    ...staff
  }
  res.status(201).json(staff);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await staffModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const staff = req.body;
  const n = await staffModel.patch(id, staff);
  res.json({
    affected: n
  });
})

export default router;