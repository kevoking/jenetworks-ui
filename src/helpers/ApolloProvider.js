import VueApollo from 'vue-apollo'
import apolloClient from './ApolloClient'

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

export default apolloProvider