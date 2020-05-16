module.exports = {
  server: {
    baseUrl: process.env.BASE_API_URL,
  },
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  crypto: {
    hash: {
      length: 100,
      iterations: 10000,
    },
  },
  jwtSecret: process.env.JWT_SECRET,
  sendGrid: {
    baseEmail: process.env.SENDGRID_BASE_EMAIL,
    apiKey: process.env.SENDGRID_API_KEY,
    emailValidation: process.env.SENDGRID_EMAILVAL_TEMPLATE,
    resetPassword: process.env.SENDGRID_RESPASS_TEMPLATE,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
    userPhotoFolder: process.env.AWS_USER_FOLDER,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    serviceSid: process.env.TWILIO_SERVICE_SID,
  },
};
