import { faker } from '@faker-js/faker'
import { checkins, gyms, users } from "./schema";
import { db } from './connection';
import chalk from 'chalk';

/**
 * Reset database
 */


await db.delete(users)
await db.delete(gyms)
await db.delete(checkins)

console.log(chalk.yellow('✔ Database reset'))

/*
* Create users
*/

const [user] = await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
]).returning({
  id: users.id,
})

console.log(chalk.yellow('✔ Created user'))

const [gym] = await db.insert(gyms).values([
  {
    title: faker.company.name(),
    description: faker.company.catchPhraseAdjective(),
    longitude: faker.location.longitude().toString(),
    phone: faker.phone.number(),
    latitude: faker.location.latitude().toString(),
  }
]).returning({
  id: gyms.id
})

console.log(chalk.yellow('✔ Created gym'))

await db.insert(checkins).values([
  {
    gymId: gym.id,
    userId: user.id,
  }
])

console.log(chalk.yellow('✔ Created checkin'))

console.log(chalk.greenBright('Database seeded successfully!'))

process.exit()

