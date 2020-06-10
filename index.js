const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const app = express();
const port = process.env.DB_PORT || 3000;;
const routes = require("./routes/index.js")

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db_ip = process.env.DB_IP || 'mongo';
const db_port = process.env.DB_PORT || 27017;
const mongoUrl = `mongodb://${db_ip}:${db_port}/product_catalog`;
const dbRetryTime = process.env.db_retry_time || 2000;

//Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use("/", routes);


let db = mongoose.connection;
let connectWithRetry = function () {
    return mongoose.connect(mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });
};

connectWithRetry();


db.on('error', () => {
	setTimeout(() => {
		console.log('DB connection failed. Will try again.');
		connectWithRetry();
  }, dbRetryTime);
});


db.on('connected', () => {
    app.listen(port, () => {
        console.log(` Server listening on port ${port}!`);
    });
});

