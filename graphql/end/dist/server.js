'use strict';var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _graphqlServerExpress = require('graphql-server-express');
var _bodyParser = require('body-parser');var _bodyParser2 = _interopRequireDefault(_bodyParser);


var _schema = require('./schema');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var cors = require('cors');

var PORT = 3001;
var server = (0, _express2.default)();
console.log(process.env.NEO4J_URI);
if (typeof process.env.NEO4J_URI === 'undefined') {
  console.warn('WARNING: process.env.NEO4J_URI is not defined. Check README.md for more information');
}
if (typeof process.env.NEO4J_USER === 'undefined') {
  console.warn('WARNING: process.env.NEO4J_USER is not defined. Check README.md for more information');
}
if (typeof process.env.NEO4J_PASSWORD === 'undefined') {
  console.warn('WARNING: process.env.NEO4J_PASSWORD is not defined. Check README.md for more information');
}

server.use('/graphql', cors(), _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)(function (request) {return {
    schema: _schema.schema,
    rootValue: _schema.rootValue,
    context: (0, _schema.context)(request.headers, process.env) };}));


server.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
  endpointURL: '/graphql',
  query: '# Welcome to GraphiQL\n\n{\n  moviesByTitle(subString:"Matrix") {\n    movieId\n    title\n    genres\n    similar {\n      title\n    }\n  }\n}\n' }));














server.listen(PORT, function () {
  console.log('GraphQL Server is now running on http://localhost:' + PORT + '/graphql');
  console.log('View GraphiQL at http://localhost:' + PORT + '/graphiql');
});
//# sourceMappingURL=server.js.map