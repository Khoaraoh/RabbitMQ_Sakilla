import express from 'express';
import filmCategoryModel from '../models/film_category.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await filmCategoryModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const filmCategory = await filmCategoryModel.findById(id);
  if (filmCategory === null) {
    return res.status(204).end();
  }

  res.json(filmCategory);
})

router.post('/', async function (req, res) {
  let filmCategory = req.body;
  const ret = await filmCategoryModel.add(filmCategory);

  filmCategory = {
    filmCategory_id: ret[0],
    ...filmCategory
  }
  res.status(201).json(filmCategory);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await filmCategoryModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const filmCategory = req.body;
  const n = await filmCategoryModel.patch(id, filmCategory);
  res.json({
    affected: n
  });
})

export default router;