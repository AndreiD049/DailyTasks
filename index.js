const db = require('./db/models');
db.sequelize.sync({force: true})
console.log(db);

