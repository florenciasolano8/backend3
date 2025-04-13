import { faker } from '@faker-js/faker';

export function generateMockUser() {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 99 }),
    };
}