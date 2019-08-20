module.exports = {
  port: process.env.PORT,
  databaseUrl: process.env.databaseUrl,
  crypto: {
    hash: {
      length: 100,
      iterations: 10000,
    },
  },
  jwtSecret: process.env.jwtSecret,
  sendGrid: {
    apiKey: process.env.apiKey,
  },
  aws: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    bucketName: process.env.bucketName,
  },
};
