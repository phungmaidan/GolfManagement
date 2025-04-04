import { readdirSync } from 'fs'
import { basename as _basename, join } from 'path'
import { Sequelize } from 'sequelize'
import sequelize from '../config/db.config.js'
import { fileURLToPath, URL } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const basename = path.basename(__filename)

const db = {}

// Import all models from subdirectories
const subDirs = ['com', 'fre', 'mrm', 'sys']

for (const dir of subDirs) {
  const dirPath = path.join(__dirname, dir)
  const files = readdirSync(dirPath)

  for (const file of files) {
    if (file.endsWith('.js')) {
      const modelPath = path.join(dirPath, file)
      const modelUrl = new URL(`file:///${modelPath.replace(/\\/g, '/')}`)
      const model = await import(modelUrl)
      const namedModel = model.default(sequelize, Sequelize.DataTypes)
      db[namedModel.name] = namedModel
    }
  }
}

// Set up associations after all models are imported
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db