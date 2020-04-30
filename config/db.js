module.exports = {
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
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}