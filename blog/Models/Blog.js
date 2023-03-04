const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    Title:{
        type: 'String',
        required: true,
    },
    Author:{
        type: 'String',
        required: true,
    },
    UserImage:{
        type: 'String',
        required: true,
    },
    Date:{
        type: 'String',
        required: true,
    },
    Category:{
        type: 'String',
        required: true,
    },
    Mainimg:{
        type: 'String',
        required: true,
    },
    Blogdata:{
        type: 'String',
        required: true,
    },
    Comments:{
        type: 'Array',
        required: true,
    }
})

module.exports = mongoose.model("Blog", blogSchema);