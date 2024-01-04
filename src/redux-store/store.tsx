import { createStore } from 'redux';

// Reducer
const Reducer = (state = 0, action: any) => {
    switch (action.type) {
        case 'add':
            return state + 10;
        case 'minus':
            return state - 10;
        default:
            return state;
    }
};

// Store
const store = createStore(Reducer);

export default store;
