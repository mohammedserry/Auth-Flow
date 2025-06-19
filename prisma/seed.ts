import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

export default async function main() {
  // First delete all existing users to avoid duplicates
  await prisma.user.deleteMany();

  // Then create new users with unique emails
  await prisma.user.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john.doe@gmail.com', // Changed to unique email
        password: 'john12345',
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@gmail.com', // Different email
        password: 'jane12345',
      },
    ],
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
