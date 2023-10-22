// bookSchema.js
const { buildSchema } = require('graphql');
// Créer un schéma GraphQL
const bookSchema = buildSchema(` 
type Query {
book(id: Int!): Book
books: [Book]
}
type Mutation {
addBook(title: String!, author: String!, publicationYear:  Int!): Book
updateBook(id: Int!, title: String!, author: String!, publicationYear:  Int!): Book
deleteBook(id: Int!): String
}

type Book {
id: Int
title: String
author: String
publicationYear: Int
}
`);
module.exports = bookSchema;