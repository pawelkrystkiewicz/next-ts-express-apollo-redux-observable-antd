import React from 'react'
import Link from 'next/link'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import SigninBox from '../components/SigninBox'
import routes from '../routes';

export default class Signin extends React.Component {
  static async getInitialProps (context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, routes.dashboard)
    }

    return {}
  }

  render () {
    return (
      <React.Fragment>
        <SigninBox />
        New?<Link prefetch href={routes.register}><a>Create account</a></Link>
      </React.Fragment>
    )
  }
}