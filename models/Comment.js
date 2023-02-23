var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/User');
var Post = require('../models/Post');


var commentSchema = new Schema({
    post:{
        type: String,
        ref: 'Post',
        required: true
    },
    nombreUsuario:{
        type: String,
        ref: 'User',
        required: true,
        unique: true
    },
    texto:{
        type: String
    },
    descripcion:{
        type:String
    },
    fechaDeCreacion:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);