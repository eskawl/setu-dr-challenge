require('dotenv').config();
const { startServer } = require('./server');
const logger = require('./lib/logger');


startServer({ logger });
