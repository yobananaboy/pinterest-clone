import { Posts } from '../../config/database';
import mongoose from 'mongoose';

// find all posts
exports.get_all_posts = function(req, res) {
    // find all posts on database
    Posts.find({}, function(err, posts) {
        // handle error
        if(err) {
            return res.json(
                {err: true}
                );
        }
        // send all posts if not error
        res.json({
            success: true,
            posts    
        });
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
    newPost.save(function(err) {
        // handle err
        if(err) {
            return res.json({
                err: true
            });
        }
        // get all posts and send to user
        Posts.find({}, function(err, posts) {
            if(err) {
                return res.json({
                    err: true
                });
            }
            return res.json({
                success: true,
                posts
            });
        });
    });
};

exports.toggle_post = function(req, res) {
    let post = req.body.post;
    Posts.findOne({ '_id': post._id }, function(err, postOnDb) {
        if(err) {
            return res.json({
                err: true
            });
        }
        postOnDb.active = !postOnDb.active;
        postOnDb.save(function(err) {
            if(err) {
                return res.json({
                    err: 'post',
                    post
                });
            }
            Posts.find({}, function(err, posts) {
                if(err) {
                    return res.json({
                        err: 'loading'
                    });
                }
                res.json({
                    success: true,
                    posts
                });
            });
        });
    });
};

exports.like_post = function(req, res) {
    // get info about user posting
    let user = req.body.user;
    // get info about post user has made
    let post = req.body.post;
    
    Posts.findOne({ _id: post._id }, (err, postOnDb) => {
        if(err) {
            return res.json({
                error: true
            });
        }
        // check is user has liked post already by seeing if they are in array of likers.
        // If they are, remove them. If not, add them.
        let index = postOnDb.likes.indexOf(user._id);
        if(index !== -1) {
            postOnDb.likes.splice(index, 1);
        } else {
            postOnDb.likes.push(user._id);
        }
        postOnDb.save(err => {
            if(err) {
                return res.json({
                    error: true
                });
            }
            Posts.find({}, (err, posts) => {
                if(err) {
                    return res.json({
                        error: true
                    });
                }
                res.json({
                    success: true,
                    posts
                });
            });
        });
    });
};