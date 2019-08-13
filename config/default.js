module.exports = {
  port: 8000,
  databaseUrl: 'mongodb+srv://Gemofort:123qwe@test-cluster-vvyof.mongodb.net/test?retryWrites=true&w=majority',
  crypto: {
    hash: {
      length: 100,
      iterations: 10000,
    },
  },
  jwtSecret: 'asjbqvwgnvjf123#%$',
  sendGrid: {
    apiKey: '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',
  },
};
