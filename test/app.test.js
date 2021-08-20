import {expect, server} from './setup';

describe('app page test', () => {
  it('should return status code 200', done => {
    server
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return a message', done => {
    server
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal(
          'Welcome to Express'
        );
        done();
      });
  });

  it('should validate a south african mobile number', done => {
    server
      .get('/validate_phone?number=27831234567')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.equal({
          status: "valid",
          message: "valid south african mobile number",
          number: "27831234567"
        })
      })
  })
});