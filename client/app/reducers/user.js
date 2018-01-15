export const user = (state = false, action) => {
    switch(action.type) {
        case 'USER_UPDATED':
            return action.user;
            
        default:
            return state;
    }
};