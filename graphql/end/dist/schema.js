'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.schema = undefined;exports.











































































































context = context;var _graphqlTools = require('graphql-tools');var _neo4jDriver = require('neo4j-driver'); // Construct a schema, using GraphQL schema language
// GRAND Stack workshop - begin state
// The goal of this section of the workshop is to complete our GraphQL server
// We start with a
// We need to query our Neo4j Database to ensure that we're
// Welcome to Launchpad!
// Log in to edit and save pads, run queries in GraphiQL on the right.
// graphql-tools combines a schema string with resolvers.
var typeDefs = '\n  type Movie {\n  movieId: ID!\n  title: String\n  year: Int\n  plot: String\n  poster: String\n  imdbRating: Float\n  genres: [String]\n  similar(first: Int=3, offset:Int=0): [Movie]\n}\n\ntype Query {\n  moviesByTitle(subString: String!, first: Int=3, offset: Int=0): [Movie]\n  movieById(subString: String!):[Movie]\n}\n'; // Provide resolver functions for your schema fields
var resolvers = { Query: { moviesByTitle: function moviesByTitle(root, args, context) {var session = context.driver.session();var query = 'MATCH (movie:Movie) WHERE movie.title CONTAINS $subString RETURN movie LIMIT $first;';return session.run(query, args).then(function (result) {return result.records.map(function (record) {return record.get('movie').properties;});});}, movieById: function movieById(root, args, context) {console.log('movieById', args);var session = context.driver.session();var query = 'MATCH (movie:Movie) WHERE movie.movieId = $subString RETURN movie;';return session.run(query, args).then(function (result) {console.log('session');return result.records.map(function (record) {return record.get('movie').properties;});});} }, Movie: { genres: function genres(movie, _, context) {var session = context.driver.session();var params = { movieId: movie.movieId };var query = '\n\t\t\t\tMATCH(m:Movie)-[:IN_GENRE]->(g:Genre)\n\t\t\t\tWHERE m.movieId = $movieId\n \t\t\t\tRETURN g.name AS genre\n\t\t\t';return session.run(query, params).then(function (result) {return result.records.map(function (record) {return record.get('genre');});});}, similar: function similar(movie, _, context) {var session = context.driver.session();var params = { movieId: movie.movieId };var query = '\n\t\t\t\tMATCH (m:Movie) WHERE m.movieId = $movieId\n        MATCH (m)-[:IN_GENRE]->(g:Genre)<-[:IN_GENRE]-(movie:Movie)\n        WITH m, movie, COUNT(*) AS genreOverlap\n        MATCH (m)<-[:RATED]-(:User)-[:RATED]->(movie:Movie)\n        WITH movie,genreOverlap, COUNT(*) AS userRatedScore\n        RETURN movie ORDER BY (0.9 * genreOverlap) + (0.1 * userRatedScore)  DESC LIMIT 3\n\t\t\t';return session.run(query, params).then(function (result) {return result.records.map(function (record) {return record.get('movie').properties;});});} } }; // Required: Export the GraphQL.js schema object as "schema"
var schema = exports.schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: resolvers }); // Optional: Export a function to get context from the request. It accepts two
// parameters - headers (lowercased http headers) and secrets (secrets defined
// in secrets section). It must return an object (or a promise resolving to it).
var driver = void 0;function context(headers, secrets) {if (!driver) {driver = _neo4jDriver.v1.driver(secrets.NEO4J_URI || 'bolt://localhost:7687', _neo4jDriver.v1.auth.basic(secrets.NEO4J_USER || 'neo4j', secrets.NEO4J_PASSWORD || 'letmein'));}return { driver: driver };} // Optional: Export a root value to be passed during execution
// export const rootValue = {};
// Optional: Export a root function, that returns root to be passed
// during execution, accepting headers and secrets. It can return a
// promise. rootFunction takes precedence over rootValue.
// export function rootFunction(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };
//# sourceMappingURL=schema.js.map