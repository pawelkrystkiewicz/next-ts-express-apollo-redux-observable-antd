import gql from 'graphql-tag';

const ACCOUNTS = gql`
	{
		accounts {
			id
			name
			number
			description
		}
	}
`;

export default ACCOUNTS;
