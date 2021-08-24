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

  it('should consume a file provided by API upload and display processed result', async () => {
    await agent
      .put('/upload_xlsx')
      .attach('xlsx', 'assets/South_African_Mobile_Numbers.xlsx', 'South_African_Mobile_Numbers.xlsx')
      .expect(204)

    let res = await agent
      .get('/')
      .expect(200)

    expect(res.body.valid).to.be.an('array')
    expect(res.body.valid).to.deep.include({
      original: '27736529279',
      number: '27736529279',
      status: 'VALID',
      type: 'VALID'
    })
    expect(res.body.recoverable).to.be.an('array')
    expect(res.body.recoverable).to.deep.include({
      original: '730276061',
      number: '27730276061',
      status: 'RECOVERABLE_MISSING_COUNTRY_CODE',
      type: 'RECOVERABLE'
    })
    expect(res.body.unrecoverable).to.be.an('array')
    expect(res.body.unrecoverable).to.deep.include({
      original: '6478342944',
      number: null,
      status: 'UNRECOVERABLE_WRONG_COUNTRY_CODE',
      type: 'UNRECOVERABLE'
    })
  })
});