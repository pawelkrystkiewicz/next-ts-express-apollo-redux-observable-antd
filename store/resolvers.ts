// import { GET_SELECTED_REPOSITORIES } from './graphql/Q.GetSelectedRepositories.graphql';
import gql from 'graphql-tag';

// export const toggleSelectRepository = (_, { id, isSelected }, { cache }) => {
// 	let { selectedRepositoryIds } = cache.readQuery({
// 		query: GET_SELECTED_REPOSITORIES
// 	});

// 	selectedRepositoryIds = isSelected
// 		? selectedRepositoryIds.filter((itemId) => itemId !== id)
// 		: selectedRepositoryIds.concat(id);

// 	cache.writeQuery({
// 		query: GET_SELECTED_REPOSITORIES,
// 		data: { selectedRepositoryIds }
// 	});

// 	return { id, isSelected: !isSelected };
// };


export const writeValue = (_, { name, value }, { cache }) => {
	cache.writeQuery({
		data: { [name]: value }
	});
	// console.log(name, value);
};

export const readValue = (_, { object, name }, { cache }) => {
	let value = cache.readQuery({query: gql`query ${object}{${name}}`});
	console.log(value);
	return value;
};

//ACTIONS
export const execMutation = (mutation: string) => {};
export const execQuery = (mutation: string) => {};
