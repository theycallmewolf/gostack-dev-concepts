import { Request, Response } from 'express';

export function helloWolf(request: Request, response: Response) {
  return response.json({ message: 'Hello Wolf!' })
};