import gql from 'graphql-tag';

export const LOGIN = gql`
	mutation($email: String!, $password: String!) {
		login(data: { Email: $email, Password: $password }) {
			FirstName
			LastName
		}
	}
`;
