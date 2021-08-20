export const PhoneEnum = Object.freeze({
  VALID: {name: "valid", message: "valid south african mobile number"},
  MALFORMED: {name: "malformed", message: "malformed south african mobile number"}
});

export class PhoneNumber {
  constructor(number) {
    this.number = number
  }

  get status() {
    if (/^27/.test(this.number)) {
      return PhoneEnum.VALID
    } else {
      return PhoneEnum.MALFORMED
    }
  }

  get extract() {
    if (this.status === PhoneEnum.VALID) {
      return this.number
    } else {
      return null
    }
  }
}