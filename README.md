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