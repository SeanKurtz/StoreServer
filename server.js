const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Item = require('./models/item');
require('dotenv').config();

const MONGODB_URI = 'mongodb+srv://admin:passmesomepasscode@cluster0-mbedf.mongodb.net/test?retryWrites=true&w=majority';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/items', cors(), async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

app.post('/items', cors(), async (req, res) => {
    const item = new Item({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });
    try {
        const savedItem = await item.save();
        res.json(savedItem);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// Connect to database
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connection established');
});

app.listen(8081, function () {
    console.log('Listening on port 8081');
});