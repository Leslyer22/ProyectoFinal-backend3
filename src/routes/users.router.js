import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

router.get('/',usersController.getAllUsers);

router.get('/:uid',usersController.getUser);
router.put('/:uid',usersController.updateUser);
router.delete('/:uid',usersController.deleteUser);


export default router;

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: API para gestión de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
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
 *                         example: Juan Perez
 *                       email:
 *                         type: string
 *                         example: juan@example.com
 *                       pets:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: [ "64b123456789abcdef123457" ]
 */

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a buscar
 *     responses:
 *       200:
 *         description: Usuario encontrado
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
 *                       example: Juan Perez
 *                     email:
 *                       type: string
 *                       example: juan@example.com
 *                     pets:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: [ "64b123456789abcdef123457" ]
 *       404:
 *         description: Usuario no encontrado
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
 *                   example: User not found
 */

/**
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     summary: Actualizar un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Campos a actualizar (pueden ser uno o varios)
 *             example:
 *               name: "Juan Updated"
 *               email: "juanupdated@example.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
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
 *                   example: User updated
 *       404:
 *         description: Usuario no encontrado
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
 *                   example: User not found
 */

/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: Eliminar un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
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
 *                   example: User deleted
 */
