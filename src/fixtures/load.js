// const config = require('config');
// const path = require('path');
// const fixtures = require('pow-mongodb-fixtures').connect(config.get('databaseUrl'));
// [
//   {
//     'repeat(7, 10)': {
//       _id: '{{objectId()}}',
//       firstName: '{{firstName()}}',
//       lastName: '{{surname()}}',
//       title: '{{random("Mr", "Mrs")}}',
//       email() {
//         return `${this.firstName}.${this.lastName}@gmail.com`.toLowerCase();
//       },
//       username(){ 
//         return `${this.firstName}_${this.lastName}`
//       },
//       password: '123asd',
//       image: 'http://placehold.it/32x32',
//       rating: '{{floating(1, 10, 2, 0.00)}}',
//       price: '{{integer(500, 2000)}}',
//       category: '{{random("Node.js", "Python", "Java")}}',
//     }
//   }
// ]

// fixtures.load(path.join(__dirname, '/data.js'), (err) => {
//   console.error(err);
//   fixtures.close((err) => {
//     console.error(err);
//   });
// });
