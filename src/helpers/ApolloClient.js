import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'http://217.21.122.59:9292/graphql',
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