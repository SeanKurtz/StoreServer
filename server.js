const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/item');
require('dotenv').config();


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/items', async (req, res) => {
    try {
        const items = await items.find();
        res.json(items);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

app.post('/items', async (req, res) => {
    const item = new item({
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
mongoose.connect(process.env.DB_CONNECTION, {
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