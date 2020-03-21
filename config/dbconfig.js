const path = require('path');

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "database_development",
    "host": path.resolve('db', 'data', 'data.db'),
    "dialect": "sqlite",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": path.resolve('db', 'data', 'data.db'),
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": path.resolve('db', 'data', 'data.db'), 
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
