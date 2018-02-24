import React, { Component } from 'react';
import validator from 'validator';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';

const placeholderLink = '/public/images/placeholder.png';

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            caption: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.testImage = this.testImage.bind(this);
    }
    
    componentDidMount() {
        this.props.sendNewPostHasErrorredMessage(null);
    }

    handleChange(e) {
        e.preventDefault();
        // either update url or caption depending on input
        if(e.target.id === 'url-input') {
            this.setState({
                url: e.target.value
            });
        } else {
            this.setState({
                caption: e.target.value
            });
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        // if url is not valid send error message
        if(!validator.isURL(this.state.url, { protocols: ['http', 'https'] })) {
            return this.props.sendNewPostHasErrorredMessage('Please enter a valid url.');
        }
        // give pithy untitled caption if no caption has been added
        if(this.state.caption.length === 0) {
            this.setState({
                caption: 'Untitled'
            });
        } else {
            this.setState({
                caption: validator.trim(this.state.caption)
            });
        }
        // test image url
        this.testImage(this.state.url, (testURL, result) => {
            if (result == "success") {
                this.props.sendNewPostHasErrorredMessage(null);
                // you can submit the form now
                // add new post, sending user and info about post
                this.props.addNewPost(this.props.user, {
                    url: this.state.url,
                    caption: this.state.caption
                });
                // reset the url and caption, so user can add more
                this.setState({
                    url: '',
                    caption: ''
                });
            } else {
                this.props.addNewPost(this.props.user, {
                    url: placeholderLink,
                    caption: this.state.caption
                });
                // reset the url and caption, so user can add more
                this.setState({
                    url: '',
                    caption: ''
                });
            }
        });
        return(false);
    }
    
    testImage(url, callback, timeout) {
        timeout = timeout || 5000;
        var timedOut = false, timer;
        var img = new Image();
        // on error, use placeholder link for image
        img.onerror = img.onabort = function() {
            if (!timedOut) {
                clearTimeout(timer);
                callback(url, "error");
            }
        };
        // image loaded okay, so use url user provided to load image
        img.onload = function() {
            if (!timedOut) {
                clearTimeout(timer);
                callback(url, "success");
            }
        };
        img.src = url;
        // timed out, use placeholder link for image
        timer = setTimeout(function() {
            timedOut = true;
            callback(url, "timeout");
        }, timeout); 
    }
    
    render() {
        // show error message for user if it is props
        let errorMessage;
        if(this.props.newPostHasErrorred.length > 1) {
            errorMessage = <p className="error-message">{this.props.newPostHasErrorred}</p>;
        }
        // if there is no user, redirect to home
        if(!this.props.user) {
            <Redirect to='/' />;
        }
        let buttonClass = classNames('add-post-button', {show: !this.state.newPostLoading});
        return(
                <div className="add-post-form-wrapper">
                    <form onSubmit={this.handleSubmit} className="add-post-form">
                        <p>Please provide an image url and (optional) caption to post your image.</p>
                    	<div class="form-group">
                		    <label>Image URL *</label> <input className="add-post-input" name="url" type="text" value={this.state.url} id="url-input" onChange={this.handleChange} placeholder="Please provide a url" />
                        </div>
                        <div class="form-group">
                		    <label>Caption</label> <input className="add-post-input" name="caption" type="text" value={this.state.caption} maxlength="30" id="caption-input" onChange={this.handleChange} placeholder="Please provide a caption" />
                        </div>
                        {errorMessage}
                        <button className={buttonClass} type="submit">Add post</button>
                    </form>
                </div>
            
            );
    }
}

export default AddPost;