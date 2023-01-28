import { Request, Response } from 'express';

import createFollowService from '../services/users/follows/createFollow.service';
import listFollowersService from '../services/users/follows/listFollowers.service';
import listFollowingService from '../services/users/follows/listFollowing.service';
import removeFollowService from '../services/users/follows/removeFollow.service';

export async function createFollowController(req: Request, res: Response) {
  const { id } = req.user;
  const { username } = req.params;

  await createFollowService(username, id);
  return res.json({
    message: `You are now following @${username}`,
  });
}

export async function removeFollowController(req: Request, res: Response) {
  const { id } = req.user;
  const { username } = req.params;

  await removeFollowService(username, id);
  return res.json({
    message: `You are no longer following @${username}`,
  });
}

export async function listFollowersController(req: Request, res: Response) {
  const { username } = req.params;
  const { page } = req.query;

  const followers = await listFollowersService(username, Number(page) || 0);
  return res.json(followers);
}

export async function listFollowingController(req: Request, res: Response) {
  const { username } = req.params;
  const { page } = req.query;

  const following = await listFollowingService(username, Number(page) || 0);
  return res.json(following);
}
