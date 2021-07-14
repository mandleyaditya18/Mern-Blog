const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    blog: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    author: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Blog', BlogSchema);