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
			accounts {
				id
				name
				number
				description
			}
			projects {
				id
				name
				description
				createdAt
				updatedAt
			}
			categories {
				id
				name
				description
				createdAt
				updatedAt
			}
			repeatPatterns {
				id
				name
				amount
				type
				startAt
				endAt
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
		}
	}
`;

export default ME;
