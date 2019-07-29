const path          = require('path');
const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const productRouter = require('./routes/products');

/* setup env and express */
const app = express();

/* global variables */
let PORT, DATABASE_URL;
const { log } = console;
if(!process.env.NODE_ENV) {
  const env = require('dotenv').config();
  PORT = process.env.PORT;
  DATABASE_URL = process.env.DATABASE_URL;
}

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
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/products', productRouter);

app.get('/', (req, res) => {
  res.render('landing');
});

app.listen(PORT, () => {
  log(`shopping cart running on port ${PORT}`);
});
