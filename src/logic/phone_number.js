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
    if (/^27/.test(this.number)) {
      return PhoneStatus.VALID
    } else {
      return PhoneStatus.UNRECOVERABLE
    }
  }

  get extract() {
    if (this.status === PhoneStatus.VALID) {
      return this.number
    } else {
      return null
    }
  }
}