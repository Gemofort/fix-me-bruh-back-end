const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const app = require('../../app');

chai.should();
chai.use(chaiHttp);

let token = '';

describe('Accounts', () => {
  before((done) => {
    chai.request(app)
      .post('/accounts/sign-in')
      .send({
        email: 'lucian@demacia.com',
        password: 'qwerty',
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

  it('Should login user and return his auth data', (done) => {
    chai.request(app)
      .post('/accounts/sign-in')
      .send({
        email: 'lucian@demacia.com',
        password: 'qwerty',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName']);
        res.body.should.have.property('token');
        done();
      });
  });
  // it('Should sign up user and return success', (done) => {
  //   chai.request(app)
  //     .post('/accounts/sign-up')
  //     .send({
  //       firstName: 'Dummy',
  //       lastName: 'Dumm',
  //       email: 'dummy@dumm.com',
  //       password: 'qwerty',
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.have.property('success');
  //       done();
  //     });
  // });
  it('Should get logged in user', (done) => {
    chai.request(app)
      .get('/accounts/user')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName',
          'username', 'title', 'price', 'category', 'rating', '__v', '_id', 'image']);
        done();
      });
  });
  it('Should update logged in user', (done) => {
    chai.request(app)
      .put('/accounts/user')
      .set('Authorization', `JWT ${token}`)
      .send({ firstName: 'Luciano' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName',
          'username', 'title', 'price', 'category', 'rating', '__v', '_id', 'image']);
        done();
      });
  });
  it('Should update logged in user category', (done) => {
    chai.request(app)
      .put('/accounts/user')
      .set('Authorization', `JWT ${token}`)
      .send({ category: '5d401071de4b8204a812a424' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName',
          'username', 'title', 'price', 'category', 'rating', '__v', '_id', 'image']);
        done();
      });
  });
  it('Should return all users', (done) => {
    chai.request(app)
      .get('/accounts/users')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('users');
        done();
      });
  });
  it('Should return all users by query, category ID, sorting by price or rating', (done) => {
    chai.request(app)
      .get('/accounts/users?search={%22field%22:%22Vas%22,%22category%22:%225d401071de4b8204a812a424%22,%22sort%22:%22price%22}')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('users');
        done();
      });
  });
  it('Should return user by id if you\'re logged in', (done) => {
    chai.request(app)
      .get('/accounts/user/5d56e1f2035d681960f8d6fc')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName',
          'username', 'title', 'price', 'category', 'rating', '__v', '_id', 'image']);
        done();
      });
  });
  it('Should send test email', (done) => {
    chai.request(app)
      .post('/accounts/email')
      .send({ email: 'vanya6677@gmail.com' })
      .end((end, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success');
        done();
      });
  });
  it('Should update logged in user image', (done) => {
    chai.request(app)
      .put('/accounts/user/photo')
      .set('Authorization', `JWT ${token}`)
      .attach('image', fs.readFileSync('something.jpg'), 'something.jpg')
      .end((end, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName',
          'username', 'title', 'price', 'category', 'rating', '__v', '_id', 'image']);
        done();
      });
  });
});
