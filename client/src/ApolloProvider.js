import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from 'apollo-link-context'

import App from './App'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken')
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        freezeResults: true
    }),
    assumeImmutableResults: true,
})


export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)