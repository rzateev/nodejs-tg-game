require('dotenv').config()
const {Sequelize} = require('sequelize');

// console.log(process.env.DB_NAME)
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)
// console.log(process.env.DB_HOST)
// console.log(process.env.DB_PORT)


module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT
    }
)