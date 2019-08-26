import { withClientState } from 'apollo-link-state';
import cache from '../lib/cache';

export default withClientState({
	cache,
	resolvers: {
		Mutation: {
			updateNetworkStatus: (_, { isConnected }, { cache }) => {
				const data = {
					networkStatus: {
						__typename: 'NetworkStatus',
						isConnected
					}
				};
				cache.writeData({ data });
				return null;
			}
		}
	}
});
