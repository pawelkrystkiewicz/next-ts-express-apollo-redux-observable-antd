import gql from 'graphql-tag';

const REGISTER_TRANSACTION = gql`
	mutation addTransaction(
		$value: Float!
		$name: String!
		$code: String!
		$accountName: String!
		$categoriesName: [TransactionCategories!]!
		$createdAt: DateTime
	) {
		registerTransaction(
			data: {
				value: $value
				name: $name
				code: $code
				categoriesName: $categoriesName
				accountName: $accountName
				createdAt: $createdAt
			}
		) {
			id
		}
	}
`;

export default REGISTER_TRANSACTION;
