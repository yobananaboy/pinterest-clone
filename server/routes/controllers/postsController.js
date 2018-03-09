import { Posts } from '../../config/database';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

import { postsUpdated, sendPostsHaveErroredMessage } from '../../../client/app/actions/posts';
import { userUpdated } from '../../../client/app/actions/user';

import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';

import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';

import configureStore from '../../../client/app/store/configureStore';

import { Provider } from 'react-redux';
import routes from '../../../client/app/routes/routes';

const store = configureStore();

const savePost = (req, res, post) => {
    post.save({})
        .then(result => {
            getAllPostsAndSendData(req, res);
        })
        .catch(err => {
            console.log(err);
            res.json({err: true});
        });
};

const getAllPostsAndSendData = (req, res) => {
    Posts.find({})
        .then(posts => {
            res.json({
                success: true,
                posts
            });
        })
        .catch(err => {
            console.log(err);
            res.json({err: true});
        });
};

// find all posts
exports.get_all_posts = function(req, res) {
    console.log('getting posts');
    // find all posts on database
    Posts.find({})
        .then(posts => {
            // send all posts
            res.json({
                success: true,
                posts    
            });
        })
        .catch(err => {
            console.log(err);
            res.json({err: true});
        });
};

// add a new post
exports.add_new_post = function(req, res) {
    // get info about user posting
    let user = req.body.user;
    // get info about post user has made
    let post = req.body.post;
    // create new id for post
    let newId = new mongoose.mongo.ObjectId();
    
    // create new post for database
    let newPost = new Posts();
    newPost._id = newId;
    newPost.img = post.url,
    newPost.caption = post.caption,
    newPost.idOfPoster = user._id;
    newPost.usernameOfPoster = user.username;
    newPost.posterImg = user.img;
    newPost.active = true;
    
    // save new post to databse
    savePost(req, res, newPost);
};

exports.toggle_post = function(req, res) {
    let post = req.body.post;
    Posts.findOne({ '_id': post._id })
        .then(postOnDb => {
            postOnDb.active = !postOnDb.active;
            savePost(req, res, postOnDb);
        })
        .catch(err => {
            console.log(err);
            res.json({err: true});
        });
};

exports.like_post = function(req, res) {
    // get info about user posting
    let user = req.body.user;
    // get info about post user has made
    let post = req.body.post;
    
    Posts.findOne({ _id: post._id })
        .then(postOnDb => {
            // check is user has liked post already by seeing if they are in array of likers.
            // If they are, remove them. If not, add them.
            let index = postOnDb.likes.indexOf(user._id); 
            index !== -1 ? postOnDb.likes.splice(index, 1) : postOnDb.likes.push(user._id);
            savePost(req, res, postOnDb);
        })
        .catch(err => {
            console.log(err);
            res.json({err: true});
        });
};

exports.render_server_data = function(req, res) {
    	const renderData = () => {
    	    let data = store.getState();
            let context = {};
            const content = renderToString(
              <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                  {renderRoutes(routes)}
                </StaticRouter>
              </Provider>
            );
            if(context.status === 404) {
              res.status(404);
            }
            res.render('index', {title: 'Express', data: JSON.stringify(data), content });
    	};
    	
    	typeof req.user != "undefined" ? store.dispatch((userUpdated(req.user))) : store.dispatch((userUpdated(false)));
        Posts.find({})
            .then(posts => {
                store.dispatch(postsUpdated(posts));
                renderData();
            })
            .catch(err => {
               console.log(err);
               store.dispatch(sendPostsHaveErroredMessage('Could not load posts'));
               renderData();
            });
};