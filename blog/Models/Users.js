const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    type: {
        type: 'String',
        required: true,
    },
    name:{
        type: 'String',
        required: true,
    },
    email: {
        type: 'String',
        required: true,
    },
    username:{
        type: 'String',
        required: true,
    },
    password: {
        type: 'String',
        required: true,
    },
    blogs:{
        type: 'Array',
        required: true,
    },
    subscribed:{
        type: 'Boolean',
        required: true,
    },
    image:{
        type: 'String',
        required: true,
    }
})

module.exports = mongoose.model('User', userSchema);