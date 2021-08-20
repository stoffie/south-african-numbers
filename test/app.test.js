import {expect, server} from './setup';

describe('app page test', () => {
  it('should validate a south african mobile number', done => {
    server
      .get('/validate_phone/27831234567')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.eql({
          status: "valid",
          message: "valid south african mobile number",
          number: "27831234567"
        })
        done()
      })
  })

  it('should reject a malformed south african mobile number', done => {
    server
      .get('/validate_phone/831234567')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.eql({
          status: "malformed",
          message: "malformed south african mobile number",
          number: null
        })
        done()
      })
  })
});