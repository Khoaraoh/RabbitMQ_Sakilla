import express from 'express';
import languageModel from '../models/language.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await languageModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const language = await languageModel.findById(id);
  if (language === null) {
    return res.status(204).end();
  }

  res.json(language);
})

router.post('/', async function (req, res) {
  let language = req.body;
  const ret = await languageModel.add(language);

  language = {
    language_id: ret[0],
    ...language
  }
  res.status(201).json(language);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await languageModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const language = req.body;
  const n = await languageModel.patch(id, language);
  res.json({
    affected: n
  });
})

export default router;