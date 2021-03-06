import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
var cors = require('cors')

import { schema, rootValue, context } from './schema';

const PORT = 3001;
const server = express();
console.log(process.env.NEO4J_URI)
if (typeof process.env.NEO4J_URI === 'undefined') {
  console.warn('WARNING: process.env.NEO4J_URI is not defined. Check README.md for more information');
}
if (typeof process.env.NEO4J_USER === 'undefined') {
  console.warn('WARNING: process.env.NEO4J_USER is not defined. Check README.md for more information');
}
if (typeof process.env.NEO4J_PASSWORD === 'undefined') {
  console.warn('WARNING: process.env.NEO4J_PASSWORD is not defined. Check README.md for more information');
}

server.use('/graphql', cors(),bodyParser.json(), graphqlExpress(request => ({
  schema,
  rootValue,
  context: context(request.headers, process.env),
})));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: `# Welcome to GraphiQL

{
  moviesByTitle(subString:"Matrix") {
    movieId
    title
    genres
    similar {
      title
    }
  }
}
`,
}));

server.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});