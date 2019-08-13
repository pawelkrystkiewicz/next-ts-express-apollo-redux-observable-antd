import React from 'react';
import Link from 'next/link';

import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/checkLoggedIn';

import RegisterBox from '../components/RegisterBox';
import routes from '../routes';

export default class CreateAccount extends React.Component {
	static async getInitialProps(context) {
		const { loggedInUser } = await checkLoggedIn(context.apolloClient);

		if (loggedInUser.user) {
			// Already signed in? No need to continue.
			// Throw them back to the main page
			redirect(context, routes.index);
		}

		return {};
	}

	render() {
		return (
			<React.Fragment>
				<RegisterBox />
				Already have an account?
				<Link prefetch href={routes.login}>
					<a>Log in</a>
				</Link>
			</React.Fragment>
		);
	}
}
