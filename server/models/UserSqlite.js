let db = require('./dbSqlite')

async function findByUsername(username) { 
  console.log('Looking up username ', username)
  return new Promise((resolve, reject) => {
    db.get('select id as _id, username, password, isAgent from user', (err, row) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(row)
      }
    })
  })
}

async function findById(id) { 
  return new Promise((resolve, reject) => {
    db.get('select id as _id, username, password, isAgent from user where id='+id, (err, row) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(row)
      }
    })
  })
}

module.exports = {
  findByUsername,
  findById
}