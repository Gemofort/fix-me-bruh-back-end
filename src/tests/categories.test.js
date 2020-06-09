const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

chai.should();
chai.use(chaiHttp);

let token = '';

describe('Categories', () => {
  before((done) => {
    chai.request(app)
      .post('/accounts/sign-in')
      .send({
        email: 'kek@gmail.com',
        password: '123qwe',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName']);
        res.body.should.have.property('token');
        // eslint-disable-next-line prefer-destructuring
        token = res.body.token;
        done();
      });
  });
  it('Should return all categories', (done) => {
    chai.request(app)
      .get('/categories')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('categories');
        done();
      });
  });
});
