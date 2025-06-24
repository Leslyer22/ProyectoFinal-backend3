import { Router} from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();

router.get('/',adoptionsController.getAllAdoptions);
router.get('/:aid',adoptionsController.getAdoption);
router.post('/:uid/:pid',adoptionsController.createAdoption);

export default router;

/**
 * @swagger
 * tags:
 *   - name: Adopciones
 *     description: API para gestionar adopciones de mascotas
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adopciones]
 *     responses:
 *       200:
 *         description: Lista de adopciones obtenida exitosamente
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
 *                         description: ID de la adopción
 *                         example: 64b123456789abcdef123456
 *                       owner:
 *                         type: string
 *                         description: ID del usuario adoptante
 *                         example: 64b123456789abcdef123457
 *                       pet:
 *                         type: string
 *                         description: ID de la mascota adoptada
 *                         example: 64b123456789abcdef123458
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la adopción
 *                         example: 2024-06-24T12:00:00Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de última actualización
 */

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtener una adopción por su ID
 *     tags: [Adopciones]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción a buscar
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64b123456789abcdef123456
 *                     owner:
 *                       type: string
 *                       example: 64b123456789abcdef123457
 *                     pet:
 *                       type: string
 *                       example: 64b123456789abcdef123458
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-24T12:00:00Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Adopción no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: Adoption not found
 */

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Crear una adopción
 *     tags: [Adopciones]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario que adopta
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota a adoptar
 *     responses:
 *       201:
 *         description: Adopción creada exitosamente
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
 *                   example: Pet adopted
 *       400:
 *         description: Error al crear la adopción (pet ya adoptada)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: Pet is already adopted
 *       404:
 *         description: Usuario o mascota no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 error:
 *                   type: string
 *                   example: User Not found / Pet not found
 */
