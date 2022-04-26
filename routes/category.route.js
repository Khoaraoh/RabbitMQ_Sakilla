import express from 'express';
import categoryModel from '../models/category.model.js';
import amqp from 'amqplib';

const router = express.Router();

const QUEUE = 'sakila-main';

router.get('/', async function (req, res) {
  const list = await categoryModel.findAll();
  res.json(list);
})

router.get('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const category = await categoryModel.findById(id);
  if (category === null) {
    return res.status(204).end();
  }

  res.json(category);
})

router.post('/', async function (req, res) {
  let category = req.body;
  const connect = await amqp.connect('amqp://localhost');
  const channel = await connect.createChannel();
  await channel.assertQueue(QUEUE);
  const message = JSON.stringify(category);
  channel.sendToQueue(QUEUE, Buffer.from(message, 'utf-8'));
  // const ret = await categoryModel.add(category);

  // category = {
  //   category_id: ret[0],
  //   ...category
  // }
  // res.status(201).json(category);
});

router.delete('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const n = await categoryModel.del(id);
  res.json({
    affected: n
  });
})

router.patch('/:id', async function (req, res) {
  const id = req.params.id || 0;
  const category = req.body;
  const n = await categoryModel.patch(id, category);
  res.json({
    affected: n
  });
})

router.post('/recovery', async (req, res) => {
  const connect = await amqp.connect('amqp://localhost')
  const channel = await connect.createChannel();
  await channel.assertQueue(QUEUE);
  channel.consume(QUEUE, async msg => {
    if(msg!=null)
    {
      const category = JSON.parse(msg.content.toString());
      console.log(category);
      await categoryModel.add(category);
    }
  }, {noAck: true});

  setTimeout(() => {
    connect.close();
    console.log('disconnected');
    res.status(201).json({
      status: "success"
    });
  }, 1000);
})

export default router;
