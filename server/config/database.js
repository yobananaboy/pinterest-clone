const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.USERNAME;
const mongopw = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.DB_PORT;

const uri = `mongodb://${user}:${mongopw}@${host}:${port}/pinterest-clone`;
mongoose.connect(uri, {
	useMongoClient: true
});

const Schema = mongoose.Schema;
// create users schema
const UserSchema = new Schema({
    _id: String,
    username: String,
    img: String,
    token: String
}, {
    collection: 'users'
});

const PostsSchema = new Schema({
    _id: String,
    img: String,
    caption: String,
    idOfPoster: String,
    usernameOfPoster: String,
    posterImg: String,
    likes: [],
    active: Boolean
}, {
    collection: 'posts'
});


// export Users
const User = mongoose.model('User', UserSchema);

// export Posts
const Posts = mongoose.model('Posts', PostsSchema);

// export
module.exports = {
	User,
	Posts
};