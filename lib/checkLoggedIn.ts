import gql from 'graphql-tag'
import ME from '../api/Me.graphql';

export default apolloClient =>
  apolloClient
    .query({ query: ME})
    .then(({ data }) => {
      return { loggedInUser: data }
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} }
    })