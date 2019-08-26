import gql from 'graphql-tag';

const ME = gql`
	{
		me {
			name
		}
	}
`;
export const ME_FULL = gql`
	{
		me {
			id
			firstName
			lastName
			name
			email
			role
			createdAt
			updatedAt
		}
	}
`;

export default ME;
