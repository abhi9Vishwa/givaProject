var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    // email: {
    //     type: String,
    //     unique: true,
    //     index: true,
    //     require: true,
    // },
    title: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        // require: true,
    },
    createdAt: { type: Date, default: Date.now() },
    // updatedAt: { type: Date, default: Date.now(), set: v => v.Date.now() }
});

module.exports = mongoose.model('posts', PostSchema);