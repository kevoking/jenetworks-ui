import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'https://jenetworks.co.ke/graphql',
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
