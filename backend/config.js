require('dotenv').config({ path: process.env.NODE_ENV ? `./envs/.env.${process.env.NODE_ENV}` : `./envs/.env.local`})

module.exports = {
    DB_STRING: process.env.DB_STRING,
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL
}