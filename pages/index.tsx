// import React from 'react'
// import Link from 'next/link'
// import { of, Subject } from 'rxjs'
// import { StateObservable } from 'redux-observable'
// import { connect } from 'react-redux'
// import CharacterInfo from '../components/CharacterInfo'
// import { rootEpic } from '../store/epics'
// import * as actions from '../store/actions'

// class Counter extends React.Component<any> {
//   static async getInitialProps ({ store, isServer }) {
//     const state$ = new StateObservable(new Subject(), store.getState())
//     const resultAction = await rootEpic(
//       of(actions.fetchCharacter(isServer)),
//       state$
//     ).toPromise() // we need to convert Observable to Promise
//     store.dispatch(resultAction)

//     return { isServer }
//   }

//   componentDidMount () {
//     this.props.startFetchingCharacters()
//   }

//   componentWillUnmount () {
//     this.props.stopFetchingCharacters()
//   }

//   render () {
//     return (
//       <div>
//         <h1>Index Page</h1>
//         <CharacterInfo />
//         <br />
//         <nav>
//           <Link href='/other'>
//             <a>Navigate to "/other"</a>
//           </Link>
//         </nav>
//       </div>
//     )
//   }
// }

// export default connect(
//   null,
//   {
//     startFetchingCharacters: actions.startFetchingCharacters,
//     stopFetchingCharacters: actions.stopFetchingCharacters
//   }
// )(Counter)

import React from 'react';
import cookie from 'cookie';
import { ApolloConsumer } from 'react-apollo';

import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/checkLoggedIn';
import routes from '../routes';
import LOGOUT from '../api/Logout.graphql';

export default class Index extends React.Component<any> {
	static async getInitialProps(context, apolloClient) {
		const { loggedInUser } = await checkLoggedIn(context.apolloClient);

		if (!loggedInUser.me) {
			// If not signed in, send them somewhere more useful
			redirect(context, routes.login);
		}

		return { loggedInUser };
	}

	signout = (apolloClient) => async () => {
		await apolloClient.mutate({ mutation: LOGOUT });
		document.cookie = cookie.serialize('sid', '', {
			maxAge: -1 // Expire the cookie immediately
		});

		// Force a reload of all the current queries now that the user is
		// logged in, so we don't accidentally leave any state around.
		apolloClient.cache.reset().then(() => {
			// Redirect to a more useful page when signed out
			redirect({}, routes.login);
		});
	};

	render() {
		return (
			<ApolloConsumer>
				{(client) => (
					<div>
						Hello {this.props.loggedInUser.me.name}!<br />
						<button onClick={this.signout(client)}>Sign out</button>
					</div>
				)}
			</ApolloConsumer>
		);
	}
}
