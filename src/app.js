import logger from 'morgan';
import express, {json, urlencoded} from 'express';
import {PhoneNumber} from "./logic/phone_number";

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({extended: true}));

app.get('/validate_phone/:number', (req, res) => {
  let param = req.params.number
  let number = new PhoneNumber(param)
  res.status(200).json({
    "status": number.status.name,
    "message": number.status.message,
    "number": number.extract
  })
})

const server = app.listen(8080, () => console.log('Server running at http://localhost:8080'));

module.exports = server