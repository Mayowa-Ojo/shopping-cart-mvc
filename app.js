const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env = require('dotenv');
const productRouter = require('./routes/products');

/* setup env and express */
env.config();
const app = express();

/* global variables */
const { log } = console;
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

/* connect mongoose */
mongoose.connect(DATABASE_URL, ({ useNewUrlParser: true }));
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => log('connected to database'));

/* setup middlewares */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/products', productRouter);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  log(`shopping cart running on port ${PORT}`);
});
