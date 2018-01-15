import axios from 'axios';

const getUserUrl = '/get-user';

export const checkUserLoggedIn = () => {
    return(dispatch) => {
        axios.get(getUserUrl)
            .then(res => {
                if(res.data.user) {
                    dispatch(userUpdated(res.data.user));
                } else {
                    dispatch(userUpdated(false));
                }
            })
            .then(err => {
                if(err) {
                    dispatch(userUpdated(false));
                }
            });
    };
};

export const userUpdated = (user) => {
    return {
        type: 'USER_UPDATED',
        user
    };
};