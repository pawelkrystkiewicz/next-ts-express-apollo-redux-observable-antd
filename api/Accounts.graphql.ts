import gql from 'graphql-tag';

const ACCOUNTS = gql`
	{
		accounts {
			name
			number
			description
		}
	}
`;

export default ACCOUNTS;
