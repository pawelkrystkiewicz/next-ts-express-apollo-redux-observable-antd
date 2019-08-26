import { InMemoryCache } from 'apollo-boost';
import initialState from '../store/initial-state';
export default new InMemoryCache().restore(initialState || {});
