import gql from 'graphql-tag';

const GET_TRANSACTIONS = gql`
	{
		transactions {
			value
			name
			createdAt
			categories {
				name
			}
		}
	}
`;

export default GET_TRANSACTIONS;
