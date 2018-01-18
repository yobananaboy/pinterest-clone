import axios from 'axios';
import imageType from 'image-type';

const getPostsUrl = '/get-all-posts';
const addNewPostUrl = '/add-new-post';
const deleteRestorePostUrl = '/delete-restore-post';
const likePostUrl = '/like-post';

export const getPosts = () => {
    console.log('spud');
    return(dispatch) => {
        dispatch(sendPostsAreLoading(true));
        /*
        const request = axios.get(getPostsUrl);
        
        return request.then(
            res => {
                dispatch(sendPostsAreLoading(false));
                if(res.data.success) {
                    console.log('success');
                    dispatch(postsUpdated(res.data.posts));
                }
                if(res.data.err) {
                    console.log('fail1');
                    dispatch(sendPostsHaveErroredMessage('Could not get posts. Please try again by refreshing your page.'));
                }
            },
            err => {
                if(err) {
                    console.log('fail2');
                    dispatch(sendPostsAreLoading(false));
                    dispatch(sendPostsHaveErroredMessage('Could not get posts. Please try again by refreshing your page.'));   
                }
            }
            );*/
          axios.get(getPostsUrl)
            .then(res => {
                dispatch(sendPostsAreLoading(false));
                if(res.data.success) {
                    dispatch(postsUpdated(res.data.posts));
                }
                if(res.data.err) {
                    dispatch(sendPostsHaveErroredMessage('Could not get posts. Please try again by refreshing your page.'));
                }
            })
            .then(err => {
                if(err) {
                    dispatch(sendPostsAreLoading(false));
                    dispatch(sendPostsHaveErroredMessage('Could not get posts. Please try again by refreshing your page.'));   
                }
            });
    };
};

export const addNewPost = (user, post) => {
    return(dispatch) => {
        dispatch(newPostLoading(true));
        axios.post(addNewPostUrl, {
                user,
                post
            })
        .then(res => {
            dispatch(newPostLoading(false));
            if(res.data.success) {
                dispatch(postsUpdated(res.data.posts));
            }
            if(res.data.err) {
                dispatch(sendNewPostHasErrorredMessage('Could not update post.'));
            }
        })
        .then(err => {
            if(err) {
                dispatch(newPostLoading(false));
                dispatch(sendNewPostHasErrorredMessage('Could not update post.'));
            }
        });
    };
};

export const deleteRestorePost = (post) => {
    return(dispatch) => {
        axios.post(deleteRestorePostUrl, {
            post
        })
        .then(res => {
            if(res.data.success) {
                dispatch(postsUpdated(res.data.posts));
            }
            if(res.data.err) {
                dispatch(sendDeleteRestoreHasErroredMessage(
                    {
                        message:'Could not restore or delete post. Please try again.',
                        post
                        
                    }
                ));
            }
        })
        .then(err => {
            if(err) {
                dispatch(sendDeleteRestoreHasErroredMessage(
                    {
                        message:'Could not restore or delete post. Please try again.',
                        post
                    }
                ));
            }
        });
    };
};

export const likePost = (user, post) => {
    console.log('liking post');
    return(dispatch) => {
        axios.post(likePostUrl, {
            user,
            post
        })
        .then(res => {
            if(res.data.success) {
                dispatch(postsUpdated(res.data.posts));
            }
        });
    };
};

export const postsUpdated = (posts) => {
    return {
        type: 'POSTS_UPDATED',
        posts
    };
};

export const sendPostsHaveErroredMessage = (message) => {
    return {
        type: 'POSTS_HAVE_ERRORED',
        message
    };
};

export const sendPostsAreLoading = (bool) => {
    return {
        type: 'POSTS_ARE_LOADING',
        loading: bool
    };
};

export const newPostLoading = (bool) => {
    return {
        type: 'NEW_POST_IS_LOADING',
        loading: bool
    };
};

export const sendNewPostHasErrorredMessage = (message) => {
    return {
        type: 'NEW_POST_HAS_ERRORED',
        message
    };
};

export const sendDeleteRestoreHasErroredMessage = (data) => {
    return {
        type: 'DELETE_RESTORE_HAS_ERRORED',
        data
    };
};