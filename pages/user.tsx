import React, { ReactNode } from 'react';
import cookie from 'cookie';
import { ApolloConsumer } from 'react-apollo';
// import { Button } from 'antd';
import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/checkLoggedIn';
import routes from '../routes';
import LOGOUT from '../api/Logout.graphql';
import { LayoutAuth } from '../layouts/auth';
import { useQuery } from '@apollo/react-hooks';
import { ME_FULL } from '../api/Me.graphql';
import { Spinner } from '../components/Spinner';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export const signout = (apolloClient) => async () => {
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

const UserDetails = () => {
	const { data: { me }, error, loading } = useQuery(ME_FULL);

	switch (true) {
		case !!error:
			return <span>{JSON.stringify(error)}</span>;
		case loading:
		default:
			return <Spinner />;
		case !!me:
			return null;
		// return <div>{JSON.stringify(me)}</div>;
	}
};

export default class UserPage extends React.Component<any> {
	static async getInitialProps(context) {
		const { loggedInUser } = await checkLoggedIn(context.apolloClient);
		if (!loggedInUser.me) {
			redirect(context, routes.login);
		}
		return { loggedInUser };
	}

	render() {
		return (
			<LayoutAuth title="User">
				<ApolloConsumer>
					{(client) => (
						<div>
							Hello {this.props.loggedInUser.me.name}!<br />
							{/* <button onClick={signout(client)}>Sign out</button> */}
							{/* <br /> */}
							<Tabs defaultActiveKey="1">
								<TabPane tab="Tab 1" key="1">
									Content of Tab Pane 1
								</TabPane>
								<TabPane tab="Tab 2" key="2">
									Content of Tab Pane 2
								</TabPane>
								<TabPane tab="Tab 3" key="3">
									Content of Tab Pane 3
								</TabPane>
							</Tabs>
							<UserDetails />
						</div>
					)}
				</ApolloConsumer>
			</LayoutAuth>
		);
	}
}
