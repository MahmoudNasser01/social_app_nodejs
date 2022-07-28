const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const swagger = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express()

// add .env file
dotenv.config();


// connect to db
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, ()=>{
    console.log('connectd to mongo')
})


// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('common'))

// settings

const options = {
    definition:{
        openapi: '3.0.0',
        info:{
            title:'Node js project',
            version:'1.0.0'
        },
        servers:[
            {
                url:'http://localhost:8000'
            }
        ]
    },
    apis: ['./routes/users.js', './routes/auth.js']
}

const swaggerSpec = swagger(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use("/api/posts", postRoute);
app.use("/api/comments", postRoute);




app.listen(5000, ()=>{
    console.log('running server!')
})