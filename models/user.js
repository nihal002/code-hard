var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
    
});

//authenticate login
UserSchema.statics.authenticate = function(email, password , callabck){
    User.findOne( { email: email } )
        .exec(function(error, user) {
            if(error)
            {
                return callabck(error);
            }
            else if (! user)
            {
                var err = new Error('User not found');
                err.status = 401;
                return callabck(err);
            }
            bcrypt.compare(password, user.password , function(error , result) {
                    if(result==true)
                    {
                        return callabck(null , user);
                    }
                    else
                    {
                        return callabck();
                    }
            })
        });
}


// hashing of password
UserSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, 10 , function(err , hash){

        if(err)
        {
            return next(err);
        }
        user.password = hash;
        next();
    })
});
var User = mongoose.model('User', UserSchema);
module.exports = User;