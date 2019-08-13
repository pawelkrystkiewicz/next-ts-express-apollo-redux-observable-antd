import { Mutation, withApollo } from 'react-apollo';
import cookie from 'cookie';
import redirect from '../lib/redirect';
import LOGIN from '../api/Login.graphql';
import {Spinner} from './Spinner';
import routes from '../routes';

const SigninBox = ({ client }) => {
	let email, password;

	return (
		<Mutation
			mutation={LOGIN}
			onCompleted={(data) => {
				// Store the token in cookie
				// Force a reload of all the current queries now that the user is
				// logged in
				client.cache.reset().then(() => {
					redirect({}, routes.index);
				});
			}}
			onError={(error) => {
				// If you want to send error to external service?
				console.log(error);
			}}
		>
			{(login, { data, error, loading }) => (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();

						login({
							variables: {
								email: email.value,
								password: password.value
							}
						});

						email.value = password.value = '';
					}}
				>
					{error && <p>No user found with that information.</p>}
					<input
						name="email"
						placeholder="Email"
						ref={(node) => {
							email = node;
						}}
					/>
					<br />
					<input
						name="password"
						placeholder="Password"
						ref={(node) => {
							password = node;
						}}
						type="password"
					/>
					<br />
					<button>Sign in</button>

					<p>{loading && <Spinner />}</p>
				</form>
			)}
		</Mutation>
	);
};

export default withApollo(SigninBox);
