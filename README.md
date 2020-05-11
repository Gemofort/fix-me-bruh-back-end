# Fix me bruh:

## config example:
```javascript
module.exports = {
  server: {
    baseUrl: 'localhost:3000',
  },
  port: 3000,
  databaseUrl: your database url,
  crypto: {
    hash: {
      length: 100,
      iterations: 10000,
    },
  },
  jwtSecret: 'jwtsecret',
  sendGrid: {
    baseEmail: 'no-reply@fix-me-bruh.com',
    apiKey: your sendgrid api key,
    emailValidation: your sendgrid email validation template id,
  },
  aws: {
    accessKeyId: your aws access key,
    secretAccessKey: your aws secret access key,
    bucketName: 'fix-me-bruh',
    userPhotoFolder: 'users',
  },
  twilio: {
    accountSid: twilio account sid,
    authToken: twilio auth token,
    serviceSid: twilio service sid,
  },
};

```

### install dependecies
```
npm i
```

### run app
```
npm run dev
```

### docs link
```
localhost:{ PORT }/docs
```