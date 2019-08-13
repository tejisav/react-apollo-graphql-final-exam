import React from 'react'
import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http'
import AddOwner from './components/AddOwner'
import AddCar from './components/AddCar'
import Owners from './components/Owners'
import './App.css'

import { Typography, Container } from '@material-ui/core'

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Container>
          <Typography variant="h2" component="h2" style={{ border: '5px solid black', marginBottom: '50px' }}>
            Rich People and Cars with GraphQL
          </Typography>
        </Container>
        <AddOwner/>
        <AddCar/>
        <Owners />
      </div>
    </ApolloProvider>
  )
}

export default App
