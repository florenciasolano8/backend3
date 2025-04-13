import { Router } from 'express';
import { generateMockUser } from '../utils/mockUsers.js';

const router = Router();

router.get('/mockingusers', (req, res) => {
    const users = [];
    for (let i = 0; i < 50; i++) {
        users.push(generateMockUser());
    }
    res.json({ status: 'success', payload: users });
});

export default router;
