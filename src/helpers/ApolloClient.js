import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'http://217.21.122.56:9292/prime/je/api/graphql',
  request: (operation) => {
    const token = localStorage.getItem('accessToken')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})

export default apolloClient