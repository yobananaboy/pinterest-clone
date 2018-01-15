import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import { Footer } from './Footer';

import { getPosts, addNewPost, deleteRestorePost, likePost, sendNewPostHasErrorredMessage } from '../actions/posts';
import { checkUserLoggedIn } from '../actions/user';

import AddPost from './Posts/AddPost';
import ViewPosts from './Posts/ViewPosts';
import { Error404 } from './Posts/Error404';

class App extends Component {
    constructor(props) {
        super(props);
    }    
    
    componentDidMount() {
        this.props.checkUserLoggedIn();
        this.props.getPosts();
    }
    
    render() {
        return(
            <div>
                <Header {...this.props} />
                    <Switch>
                        <Route exact path='/' render = {(props) => (<ViewPosts {...this.props} postsToDisplay='all' />)} />
                        <Route exact path='/user/posts' render = {(props) => (<ViewPosts {...this.props} postsToDisplay='user' />)} />
                        <Route exact path='/add' render = {(props) => (<AddPost {...this.props} />)} />
                        <Route path='*' component={Error404} />
                    </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(App);