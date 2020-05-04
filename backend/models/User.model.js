const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userID: {type: Number, required: true, maxlength:9},
    name: {type: String, required: false, trim: true},
    surname: {type: String, required: false,trim: true},
    faculty: {type: String, required: false},
    semester: {type: Number, required:false},
    password: {type: String, required: true},
    email: {type: String, required: false, unique: true},
    isAdmin: {type: Boolean, default:false},
    isDeleted: {type: Boolean,default:false}
    },
    {
   timestamps:true
});

UserSchema.methods.generateHash = function(password) {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8),null);
};

UserSchema.methods.validPassword = function(password) {
    return bcryptjs.compareSync(password,this.password);
};

const User = mongoose.model('User',UserSchema);

module.exports = User;
