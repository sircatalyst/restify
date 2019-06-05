const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('Uzer');

exports.authenticate = (email, password) => {
    return new Promise( async (resolve, reject) => {
        try {
            // get user by email
            const user = await User.findOne({email});

            // match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    resolve(user);
                } else {
                    // pass did not match
                    reject('Authentication failed')
                }
            })

        } catch (error) {
            // email not found
            reject('Authentication failed')
        }
    })
}