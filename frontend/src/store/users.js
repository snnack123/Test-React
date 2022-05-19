const initialState = {
    data: [],
    is_logged_in: false
};

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case 'loggedIn':
            {
                localStorage.setItem('is_logged_in', JSON.stringify(action.payload));
                //localStorage.setItem('is_logged_in', true);
                return { ...state, is_logged_in: true }
            }
        case 'isLoggedIn':
                {
                    return { ...state, is_logged_in: true }
                }
        case 'loggedOut':
            {
                localStorage.setItem('is_logged_in', JSON.stringify(action.payload));
                // localStorage.setItem('is_logged_in', false);
                return { ...state, is_logged_in: false }
            }
        case 'addUser':
            return { ...state, data: [...state.data, action.payload] };
        case 'setUsers': {
            localStorage.setItem('data', JSON.stringify(action.payload));
            return { ...state, data: [...state.data, ...action.payload] };
        }
        default:
            return state;
    }
}
