const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    body:{
        type: 'String',
        required: true,
    },
    reply:{
        type: 'Object',
        required: false,
    }
})

module.exports = mongoose.model('Comment', commentSchema);