import { faker } from '@faker-js/faker';

export function generateMockPet() {
    return {
        name: faker.animal.cat(),
        specie: faker.animal.type(),
        age: faker.number.int({ min: 1, max: 20 }),
        adopted: faker.datatype.boolean()
    };
}
