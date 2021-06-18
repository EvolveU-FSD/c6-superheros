const sqlite3 = require('sqlite3')

let connectionString = process.env.SQLITE_CONNECTION_STRING || 'superheros.sqlite'
let db = new sqlite3.Database(connectionString)

module.exports = db