const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
var cors = require('cors');
// const CONNECTION_URL = `mongodb+srv://kushagra:kkkk1234@cluster0.qrese.mongodb.net/bankDB?retryWrites=true&w=majority`;
const {DB_STRING} = require('./config')
const path = require('path')
const userRoutes = require('./routes/tableapi')

app.use(cors())

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
// require('./config/user_database');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


mongoose.connect(DB_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
const con = mongoose.connection
con.on('open', () => {
    console.log('connected with MongoDB...')
})

app.use('/api/users', userRoutes)


// if(process.env.NODE_ENV === 'production'){
    // app.use(express.static(path.join(__dirname,'react-bank-system','build')));

    // app.get('/*', (req, res) => {
    //     res.sendFile(path.join(__dirname, 'react-bank-system', 'build', 'index.html')); // relative path
    // });
// }

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`app listening on port ${port}`))