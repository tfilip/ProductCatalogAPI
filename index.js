const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const app = express();
const port = 3000;
const routes = require("./routes/index.js")


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db_ip = process.env.DB_IP || 'localhost';
const db_port = process.env.DB_PORT || 27017;
const mongoUrl = `mongodb://${db_ip}:${db_port}/2checkout`;
 
//Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use("/", routes);

app.listen(port, () => {
    console.log(` Server listening on port ${port}!`);
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  }).then(() => {
        console.log(`Connected to moongoDB on ${db_ip}:${db_port}`)
    });
});