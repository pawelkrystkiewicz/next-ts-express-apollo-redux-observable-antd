import React, { ReactNode, Component } from 'react';
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
import { ACCOUNTS, PROJECTS, REPEAT_PATTERNS, CATEGORIES } from '../api/UserDetails.graphql';
import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;
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
			// return null;
			return (
				<Card style={{ width: 300 }}>
					<Meta
						avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
						title={me.name}
						description={me.email}
					/>
				</Card>
			);
	}
};

const ToTableQuery = ({ property, query }) => {
	const { data, error, loading } = useQuery(query);
	switch (true) {
		case !!error:
			return <span>{JSON.stringify(error)}</span>;
		case loading:
		default:
			return <Spinner />;
		case !!data[property]:
			// return null;
			return <div>{JSON.stringify(data[property])}</div>;
	}
};

const tabsToRender = [
	{
		title: 'User details',
		component: <UserDetails />
	},
	{
		title: 'Accounts',
		component: <ToTableQuery property={'me'} query={ACCOUNTS} />
	},
	{
		title: 'Categories',
		component: <ToTableQuery property={'me'} query={ACCOUNTS} />
	},
	{
		title: 'Projects',
		component: <ToTableQuery property={'me'} query={PROJECTS} />
	},
	{
		title: 'Repeat patterns',
		component: <ToTableQuery property={'me'} query={REPEAT_PATTERNS} />
	}
];

export default class UserPage extends React.Component<any> {
	static async getInitialProps(context) {
		const { loggedInUser } = await checkLoggedIn(context.apolloClient);
		if (!loggedInUser.me) {
			redirect(context, routes.login);
		}
		return { loggedInUser };
	}

	render() {
		let i = 0;
		return (
			<LayoutAuth title={this.props.loggedInUser.me.name}>
				<Tabs defaultActiveKey="1">
					{tabsToRender.map(({ title, component }) => {
						i++;
						return (
							<TabPane tab={title} key={i}>
								{component}
							</TabPane>
						);
					})}
				</Tabs>
			</LayoutAuth>
		);
	}
}
