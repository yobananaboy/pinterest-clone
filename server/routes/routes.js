import user_controller from './controllers/userController';
import posts_controller from './controllers/postsController';

module.exports = function(app, passport) {
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));
    
    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect : '/',
        failureRedirect : '/'
    }));
    
    // for getting user profile data
    app.get('/get-user', user_controller.get_user);
        
    // handle log out
    app.get('/logout', user_controller.logout);
    
    // get all posts from database
    app.get('/get-all-posts', posts_controller.get_all_posts);
    
    // add a new post
    app.post('/add-new-post', posts_controller.add_new_post);
    
    // delete/restore post (by toggling active status)
    app.post('/delete-restore-post', posts_controller.toggle_post);
    
    // like a post
    app.post('/like-post', posts_controller.like_post);
    
    app.get('/*', (req, res) => {
        res.sendfile('public/index.html');
    });
};

