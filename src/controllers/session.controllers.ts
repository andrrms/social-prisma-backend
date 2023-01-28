import { Request, Response } from 'express';

import createSessionService from '../services/sessions/createSession.service';
import refreshSessionService from '../services/sessions/refreshSession.service';

export { LOGIN_REQUIRED_FIELDS } from '../services/sessions/createSession.service';
export async function createSessionController(req: Request, res: Response) {
  const { accessToken, refreshToken } = await createSessionService(req.body);

  return res
    .cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // TODO: change to true on prod
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    })
    .json({ token: accessToken });
}

export async function refreshSessionController(req: Request, res: Response) {
  const { jwt } = req.cookies;
  const token = await refreshSessionService(jwt);
  return res.json({ token });
}

export async function logoutSessionController(_: Request, res: Response) {
  return res
    .clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // TODO: change to true on prod
      maxAge: 0,
    })
    .status(204)
    .send();
}
