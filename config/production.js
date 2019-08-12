module.exports = {
  port: process.env.PORT,
  databaseUrl: 'mongodb+srv://Gemofort:123qwe@test-cluster-vvyof.mongodb.net/test?retryWrites=true&w=majority',
  crypto: {
    hash: {
      length: 100,
      iterations: 10000,
    },
  },
  jwtSecret: 'asjbqvwgnvjf123#%$',
};
