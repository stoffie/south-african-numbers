import logger from 'morgan';
import express, { json, urlencoded } from 'express';

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Express"
    });
})

const server = app.listen(8080, () => console.log('Server running at http://localhost:8080'));

module.exports = server