const mongoose = require('mongoose')

mongoose
.connect(process.env.BASE_URL)
.then(function(){
    console.log("Connected to MongoDB");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;
