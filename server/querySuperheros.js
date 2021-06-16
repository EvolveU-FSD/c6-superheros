const sqlite3 = require('sqlite3')

console.log('Connecting to my database')
let db = new sqlite3.Database('superheros.sqlite')

db.all('select * from superhero', (err, rows) => {
    if (err) {
        console.error(err)
    }
    else {
        console.log(rows)
    }
})


