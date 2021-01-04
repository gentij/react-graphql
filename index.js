const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const { MONGODB } = require('./config.js')
const resolvers = require('./graphql/resolvers/index')
const typeDefs = require('./graphql/typeDefs')

const PORT = 5000


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
})

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        return server.listen(PORT)
    })
    .then(() => {
        console.log(`Server running on port ${PORT}`)
    })

