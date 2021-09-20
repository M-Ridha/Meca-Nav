const express = require('express');
const app = express();
const dbConnect = require('./helpers/dbConnect')
const cors = require('cors')
const config = require('config') 
const PORT = config.get('SERVER_CONFIG.PORT')|| 8080


    //Middlewares
app.use(cors())    
app.use(express.json({limit:'50mb'}))
app.use('/api/user',require ('./routes/UserRoutes'))
app.use('/api/post',require ('./routes/PostRoutes'))
app.use('/api/solution',require('./routes/SolutionRoutes'))


dbConnect()


app.listen(PORT , (err) => {
    err? console.log(err) : console.log(`Application is running on http://localhost: ${PORT}`) 
})




