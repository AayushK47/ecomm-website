const { Sequelize } = require('sequelize');

const conn = new Sequelize(
    'ecomm',
    'postgres',
    'Aayush@1998',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    }
)

module.exports = conn;