import React, { Component } from 'react';
import emoji from 'react-easy-emoji';

class Post extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick = (e) => {
        e.preventDefault();
        // if delete or restore clicked, delete or restore the post
        if(e.target.id === 'delete' || e.target.id === 'restore') {
            this.props.deleteRestorePost(this.props.post);    
        } else {
            // else user must be liking a post
            this.props.likePost(this.props.user, this.props.post);
        }
    }
    
    render() {
        
        // add delete/restore button for user to delete or restore their posts
        let deleteRestoreButton;
        // if user logged in and user is post owner, let user delete or restore a post
        if(this.props.user._id === this.props.post.idOfPoster) {
            // if post is active, let user delete
            if(this.props.post.active) {
                deleteRestoreButton = <a onClick={this.handleClick} class="delete-button" id="delete">Delete post</a>;
            } else {
                deleteRestoreButton = <a onClick={this.handleClick} class="restore-button" id="restore">Restore post</a>; // else, display restore button
            }
        }
        // delete restore error message if user has tried to delete a post and failed
        let deleteRestoreMessage;
        // check if there is an error message
        if(this.props.deleteRestoreHasErrored) {
            // then make sure error message matches this post before displaying
            if(this.props.deleteRestoreHasErrored.post._id === this.props.post._id) {
                deleteRestoreMessage = <p className="error-message">{this.props.deleteRestoreHasErrored.message}</p>;
            }
        }
        let likeEmoji = "👍";
        let likeDetails =    <span class="like-details">
                                {likeEmoji}   {this.props.post.likes.length}
                             </span>;
        // if user logged in, let them like and unlike posts
        if(this.props.post.likes.indexOf(this.props.user._id) !== -1) {
            likeEmoji = "✌️";
        }
        if(this.props.user) {
            likeDetails = 
                        
                            <a onClick={this.handleClick} className="like-details" id="like">
                                {emoji(`${likeEmoji}   ${this.props.post.likes.length}`)}
                            </a>;
        }
                        
       return (
            <div className="post">
                <img src={this.props.post.img} alt={this.props.post.caption} />
                <p className="post-title">{this.props.post.caption}</p>
                <div className="twitter-img-container">
                    <img src={this.props.post.posterImg} className="twitter-img" title={`@${this.props.post.usernameOfPoster}`} />
                </div>
                <div className="like">
                    {likeDetails}
                </div>
                <div className="delete-restore-container">
                    {deleteRestoreButton}
                    {deleteRestoreMessage}
                </div>
            </div>
       );
        
    }
    
}

export default Post;
/*
export const Post = (props) => {
    
    // add delete/restore button for user to delete or restore their posts
    let deleteRestoreButton;
    // if user logged in and user is post owner, let user delete or restore a post
    if(props.user._id === props.post.idOfPoster) {
        // if post is active, let user delete
        if(props.post.active) {
            deleteRestoreButton = <a href="/delete-restore-post" class="delete-button">Delete post</a>;
        } else {
            deleteRestoreButton = <a href="/delete-restore-post" class="restore-button">Restore post</a>; // else, display restore button
        }
    }
    // delete restore error message if user has tried to delete a post and failed
    let deleteRestoreMessage;
    // check if there is an error message
    if(props.deleteRestoreHasErrored) {
        // then make sure error message matches this post before displaying
        if(props.deleteRestoreHasErrored.post._id === props.post._id) {
            deleteRestoreMessage = <p className="error-message">{props.deleteRestoreHasErrored.message}</p>;
        }
    }
   return (
        <div className="post">
            <img src={props.post.img} alt={props.post.caption} />
            <p className="post-title"><img src={props.post.posterImg} />{props.post.caption}</p>
            <p><span className="post-title">Posted by:</span> {props.post.usernameOfPoster}</p>
            {deleteRestoreButton}
            {deleteRestoreMessage}
        </div>
       );
    
    
};
*/
