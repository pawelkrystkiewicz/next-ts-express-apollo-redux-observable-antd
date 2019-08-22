import gql from 'graphql-tag';

const GET_TRANSACTION = gql`
	{
		transactions {
			id
			value
			name
			createdAt
			categories {
				name
			}
		}
	}
`;

export default GET_TRANSACTION;
