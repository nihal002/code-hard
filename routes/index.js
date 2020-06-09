var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/register', function(req, res, next){
    return res.render('register',{title: 'Sign Up'});
});

router.post('/register', function( req, res, next){
    if(req.body.name && 
        req.body.email && 
        req.body.password &&
        req.body.confirmPassword)
    {

        if(req.body.password !== req.body.confirmPassword)
        {
            var err = new Error('password do not match');
            err.status = 400;
            return next(err);
        }

        //created object for input
        var userData = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        };

        // insert into database
        User.create(userData , function(error , user){
            if(error)
            {
                return next(error);
            }
            else
            {
                req.session.userId = user._id;
                return res.redirect('/home');
            }
        });
    }
    else{
        var err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
})





router.get('/', function(req, res, next){
    return res.render('index', {title: 'Home'});
});


//get login
router.get('/login', function(req, res , next){
    return res.render('login', {title: 'Log in'});
});

//post logint
router.post('/login', function(req, res , next){
    if(req.body.email && req.body.password)
    {
        User.authenticate(req.body.email, req.body.password, function(error, user){
            if(error || !user)
            {
                var err = new Error('wrong email or password');
                err.status = 401;
                return next(err);
            }
            else
            {
                req.session.userId = user._id;
                // res.send('nihal home page')
                return res.redirect('/home');
            }
        });
    }
    else
    {
        var err = new Error('Email and password are required');
        err.status = 401; 
        return next(err);
    }
});

//GET / about

router.get('/about', function(req, res, next){
    return res.render('about', {title: 'About'});
});

//GET /contact

router.get('/contact', function(req, res, next){
        return res.render('contact', {title: 'Contact'});
});

router.get('/aith', function(req, res, next){
    if(!req.session.userId)
    {
        var err = new Error("You are not authorized to access, please login");
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
    .exec(function (error , user){

        if(error)
        {
            return next(error)
        }
        else
        {
            // res.send('this is home page')
            // return res.render('home', {title: 'Home', name:user.name,})
         return res.render('aith', {title: 'AITH PORTAL'});  
        }
    });
});

router.get('/home', function(req, res, next){
    if(!req.session.userId)
    {
        var err = new Error("You are not authorized to access, please login");
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
        .exec(function (error , user){

            if(error)
            {
                return next(error)
            }
            else
            {
                // res.send('this is home page')
                return res.render('home', {title: 'Home', name:user.name,})
            }
        });
});

// computer science

router.get('/cs', function(req, res, next){
    if(!req.session.userId)
    {
        var err = new Error("You are not authorized to access, please login");
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
    .exec(function (error , user){

        if(error)
        {
            return next(error)
        }
        else
        {
            // res.send('this is home page')
            // return res.render('home', {title: 'Home', name:user.name,})
         return res.render('cs', {title: 'COMPUTER SCIENCE'});  
        }
    });
});

//biotechnogy

router.get('/bt', function(req, res, next){
    if(!req.session.userId)
    {
        var err = new Error("You are not authorized to access, please login");
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
    .exec(function (error , user){

        if(error)
        {
            return next(error)
        }
        else
        {
            // res.send('this is home page')
            // return res.render('home', {title: 'Home', name:user.name,})
         return res.render('bt', {title: 'BIOTECHMOLOGY'});  
        }
    });
});


//chemical
router.get('/ch', function(req, res, next){
    if(!req.session.userId)
    {
        var err = new Error("You are not authorized to access, please login");
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
    .exec(function (error , user){

        if(error)
        {
            return next(error)
        }
        else
        {
            // res.send('this is home page')
            // return res.render('home', {title: 'Home', name:user.name,})
         return res.render('ch', {title: 'CHEMICAL'});  
        }
    });
});

// el

router.get('/el', function(req, res, next){
    if(!req.session.userId)
    {
        var err = new Error("You are not authorized to access, please login");
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
    .exec(function (error , user){

        if(error)
        {
            return next(error)
        }
        else
        {
            // res.send('this is home page')
            // return res.render('home', {title: 'Home', name:user.name,})
         return res.render('el', {title: 'ELCTRONICS'});  
        }
    });
});

//it

router.get('/it', function(req, res, next){
    if(!req.session.userId)
    {
        var err = new Error("You are not authorized to access, please login");
        err.status = 403;
        return next(err);
    }
    User.findById(req.session.userId)
    .exec(function (error , user){

        if(error)
        {
            return next(error)
        }
        else
        {
            // res.send('this is home page')
            // return res.render('home', {title: 'Home', name:user.name,})
         return res.render('it', {title: 'INFORMATION TECHNOLOGY'});  
        }
    });
});



// GET logout
router.get('/logout', function(req,res,next){
    if(req.session)
    {
        req.session.destroy(function(err){
            if(err)
            {
                return next(err);
            }
            else
            {
                return res.redirect('/')
            }
        });
    }
});

module.exports = router;