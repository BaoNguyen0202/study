interface ThemeState {
    darkMode: boolean;
}

const initialState: ThemeState = {
    darkMode: false,
};

const themeReducer = (state: ThemeState = initialState, action: { type: string }): ThemeState => {
    switch (action.type) {
        case 'TOGGLE_DARK_MODE':
            return {
                ...state,
                darkMode: !state.darkMode,
            };
        default:
            return state;
    }
};

export default themeReducer;