import gql from 'graphql-tag';

const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(data: { email: $email, password: $password }) {
			name
		}
	}
`;

export default LOGIN;
