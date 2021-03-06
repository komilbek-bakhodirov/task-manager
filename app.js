const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
require('dotenv').config();
const connectDB = require('./db/connect');
const express = require('express');
const tasks = require('./routes/tasks');

const app = express();

// middleware
app.use(express.json());
app.use(express.static('./public'));

// routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();