const { createDb, migrate } = require("postgres-migrations")
const path = require('path');
const config = require('config');
let dbConfig = config.get('database');

function migration() {
return new Promise((resolve, reject) => {
createDb(dbConfig.database, {
defaultDatabase: "postgres",
user: dbConfig.user,
password: dbConfig.password,
host: dbConfig.host,
port: dbConfig.port,
})
.then(() => {
return migrate(dbConfig, path.join(__dirname + "/migration_scripts"))
})
.then((res) => {
resolve('success')
})
.catch((err) => {
reject(err)
})
})
}

module.exports.migration = migration;