
import { faker } from '@faker-js/faker';
import { createHash } from './index.js';

export const generateMockUser = async () => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: await createHash('coder123'),
    role: faker.helpers.arrayElement(['user', 'admin']),
    pets: [],
  };
};

export const generateMockPet = () => {
  return {
    name: faker.animal.cat(),
    specie: faker.helpers.arrayElement(['dog', 'cat', 'rabbit']),
    birthDate: faker.date.birthdate(),
    adopted: false,
    image: faker.image.urlPicsumPhotos(),
  };
};
