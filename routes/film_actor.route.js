import express from 'express';
import filmActorModel from '../models/film_actor.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  const list = await filmActorModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const filmActor = await filmActorModel.findById(id);
  if (filmActor === null) {
    return res.status(204).end();
  }

  res.json(filmActor);
})

router.post('/', async function (req, res) {
  let filmActor = req.body;
  const ret = await actorModel.add(filmActor);

  filmActor = {
    filmActor_id: ret[0],
    ...filmActor
  }
  res.status(201).json(filmActor);
})

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await filmActorModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const filmActor = req.body;
  const n = await filmActorModel.patch(id, filmActor);
  res.json({
    affected: n
  });
})

export default router;