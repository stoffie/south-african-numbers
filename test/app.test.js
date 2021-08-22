import {expect, agent} from './setup.js';

describe('API Test', () => {
  it('should validate a south african mobile number', done => {
    agent
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
    agent
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

  it ('should consume a file provided by API upload and display processed result', done => {
    agent
      .put('/upload_xlsx')
      .attach('xlsx', 'assets/South_African_Mobile_Numbers.xlsx', 'South_African_Mobile_Numbers.xlsx')
      .expect(204)
      .end(() => {
        done()
      });
  })
});