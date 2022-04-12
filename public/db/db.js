const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './endemon.sqlite'
  })
 
module.exports = sequelize;