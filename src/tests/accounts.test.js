const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const app = require('../../app');

chai.should();
chai.use(chaiHttp);

let token = '';

describe('Accounts', () => {
  it('Should sign up user and return success', (done) => {
    chai.request(app)
      .post('/accounts/sign-up')
      .send({
        firstName: 'Anton',
        lastName: 'Pokemon',
        email: 'trudovanton1@gmail.com',
        password: '123qwe',
        phoneNumber: '+380637242275',
        longitude: 29.911230,
        latitude: 50.074718,
        category: 'mister',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success');
        done();
      });
  });
  it('Should sign up user and return duplicate error', (done) => {
    chai.request(app)
      .post('/accounts/sign-up')
      .send({
        firstName: 'Anton',
        lastName: 'Pokemon',
        email: 'trudovanton1@gmail.com',
        password: '123qwe',
        phoneNumber: '+380637242275',
        longitude: 29.911230,
        latitude: 50.074718,
        category: 'mister',
      })
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have.property('error');
        done();
      });
  });
  it('Should sign up user and return validation error', (done) => {
    chai.request(app)
      .post('/accounts/sign-up')
      .send({
        firstName: 'Anton',
        lastName: 'Pokemon',
        email: 'trudovanton1',
        password: '123qwe',
        phoneNumber: '+380637242275',
        longitude: 29.911230,
        latitude: 50.074718,
        category: 'mister',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('type');
        done();
      });
  });
  it('Should login and return output validation error', (done) => {
    chai.request(app)
      .post('/accounts/sign-in')
      .send({
        email: 'trudovanton1212@gmail.com',
        password: '123qwe',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.should.have.property('type');
        done();
      });
  });
  it('Should login user and return his auth data', (done) => {
    chai.request(app)
      .post('/accounts/sign-in')
      .send({
        email: 'trudovanton1@gmail.com',
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
  it('Should get logged in user', (done) => {
    chai.request(app)
      .get('/accounts/user')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName',
          'phoneNumber', 'location', 'locationName', '_id', 'category', 'emailVerified', 'phoneVerified', 'image', 'emailValidationRequest']);
        done();
      });
  });
  it('Should update logged in user', (done) => {
    chai.request(app)
      .put('/accounts/user')
      .set('Authorization', `JWT ${token}`)
      .send({
        firstName: 'updatedAnton',
        lastName: 'updatedTrudov',
        longitude: 29.911230,
        latitude: 50.074718,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName',
          'phoneNumber', 'location', 'locationName', '_id', 'category', 'emailVerified', 'phoneVerified', 'image']);
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
      .get('/accounts/user/5ec1cec1ab4b28076f36fb20')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.has.keys(['firstName', 'email', 'lastName',
          'phoneNumber', 'location', 'locationName', '_id', 'category', 'emailVerified', 'phoneVerified', 'image']);
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
  it('Should update with wrong image extension', (done) => {
    chai.request(app)
      .put('/accounts/user/photo')
      .set('Authorization', `JWT ${token}`)
      .attach('image', fs.readFileSync('something.pdf'), 'something.pdf')
      .end((end, res) => {
        res.should.have.status(400);
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
  it('Should delete logged in user', (done) => {
    chai.request(app)
      .delete('/accounts/user')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
