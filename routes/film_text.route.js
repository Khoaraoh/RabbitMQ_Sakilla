import express from 'express';
import filmTextModel from '../models/film_text.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await filmTextModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const filmText = await filmTextModel.findById(id);
  if (filmText === null) {
    return res.status(204).end();
  }

  res.json(filmText);
})

router.post('/', async function (req, res) {
  let filmText = req.body;
  const ret = await filmTextModel.add(filmText);

  filmText = {
    filmText_id: ret[0],
    ...filmText
  }
  res.status(201).json(filmText);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await filmTextModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const filmText = req.body;
  const n = await filmTextModel.patch(id, filmText);
  res.json({
    affected: n
  });
})

export default router;