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
        required: false,
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
        required: false,
    }
})

module.exports = mongoose.model("Blog", blogSchema);