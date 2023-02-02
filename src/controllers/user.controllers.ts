import { Request, Response } from 'express';

import createUserService from '../services/users/createUser.service';
import listFollowersService from '../services/users/follows/listFollowers.service';
import listUsersService from '../services/users/listUsers.service';
import retrieveUserService from '../services/users/retrieveUser.service';

export { USER_REQUIRED_FIELDS } from '../services/users/createUser.service';
export async function createUserController(req: Request, res: Response) {
  const user = await createUserService(req.body);

  return setTimeout(() => {
    res.status(201).json(user);
  }, 200);
}

export async function listUsersController(req: Request, res: Response) {
  const { id } = req.user;
  const { page } = req.query;
  const { username } = req.params;
  const user = await listUsersService(username, id, Number(page) || 0);

  return res.json(user);
}

export async function retrieveSelfController(req: Request, res: Response) {
  const { id } = req.user;
  const user = await retrieveUserService(id);

  return res.json(user);
}

export async function retrieveUserController(req: Request, res: Response) {
  const { term } = req.params;
  const user = await retrieveUserService(term, req.user.id);
  return res.json(user);
}

export async function retrieveSelfFollowersController(
  req: Request,
  res: Response
) {
  const { page } = req.query;
  const { username } = req.user;
  const user = await listFollowersService(username, Number(page) || 0);

  return res.json(user);
}
