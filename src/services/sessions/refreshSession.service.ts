import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { prisma } from '../../server';
import { AppError } from '../../errors/AppError';
import { TokenPayload } from '../../interfaces/session.interfaces';

export default async function refreshSessionService(
  token: string
): Promise<string> {
  try {
    const { username } = jwt.verify(
      token,
      process.env.REFRESH_SECRET_KEY as string
    ) as TokenPayload;

    const foundUser = await prisma.user.findUniqueOrThrow({
      where: { username },
    });

    const newToken = jwt.sign(
      {
        username,
        permission: foundUser.permission,
      },
      process.env.SECRET_KEY as string,
      {
        subject: foundUser.id,
        expiresIn: '2m',
      }
    );

    return newToken;
  } catch (e) {
    console.error(e);
    throw new AppError('Expired session', 406);
  }
}
