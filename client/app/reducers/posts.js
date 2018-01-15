export const posts = (state = [], action) => {
    switch(action.type) {
        case 'POSTS_UPDATED':
            return action.posts;
            
        default:
            return state;
    }
};

export const postsHaveErrored = (state = '', action) => {
    switch(action.type) {
        case 'POSTS_HAVE_ERRORED':
            return action.message;
            
        default:
            return state;
    }
};

export const postsAreLoading = (state = false, action) => {
    switch(action.type) {
        case 'POSTS_ARE_LOADING':
            return action.loading;
            
        default:
            return state;
    }
};

export const newPostLoading = (state = false, action) => {
    switch(action.type) {
        case 'NEW_POST_IS_LOADING':
            return action.loading;
            
        default:
            return state;
    }
};

export const newPostHasErrorred = (state = '', action) => {
    switch(action.type) {
        case 'NEW_POST_HAS_ERRORED':
            return action.message;
            
        default:
            return state;
    }
};

export const deleteRestoreHasErrored = (state = false, action) => {
    switch(action.type) {
        case 'DELETE_RESTORE_HAS_ERRORED':
            return action.data;
            
        default:
            return state;
    }
};