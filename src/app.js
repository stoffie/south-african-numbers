import logger from 'morgan';
import express, {json, urlencoded} from 'express';
import {PhoneNumber} from "./logic/phone_number.js";
import {XlsxParser} from "./logic/xlsx_parser.js";
import multer from "multer";
import {PhoneNumberModel} from "./sequelize.js";

const upload = multer({storage: multer.memoryStorage({})})

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({extended: true}));

app.get('/validate_phone/:number', (req, res) => {
  let param = req.params.number
  let number = new PhoneNumber(param)
  res.status(200).json({
    "status": number.status.name,
    "type": number.status.type,
    "message": number.status.message,
    "number": number.extract
  })
})

app.put('/upload_xlsx', upload.single('xlsx'), (req, res) => {
  let parser = new XlsxParser()
  let data = parser.parse(req.file.buffer)
  //console.log(data)
  res.status(204).end()
})

app.get('/', (req, res) => {
  res.status(200).json(PhoneNumberModel.findAndCountAll())
})

export const server = app.listen(8080, async () => {
  console.log('Server running at http://localhost:8080')
});