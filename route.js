// vendor library
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

// custom library
// model
var Model = require('./model');

var USERNAME = null;

// index
var index = function(req, res, next) {
   console.log(req.isAuthenticated());
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {

      var user = req.user;

      if(user !== undefined) {
         user = user.toJSON();
      }
      res.sendfile('./public/index.html');
   }
};

// sign in
// GET
var signIn = function(req, res, next) {
   if(req.isAuthenticated()){
      res.redirect('/');
   }
   /*var user = req.body;
   USERNAME = user.username;
   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!      "+req.body);*/
   res.sendfile('./public/signin.html');
};

// sign in
// POST
var signInPost = function(req, res, next) {
   var user = req.body;
   USERNAME = user.username;
   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!     "+USERNAME);
   passport.authenticate('local', { successRedirect: '/',
                          failureRedirect: '/signin'}, function(err, user, info) {
      if(err) {
         return res.redirect('/signin');
      } 

      if(!user) {
         return res.redirect('/signin');
      }
      return req.logIn(user, function(err) {
         if(err) {
            return res.redirect('/signin');
         } else {
            return res.redirect('/');
         }
      });
   })(req, res, next);
};

// sign up
// GET
var signUp = function(req, res, next) {
   if(req.isAuthenticated()) {
      res.redirect('/');
   } else {
      res.sendfile('./public/signup.html');
   }
};

// sign up
// POST
var signUpPost = function(req, res, next) {
   var user = req.body;
   var usernamePromise = null;
   console.log(user.username);
   usernamePromise = new Model.User({username: user.username}).fetch();
   return usernamePromise.then(function(model) {
      if(model) {
         console.log(model);
         res.redirect('/signup');
      } else {
         //****************************************************//
         // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
         //****************************************************//
         var password = user.password;
         var hash = bcrypt.hashSync(password);

         var signUpUser = new Model.User({username: user.username, password: hash});

         signUpUser.save().then(function(model) {
            // sign in the newly registered user
            signInPost(req, res, next);
         });   
      }
   });
};

// sign out
var signOut = function(req, res, next) {
   if(!req.isAuthenticated()) {
      notFound404(req, res, next);
   } else {
      req.logout();
      res.redirect('/signin');
   }
};

var getUserData = function(req, res) {
   res.send(req.user);
};

var updateUserData = function(req, res) {
   var data = JSON.stringify(req.body);
   console.log(req.body);
   var presentation = new Model.User({username: USERNAME});
   presentation.fetch().then(function(model) { 
      model.save({data: data}, {patch: true}).then(function() {
         res.end();
      });
   });
}

// 404 not found
var notFound404 = function(req, res, next) {
   res.status(404);
   res.sendfile('./public/404.html');
};

// export functions
/**************************************/
// index
module.exports.index = index;

module.exports.getUserData = getUserData;

module.exports.updateUserData = updateUserData;

// sigin in
// GET
module.exports.signIn = signIn;
// POST
module.exports.signInPost = signInPost;

// sign up
// GET
module.exports.signUp = signUp;
// POST
module.exports.signUpPost = signUpPost;

// sign out
module.exports.signOut = signOut;

// 404 not found
module.exports.notFound404 = notFound404;