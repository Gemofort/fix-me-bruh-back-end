# HW9:

## config example:
```javascript
module.exports = {
  port: 8000,
  databaseUrl: 'MongoDB URI',
  crypto: {
    hash: {
      length: 100,
      iterations: 10000,
    },
  },
  jwtSecret: 'randomText',
  sendGrid: {
    apiKey: 'SendGrid api key',
  },
  aws: {
    accessKeyId: 's3 access key',
    secretAccessKey: 's3 secret access key',
    bucketName: 's3 bucket',
    userPhotoFolder: 'folderName',
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