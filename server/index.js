const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config/app');
const router = require('./router');
const { ApplicationError } = require('../lib/controllers');

const app = express();
app.use(bodyParser.json());
app.use(router);



const {
    defaults: { port: defaultPort }
} = config;

const { PORT=defaultPort } = process.env;

 
const startServer = ({ logger }={}) => {
    // TODO: validate dependencies
    app.use((error, req, res, next) => {
        logger.error(error.message);
        logger.error(error.stack);

        const data = { 
            success: false,
            error
        };

        if(error instanceof ApplicationError){
            return res.status(400).json(data);
        }

        res.status(500).json(data);
    })
    
    app.listen(PORT, (error) => {
        if(error){
            logger.error(error.message);
            logger.error(error.stack);
        } else {
            logger.info(`Server started on ${PORT}`);
        }
    });
}



exports.startServer = startServer;
