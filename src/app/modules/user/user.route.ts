import express from 'express';
import { UserRole } from '../../../enums/userRole';
import authGuard from '../../middlewares/authGuard';
import { UserController } from './user.controller';
const router = express.Router();

router.get('/:id', authGuard(UserRole.ADMIN), UserController.getSingleUser);

router.get('/', authGuard(UserRole.ADMIN), UserController.getUsers);

router.delete(
  '/:id',
  authGuard(UserRole.ADMIN),
  UserController.deleteSingleUser
);

router.patch('/:id', authGuard(UserRole.ADMIN), UserController.updateUser);

export const UserRoutes = router;
