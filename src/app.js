import logger from 'morgan';
import express, {json, urlencoded} from 'express';
import {PhoneNumber} from "./logic/phone_number.js";
import {XlsxParser} from "./logic/xlsx_parser.js";
import multer from "multer";
import {PhoneNumberModel} from "./sequelize.js";
import 'express-async-errors'

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

app.put('/upload_xlsx', upload.single('xlsx'), async (req, res) => {
  let parser = new XlsxParser()
  let data = parser.parse(req.file.buffer)
  let result = data.map((e) => {
    let phone = new PhoneNumber(e)
    return {number: phone.extract, original: e, status: phone.status.name, type: phone.status.type}
  })
  await PhoneNumberModel.bulkCreate(result, {updateOnDuplicate: ["original"] })
  res.status(204).end()
})

app.get('/', async (req, res) => {
  let valid = await PhoneNumberModel.findAll({
    attributes: ['original', 'number', 'status', 'type'],
    where: {type: "VALID"}
  })
  let recoverable = await PhoneNumberModel.findAll({
    attributes: ['original', 'number', 'status', 'type'],
    where: {type: "RECOVERABLE"}
  })
  let unrecoverable = await PhoneNumberModel.findAll({
    attributes: ['original', 'number', 'status', 'type'],
    where: {type: "UNRECOVERABLE"}
  })
  res.status(200).json({valid, recoverable, unrecoverable})
})

export const server = app.listen(8080, async () => {
  console.log('Server running at http://localhost:8080')
});