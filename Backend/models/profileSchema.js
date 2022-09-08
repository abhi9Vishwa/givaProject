var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    email: {
        type: String,
        unique: true,
        index: true,
        require: true,
    },
    password: {
        type: String,
        // require: true,
    },
    token: {
        type: String,
        // require: true,
    }
});

module.exports = mongoose.model('profiles', ProfileSchema);