import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

import app from './app';

export const prisma = new PrismaClient();

async function main() {
  const server = app.listen(process.env.APP_PORT, () => {
    console.log(
      `Server is running on http://localhost:${process.env.APP_PORT}`
    );
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
