import gql from 'graphql-tag';

export const ACCOUNTS = gql`
	{
		me {
			accounts {
				id
				name
				number
				description
			}
		}
	}
`;

export const PROJECTS = gql`
	{
		me {
			projects {
				id
				name
				description
				createdAt
				updatedAt
			}
		}
	}
`;

export const CATEGORIES = gql`
	{
		me {
			categories {
				id
				name
				description
				createdAt
				updatedAt
			}
		}
	}
`;

export const REPEAT_PATTERNS = gql`
	{
		me {
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
		}
	}
`;
