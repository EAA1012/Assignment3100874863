// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let birthdayModel = mongoose.Schema({
    DOB:String,
    firstName:String,
    lastName:String,
},
{
    collection:"Birthday"
}
)
module.exports = mongoose.model('Birthday', birthdayModel);
