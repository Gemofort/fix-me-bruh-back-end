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

  it('Should login user and return his auth data', (done) => {
    chai.request(app)
      .post('/accounts/sign-in')
      .send({
        email: 'vanya6677@gmail.com',
        password: '123qwe',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName']);
        res.body.should.have.property('token');
        done();
      });
  });
  it('Should sign up user and return success', (done) => {
    chai.request(app)
      .post('/accounts/sign-up')
      .send({
        firstName: 'Ivan',
        lastName: 'TitleExample',
        email: 'vanya66777@gmail.com',
        password: '123qwe',
        phoneNumber: '+380636913660',
        longitude: 29.911230,
        latitude: 50.074718,
        category: 'xd',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success');
        done();
      });
  });
  it('Should get logged in user', (done) => {
    chai.request(app)
      .get('/accounts/user')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName',
          'phoneNumber', 'location', '_id', 'category', 'emailVerified', 'phoneVerified', 'image', 'emailValidationRequest']);
        done();
      });
  });
  it('Should update logged in user', (done) => {
    chai.request(app)
      .put('/accounts/user')
      .set('Authorization', `JWT ${token}`)
      .send({
        firstName: 'asd',
        lastName: 'asd',
        longitude: 29.911230,
        latitude: 50.074718,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName',
          'phoneNumber', 'location', '_id', 'category', 'emailVerified', 'phoneVerified', 'image']);
        done();
      });
  });
  it('Should return all users', (done) => {
    chai.request(app)
      .get('/accounts/search')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('users');
        done();
      });
  });
  it('Should return all users by query, category ID, sorting by price or rating', (done) => {
    chai.request(app)
      .get('/accounts/search?name=I&lat=50.074718&lng=29.81123&category=x')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('users');
        done();
      });
  });
  it('Should return user by id if you\'re logged in', (done) => {
    chai.request(app)
      .get('/accounts/user/5eb0aaf9973de50e8a04ea00')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName',
          'phoneNumber', 'location', '_id', 'category', 'emailVerified', 'phoneVerified', 'image']);
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
        res.body.should.have.property('image');
        done();
      });
  });
  it('Should send Veriification code to phone number', (done) => {
    chai.request(app)
      .post('/accounts/verify')
      .set('Authorization', `JWT ${token}`)
      .end((end, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success');
        done();
      });
  });
  it('Should resend Verification email', (done) => {
    chai.request(app)
      .post('/accounts/user/email')
      .set('Authorization', `JWT ${token}`)
      .end((end, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success');
        done();
      });
  });
});
