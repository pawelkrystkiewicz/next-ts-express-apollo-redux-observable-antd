import React from 'react';
import App from 'next/app';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import { Provider } from 'react-redux';

import { ApolloProvider } from 'react-apollo';
import withApollo from '../lib/withApollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
const linkStyle = {
	margin: '0 10px 0 0'
};

Router.events.on('routeChangeStart', (url) => {
	// console.log(`Loading: ${url}`);
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App<any> {
	static async getInitialProps({ Component, router, ctx }) {
		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

		return { pageProps };
	}
	componentDidCatch(error, errorInfo) {
		console.log('CUSTOM ERROR HANDLING', error);
		// This is needed to render errors correctly in development / production
		super.componentDidCatch(error, errorInfo);
	}
	render() {
		const { Component, pageProps, store, apolloClient } = this.props;
		return (
			<ApolloProvider client={apolloClient}>
				<ApolloHooksProvider client={apolloClient}>
					<Provider store={store}>
						<Component {...pageProps} />
					</Provider>
				</ApolloHooksProvider>
			</ApolloProvider>
		);
	}
}

export default withApollo(MyApp);
