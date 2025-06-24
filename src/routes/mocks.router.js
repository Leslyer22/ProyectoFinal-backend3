
import { Router } from 'express';
import { generateMockUser, generateMockPet } from '../utils/mocking.utils.js';
import { usersService, petsService } from '../services/index.js';

const router = Router();

// GET /api/mocks/mockingusers (50 usuarios)
router.get('/mockingusers', async (req, res) => {
  const users = [];
  for (let i = 0; i < 50; i++) {
    const user = await generateMockUser();
    users.push(user);
  }
  res.send({ status: 'success', payload: users });
});

// POST /api/mocks/generateData?users=5&pets=10
router.post('/generateData', async (req, res) => {
  const usersCount = parseInt(req.query.users) || 0;
  const petsCount = parseInt(req.query.pets) || 0;

  for (let i = 0; i < usersCount; i++) {
    const user = await generateMockUser();
    await usersService.create(user);
  }

  for (let i = 0; i < petsCount; i++) {
    const pet = generateMockPet();
    await petsService.create(pet);
  }

  res.send({ status: 'success', message: `Se generaron ${usersCount} usuarios y ${petsCount} mascotas.` });
});

export default router;

/**
 * @swagger
 * tags:
 *   - name: Mocks
 *     description: Endpoints para generación de datos de prueba
 */

/**
 * @swagger
 * /api/mocks/mockingusers:
 *   get:
 *     summary: Obtener 50 usuarios mock generados
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de 50 usuarios generados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64b123456789abcdef123456
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 *                       password:
 *                         type: string
 *                         example: hashed_password
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */

/**
 * @swagger
 * /api/mocks/generateData:
 *   post:
 *     summary: Generar usuarios y mascotas mock según parámetros
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: users
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Cantidad de usuarios a generar
 *       - in: query
 *         name: pets
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Cantidad de mascotas a generar
 *     responses:
 *       200:
 *         description: Usuarios y mascotas generados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Se generaron 5 usuarios y 10 mascotas.
 */
