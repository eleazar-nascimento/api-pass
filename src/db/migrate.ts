import postgres from 'postgres'

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

const connection = postgres('postgresql://docker:docker@localhost:5432/api_pass', { max: 1 })
const db = drizzle(connection)

if(db) {
  console.log('conectou')
}

await migrate(db, { migrationsFolder: './drizzle' })

await connection.end()

process.exit()