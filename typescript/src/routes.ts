import { Request, Response } from 'express';
import CreateUser from './services/CreateUser';

export function helloWolf(request: Request, response: Response) {

  const user = CreateUser({
    email: 'hi@theycallmewolf.com',
    password: '0000',
    isActive: true,
    techs: [
      'React',
      'ReactJS',
      'Node.js',
      'React Native',
      {
        title : 'JavaScript',
        experience: 100
      },
    ]
  });

  console.log(user.email)

  return response.json({ message: 'Hello Wolf!' })
};