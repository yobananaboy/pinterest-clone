import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Header from './Header';
import { Footer } from './Footer';

import { getPosts, addNewPost, deleteRestorePost, likePost, sendNewPostHasErrorredMessage } from '../actions/posts';
import { checkUserLoggedIn } from '../actions/user';

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    static getData(store) {
       return store.dispatch(getPosts());
    }
    
    componentDidMount() {
        this.props.checkUserLoggedIn();
        this.props.getPosts();
    }
    
    render() {
        return(
            <div>
                <Header {...this.props} />
                    {renderRoutes(this.props.route.routes, {...this.props})}
                <Footer />
            </div>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        posts: state.posts,
        postsHaveErrored: state.postsHaveErrored,
        postsAreLoading: state.postsAreLoading,
        newPostLoading: state.newPostLoading,
        newPostHasErrorred: state.newPostHasErrorred,
        deleteRestoreHasErrored: state.deleteRestoreHasErrored
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkUserLoggedIn: () => dispatch(checkUserLoggedIn()),
        getPosts: () => dispatch(getPosts()),
        addNewPost: (user, post) => dispatch(addNewPost(user, post)),
        deleteRestorePost: (post) => dispatch(deleteRestorePost(post)),
        likePost: (user, post) => dispatch(likePost(user, post)),
        sendNewPostHasErrorredMessage: (message) => dispatch(sendNewPostHasErrorredMessage(message))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);