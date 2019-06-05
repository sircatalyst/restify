const mongoose = require('mongoose');

const UzerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

const Uzer = mongoose.model('Uzer', UzerSchema);
module.exports = Uzer;