import express from 'express'
import bodyParser from 'body-parser'
const app = express()
import cors from 'cors'

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

import actorRouter from './routes/actor.route.js'
import categoryRouter from './routes/category.route.js'
import cityRouter from './routes/city.route.js'
import countryRouter from './routes/country.route.js'
import customerRouter from './routes/customer.route.js'
import filmActorRouter from './routes/film_actor.route.js'
import filmCategoryRouter from './routes/film_category.route.js'
import filmTextRouter from './routes/film_text.route.js'
import filmRouter from './routes/film.route.js'
import inventoryRouter from './routes/inventory.route.js'
import languageRouter from './routes/language.route.js'
import paymentRouter from './routes/payment.route.js'
import rentalRouter from './routes/rental.route.js'
import staffRouter from './routes/staff.route.js'
import storeRouter from './routes/store.route.js'

app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/api/actor', actorRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/city', cityRouter);
app.use('/api/country', countryRouter);
app.use('/api/customer', customerRouter);
app.use('/api/films', filmRouter);
app.use('/api/film-actor', filmActorRouter);
app.use('/api/film-category', filmCategoryRouter);
app.use('/api/film-text', filmTextRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/language', languageRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/rental', rentalRouter);
app.use('/api/staff', staffRouter);
app.use('/api/store', storeRouter);


app.listen(3000)