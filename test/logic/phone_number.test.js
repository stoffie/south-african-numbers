import {PhoneEnum, PhoneNumber} from '../../src/logic/phone_number'
import {assert} from "chai";

describe('PhoneNumber', () => {
  it('should validate a south african mobile number', () => {
    let phone = new PhoneNumber('27831234567')
    assert(phone.status === PhoneEnum.VALID, "Status equals VALID")
    assert(phone.extract === '27831234567', "Extracted number equals input number")
  });
});