import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

router.get('/',petsController.getAllPets);
router.post('/',petsController.createPet);
router.post('/withimage',uploader.single('image'), petsController.createPetWithImage);
router.put('/:pid',petsController.updatePet);
router.delete('/:pid',petsController.deletePet);

export default router;

/**
 * @swagger
 * tags:
 *   - name: Mascotas
 *     description: API para gestión de mascotas
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtener todas las mascotas
 *     tags: [Mascotas]
 *     responses:
 *       200:
 *         description: Lista de mascotas obtenida exitosamente
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
 *                         example: Firulais
 *                       specie:
 *                         type: string
 *                         example: Perro
 *                       birthDate:
 *                         type: string
 *                         format: date
 *                         example: 2020-01-01
 *                       image:
 *                         type: string
 *                         example: /img/firulais.jpg
 *                       adopted:
 *                         type: boolean
 *                         example: false
 */

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Crear una nueva mascota
 *     tags: [Mascotas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specie
 *               - birthDate
 *             properties:
 *               name:
 *                 type: string
 *                 example: Firulais
 *               specie:
 *                 type: string
 *                 example: Perro
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: 2020-01-01
 *     responses:
 *       200:
 *         description: Mascota creada exitosamente
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
 *                     name:
 *                       type: string
 *                     specie:
 *                       type: string
 *                     birthDate:
 *                       type: string
 *                       format: date
 *                     image:
 *                       type: string
 *                     adopted:
 *                       type: boolean
 *       400:
 *         description: Valores incompletos
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
 *                   example: Incomplete values
 */

/**
 * @swagger
 * /api/pets/withimage:
 *   post:
 *     summary: Crear una mascota con imagen
 *     tags: [Mascotas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specie
 *               - birthDate
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Firulais
 *               specie:
 *                 type: string
 *                 example: Perro
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: 2020-01-01
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Mascota creada exitosamente con imagen
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
 *                     name:
 *                       type: string
 *                     specie:
 *                       type: string
 *                     birthDate:
 *                       type: string
 *                     image:
 *                       type: string
 *       400:
 *         description: Valores incompletos
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
 *                   example: Incomplete values
 */

/**
 * @swagger
 * /api/pets/{pid}:
 *   put:
 *     summary: Actualizar una mascota por ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Campos a actualizar (puede contener uno o más)
 *             example:
 *               name: "Nuevo nombre"
 *               specie: "Gato"
 *     responses:
 *       200:
 *         description: Mascota actualizada exitosamente
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
 *                   example: pet updated
 */

/**
 * @swagger
 * /api/pets/{pid}:
 *   delete:
 *     summary: Eliminar una mascota por ID
 *     tags: [Mascotas]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota a eliminar
 *     responses:
 *       200:
 *         description: Mascota eliminada exitosamente
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
 *                   example: pet deleted
 */
