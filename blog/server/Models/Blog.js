const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title:{
        type: 'String',
        required: true,
    },
    author:{
        type: 'String',
        required: true,
    },
    date:{
        type: 'String',
        required: true,
    },
    category:{
        type: 'String',
        required: true,
    },
    image:{
        type: 'String',
        required: true,
    }
})