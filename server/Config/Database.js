const mongoose = require('mongoose');

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(()=>{
        console.log('Connection established with database ');
    }).catch((error)=>{
        console.log('Error connecting : ', error.message);
    })
}

module.exports = dbConnect;