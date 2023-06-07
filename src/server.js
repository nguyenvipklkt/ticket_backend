import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api'
import cors from 'cors';
// import connection from './configs/connectDB';

require('dotenv').config();
var morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'PATCH'
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));
//set up view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})