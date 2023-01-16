const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    id:{
        required: true,
        type: String
    },
    name:{
        required: true,
        type: String
    },
    genre:{
        required: true,
        type: String
    },
    authorId:{
        required: true,
        type: String
    },
})

module.exports = mongoose.model('books',bookSchema);
//The name of the collection is books