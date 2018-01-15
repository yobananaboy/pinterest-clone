import { combineReducers } from 'redux';
import { posts, postsHaveErrored, postsAreLoading, newPostLoading, newPostHasErrorred, deleteRestoreHasErrored } from './posts';
import { user } from './user';

export default combineReducers({
    posts,
    postsHaveErrored,
    postsAreLoading,
    newPostLoading,
    newPostHasErrorred,
    deleteRestoreHasErrored,
    user
});