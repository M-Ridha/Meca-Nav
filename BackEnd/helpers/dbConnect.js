const mongoose = require ('mongoose');
const config = require ('config');



const dbConnect = () => {
    
    mongoose.connect (config.get("DB_CONNECTION.URI"), {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false, 
        useCreateIndex: true
        }
    )
    .then(res=> console.log('DataBase connected...!'))
    .catch((err) => console.log(err) ) 
}


module.exports = dbConnect
