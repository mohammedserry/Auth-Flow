import { title } from 'process';
import { PrismaClient } from './generated/prisma';
import { faker, id_ID } from '@faker-js/faker';

const prisma = new PrismaClient();

export default async function main() {
  await prisma.user.createMany({
    data: Array.from({ length: 25 }, () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isEmailVerified: faker.datatype.boolean(),
      provider: faker.helpers.arrayElement([
        'EMAIL_PASSWORD',
        'GOOGLE',
        'GITHUB',
      ]),
    })),
  });

  await prisma.todo.createMany({
    data: Array.from({ length: 25 }, () => ({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      completed: faker.datatype.boolean(),
      priority: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
      userId: faker.helpers.arrayElement([
        '011ccd78-e10e-4bf1-8b39-e92b3fa69b43',
        '03f2f326-f75e-40cb-b651-e6d64fc77953',
      ]),
    })),
  });

  console.log('Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
