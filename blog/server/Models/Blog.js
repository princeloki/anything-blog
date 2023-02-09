const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
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
        type: 'BSON',
        required: true,
    }
})