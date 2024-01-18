import { createStore, combineReducers } from 'redux';
import themeReducer from './reducers/theme-reducer';

const rootReducer = combineReducers({
    theme: themeReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;