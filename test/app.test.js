import {expect, server} from './setup';

describe('app page test', () => {
  it('should validate a south african mobile number', done => {
    server
      .get('/validate_phone/27831234567')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.eql({
          status: "VALID",
          type: "VALID",
          message: "valid south african mobile number",
          number: "27831234567"
        })
        done()
      })
  })

  it('should reject a malformed south african mobile number', done => {
    server
      .get('/validate_phone/something')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.eql({
          status: "UNRECOVERABLE",
          type: "UNRECOVERABLE",
          message: "unrecoverable malformed number",
          number: null
        })
        done()
      })
  })
});