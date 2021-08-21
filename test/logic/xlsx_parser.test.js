import {XlsxParser} from "../../src/logic/xlsx_parser";
import * as fs from "fs";
import {assert} from "chai";

describe('XlsxParser', () => {
  it('should parse a xlsx document buffer of phone numbers to a json list of strings', () => {
    let parser = new XlsxParser()
    let buffer = fs.readFileSync("assets/South_African_Mobile_Numbers.xlsx")
    let data = parser.parse(buffer)
    assert(data[0] === "6478342944", "First phone number not parsed correctly")
    assert(data[1] === '84528784843', "Second phone number not parsed correctly")
  });
})
