const models = require('../models')
const { argv } = require('yargs')
const mode = argv.reset || false

createTables = async () => {
  for (table in models) {
    await models[table].sync({force: mode})
  }
  console.log(mode ? 'Database reset' : 'Database tables setup')
}

createTables()