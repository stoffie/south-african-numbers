import {PhoneStatus, PhoneNumber} from '../../src/logic/phone_number'
import {assert} from "chai";

describe('PhoneNumber', () => {
  it('should validate a mobile number if it has the country code 27 and 9 digits', () => {
    let phone = new PhoneNumber('27831234567')
    assert(phone.status === PhoneStatus.VALID, "Status equals VALID")
    assert(phone.extract === '27831234567', "Extracted number equals the number")
  });

  it('should mark a mobile number as unrecoverable if it has an unknown country code and 9 digits', () => {
    let phone = new PhoneNumber('6478342944')
    assert(phone.status === PhoneStatus.UNRECOVERABLE_WRONG_COUNTRY_CODE, "Status equals UNRECOVERABLE_WRONG_COUNTRY_CODE")
    assert(phone.extract === null, "Extracted number equals null")
  })

  it('should mark a mobile number as recoverable if it has 9 digits', () => {
    let phone = new PhoneNumber('730276061')
    assert(phone.status === PhoneStatus.RECOVERABLE_MISSING_COUNTRY_CODE, "Status equals RECOVERABLE_MISSING_COUNTRY_CODE")
    assert(phone.extract === '27730276061', "Extracted number equals the number plus the country code")
  })

  it('should mark a deleted number as unrecoverable if the phone number is missing', () => {
    let phone = new PhoneNumber('_DELETED_1488454802')
    assert(phone.status === PhoneStatus.UNRECOVERABLE_DELETED_MISSING_NUMBER, "Status equals UNRECOVERABLE_DELETED_MISSING_NUMBER")
    assert(phone.extract === null, "Extracted number equals null")
  })

  it('should mark a deleted number as recoverable if the phone number has correct country code and 9 digits', () => {
    let phone = new PhoneNumber('27836826107_DELETED_1488996550')
    assert(phone.status === PhoneStatus.RECOVERABLE_DELETED, "Status equals RECOVERABLE_DELETED")
    assert(phone.extract === "27836826107", "Extracted number equals the deleted phone number")
  })

  it('should mark a deleted number as unrecoverable if the phone number has an unknown country code', () => {
    let phone = new PhoneNumber('639228325226_DELETED_1486375766')
    assert(phone.status === PhoneStatus.UNRECOVERABLE_DELETED_WRONG_COUNTRY_CODE, "Status equals UNRECOVERABLE_DELETED_WRONG_COUNTRY_CODE")
    assert(phone.extract === null, "Extracted number equals null")
  })

  it('should mark a mobile phone unrecoverable when it is none of the cases above', () => {
    let phone = new PhoneNumber('something')
    assert(phone.status === PhoneStatus.UNRECOVERABLE, "Status equals UNRECOVERABLE")
    assert(phone.extract === null, "Extracted number equals null")
  })
});