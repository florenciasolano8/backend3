import { Router } from 'express';
import { generateMockUser } from '../utils/mockUsers.js';
import UserModel from '../dao/models/User.js';
import PetModel from '../dao/models/Pet.js';
import { generateMockPet } from '../utils/generateMockPet.js';

const router = Router();

router.get('/mockingusers', (req, res) => {
    const users = [];
    for (let i = 0; i < 50; i++) {
        users.push(generateMockUser());
    }
    res.json({ status: 'success', payload: users });
});




router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    try {
        const userPromises = [];
        const petPromises = [];

        for (let i = 0; i < users; i++) {
            userPromises.push(generateMockUser());
        }

        for (let i = 0; i < pets; i++) {
            petPromises.push(generateMockPet());
        }

        const createdUsers = await Promise.all(userPromises);
        const createdPets = await Promise.all(petPromises);

        await UserModel.insertMany(createdUsers);
        await PetModel.insertMany(createdPets);

        res.json({
            status: 'success',
            message: `Se generaron ${users} usuarios y ${pets} mascotas en la base de datos.`
        });

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;

