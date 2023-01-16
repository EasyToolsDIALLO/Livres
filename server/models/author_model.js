const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    id:{
        required: true,
        type: String
    },
    name:{
        required: true,
        type: String
    },
    age:{
        required: true,
        type: Number
    }
})

//In the schema you can directly put name:String

module.exports = mongoose.model('authors',authorSchema);
//The name of the collection is authors