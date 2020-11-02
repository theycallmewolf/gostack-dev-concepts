
interface TechObject {
  title: string,
  experience: number
}

interface CreateUserData {
  name?: string;
  email: string;
  password: string;
  isActive: boolean;
  techs: Array<string | TechObject>;
}

export default function createUser({ name = '', email, password, isActive }: CreateUserData) {
  const user = {
    name,
    email,
    password
  }

  return user;

}