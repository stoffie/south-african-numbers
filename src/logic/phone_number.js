export const PhoneStatus = Object.freeze({
  VALID: {
    name: "VALID",
    type: "VALID",
    message: "valid south african mobile number"
  },
  RECOVERABLE_MISSING_COUNTRY_CODE: {
    name: "RECOVERABLE_MISSING_COUNTRY_CODE",
    type: "RECOVERABLE",
    message: "recoverable south african mobile number due to missing country code"
  },
  RECOVERABLE_DELETED: {
    name: "RECOVERABLE_DELETED",
    type: "RECOVERABLE",
    message: "recoverable deleted south african mobile number"
  },
  UNRECOVERABLE_WRONG_COUNTRY_CODE: {
    name: "UNRECOVERABLE_WRONG_COUNTRY_CODE",
    type: "UNRECOVERABLE",
    message: "unrecoverable mobile number due to wrong country code"
  },
  UNRECOVERABLE_DELETED_MISSING_NUMBER: {
    name: "UNRECOVERABLE_DELETED_MISSING_NUMBER",
    type: "UNRECOVERABLE",
    message: "unrecoverable mobile number due to missing digits"
  },
  UNRECOVERABLE_DELETED_WRONG_COUNTRY_CODE: {
    name: "UNRECOVERABLE_DELETED_WRONG_COUNTRY_CODE",
    type: "UNRECOVERABLE",
    message: "unrecoverable deleted mobile number due to wrong country code"
  },
  UNRECOVERABLE: {
    name: "UNRECOVERABLE",
    type: "UNRECOVERABLE",
    message: "unrecoverable malformed number"
  }
});

export class PhoneNumber {
  constructor(number) {
    this.number = number
  }

  get status() {
    if (/^27[0-9]{9}$/.test(this.number)) {
      return PhoneStatus.VALID;
    } else if (/^[0-9]{10,13}$/.test(this.number)) {
      return PhoneStatus.UNRECOVERABLE_WRONG_COUNTRY_CODE
    } else if (/^[0-9]{9}$/.test(this.number)) {
      return PhoneStatus.RECOVERABLE_MISSING_COUNTRY_CODE
    } else if (/^_DELETED_/.test(this.number)) {
      return PhoneStatus.UNRECOVERABLE_DELETED_MISSING_NUMBER
    } else if (/^27[0-9]{9}_DELETED_/.test(this.number)){
      return PhoneStatus.RECOVERABLE_DELETED
    } else if (/^[0-9]{10,13}_DELETED_/.test(this.number)) {
      return PhoneStatus.UNRECOVERABLE_DELETED_WRONG_COUNTRY_CODE
    } else {
      return PhoneStatus.UNRECOVERABLE
    }
  }

  get extract() {
    switch (this.status) {
      case PhoneStatus.VALID:
        return this.number
      case PhoneStatus.RECOVERABLE_MISSING_COUNTRY_CODE:
        return "27" + this.number
      case PhoneStatus.RECOVERABLE_DELETED:
        return this.number.substring(0,11)
      default:
        return null
    }
  }
}