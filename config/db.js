const url = require('url');

const config = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "pulse-dev",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "define": {
      "freezeTableName": true
    },
    "seederStorage": "sequelize",
    "seederStorageTableName": "SequelizeData"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    // "username": "postgres",
    // "password": "postgres",
    // "database": "pulse-dev",
    // "host": "127.0.0.1",
    "dialect": "postgres",
    "define": {
      "freezeTableName": true
    },
    "seederStorage": "sequelize",
    "seederStorageTableName": "SequelizeData"
  }
}

if(process.env.NODE_ENV === 'production') {
  const {
    auth, pathname, host
  } = url.parse(process.env.DATABASE_URL);

  const username = auth.split(':')[0];
  const password = auth.split(':')[1];

  const database = pathname.split('/')[1];
  const hostname = host.split(':')[0];


  config.production = {
    ...config.production,
    username,
    password,
    database,
    host: hostname,
  }
}

module.exports = config;
