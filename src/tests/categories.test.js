const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

chai.should();
chai.use(chaiHttp);


describe('Categories', () => {
  it('Should return all categories', (done) => {
    chai.request(app)
      .get('/categories')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('categories');
        done();
      });
  });
});
