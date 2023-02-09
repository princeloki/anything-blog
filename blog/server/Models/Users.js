const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    type: {
        type: 'String',
        required: true,
    },
    email: {
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
        type: 'BSON',
        required: false,
    }
})

module.exports = mongoose.model('User', userSchema);