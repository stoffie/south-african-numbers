import XLSX from 'xlsx'

export class XlsxParser {
  parse(buffer) {
    const workbook = XLSX.read(buffer)
    const sheet_name_list = workbook.SheetNames;
    const xlsx_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    return xlsx_data.map((e) => e.sms_phone.toString())
  }
}