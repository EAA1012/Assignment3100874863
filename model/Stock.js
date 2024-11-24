// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let stockModel = mongoose.Schema({
    description:String,
    item:String,
    price:String,
},
{
    collection:"Stock"
}
)
module.exports = mongoose.model('Stock', stockModel);
