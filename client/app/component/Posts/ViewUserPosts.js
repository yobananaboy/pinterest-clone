import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import Post from './Post';
import { Redirect } from 'react-router-dom';

var masonryOptions = {
    transitionDuration: 700
};

class ViewUserPosts extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if(!this.props.user) {
            return <Redirect to='/' />;
        }
        
        let intro = (
            <div className="intro">
                <h1>All posts</h1>
                <p>Here are the posts you have added to the network.</p>
                <p>You can delete or restore any of the posts that you have added.</p>
            </div>
            );
        
        // get display to know whether you are showing all posts or user's posts
        let display = this.props.postsToDisplay;
        
        // create post list to add posts to
        let postList = [];
        
        // loop through posts and add posts to post list depending on display
        this.props.posts.forEach((post, index) => {
            // display all user posts
            if(this.props.user._id === post.idOfPoster) {
                postList.push(<Post {...this.props} post={post} key={index} />);
            }
        });
        // posts will show as loading by default
        let posts = <div className="loader">Loading...</div>;
        // if posts have errored, display error message
        if(this.props.postsHaveErrored) {
            posts = <div className="error-message" id="view-posts-error-message">{this.props.postsHaveErrored}</div>;
        }
        // if posts are not loading and there's not error message, must have loaded okay, so display them
        if(!this.props.postsHaveErrored && !this.props.postsAreLoading) {
            posts = <Masonry
                        className={'post-gallery'}
                        options={masonryOptions}
                    >
                        {postList}
                    </Masonry>;            
        }
        // if there are no posts, let user know
        // check length of posts first. If it is 0 then must be no posts
        if(this.props.posts.length === 0) {
            posts = <p>There are no posts to display!</p>;
        } else if(display === 'all') {
            // else if display all, check if at least one post is active, else show no posts message
            if(!this.props.posts.some(post => {
                return post.active;
            })) {
                posts = <p>There are no posts to display!</p>;    
            }
        }
        return(
            <div>
                {intro}
                {posts}
            </div>
            );
    }
}

export default ViewUserPosts;